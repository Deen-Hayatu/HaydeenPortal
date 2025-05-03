import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Clock, RefreshCw, Send } from 'lucide-react';

// Form validation schema for creating a new ticket
const ticketFormSchema = z.object({
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  customerName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  customerEmail: z.string().email({ message: "Please enter a valid email address" }),
});

// Form validation schema for adding a message to a ticket
const messageFormSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
  isFromStaff: z.boolean().default(false),
  senderName: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

// Types
type TicketFormValues = z.infer<typeof ticketFormSchema>;
type MessageFormValues = z.infer<typeof messageFormSchema>;

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customerName: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
  messages?: TicketMessage[];
}

interface TicketMessage {
  id: number;
  ticketId: number;
  message: string;
  isFromStaff: boolean;
  senderName: string;
  createdAt: string;
}

const SupportPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('new');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  // Create a new ticket form
  const ticketForm = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      subject: '',
      description: '',
      priority: 'medium',
      customerName: '',
      customerEmail: '',
    },
  });
  
  // Add message to ticket form
  const messageForm = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: '',
      isFromStaff: false,
      senderName: '',
    },
  });
  
  // Get user's tickets by email
  const { data: tickets, isLoading: isLoadingTickets, refetch: refetchTickets } = useQuery({
    queryKey: ['/api/support/tickets', customerEmail],
    queryFn: async () => {
      if (!customerEmail) return [];
      const response = await fetch(`/api/support/tickets?email=${encodeURIComponent(customerEmail)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      return response.json();
    },
    enabled: !!customerEmail,
  });
  
  // Create a new ticket mutation
  const createTicketMutation = useMutation({
    mutationFn: async (values: TicketFormValues) => {
      const response = await apiRequest('POST', '/api/support/tickets', values);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Ticket Created',
        description: 'Your support ticket has been submitted successfully.',
      });
      ticketForm.reset();
      if (customerEmail) {
        refetchTickets();
      }
      setActiveTab('existing');
    },
    onError: (error) => {
      console.error('Error creating ticket:', error);
      toast({
        title: 'Error',
        description: 'Failed to create ticket. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Add message to ticket mutation
  const addMessageMutation = useMutation({
    mutationFn: async (values: MessageFormValues & { ticketId: number }) => {
      const { ticketId, ...messageData } = values;
      const response = await apiRequest('POST', `/api/support/tickets/${ticketId}/messages`, messageData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent',
        description: 'Your message has been sent successfully.',
      });
      messageForm.reset();
      if (selectedTicket) {
        // Refetch the ticket to get the updated messages
        queryClient.invalidateQueries({ queryKey: ['/api/support/tickets', selectedTicket.id] });
      }
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Get a specific ticket by ID when selected
  const { data: ticketDetail, isLoading: isLoadingTicketDetail } = useQuery({
    queryKey: ['/api/support/tickets', selectedTicket?.id],
    queryFn: async () => {
      if (!selectedTicket) return null;
      const response = await fetch(`/api/support/tickets/${selectedTicket.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ticket details');
      }
      return response.json();
    },
    enabled: !!selectedTicket,
  });
  
  // Handle email search form submission
  const handleEmailSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerEmail) {
      refetchTickets();
    }
  };
  
  // Handle ticket form submission
  const onSubmitTicket = (values: TicketFormValues) => {
    createTicketMutation.mutate(values);
    // Save email for easy access to tickets later
    if (values.customerEmail) {
      setCustomerEmail(values.customerEmail);
    }
  };
  
  // Handle message form submission
  const onSubmitMessage = (values: MessageFormValues) => {
    if (!selectedTicket) return;
    
    addMessageMutation.mutate({
      ...values,
      ticketId: selectedTicket.id,
    });
  };
  
  // When a ticket is selected, populate the message form sender name
  useEffect(() => {
    if (selectedTicket) {
      messageForm.setValue('senderName', selectedTicket.customerName);
    }
  }, [selectedTicket, messageForm]);
  
  // Helper function to get status badge color
  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Helper function to get priority badge color
  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Helper function to get priority icon
  const getPriorityIcon = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return <Clock className="h-4 w-4" />;
      case 'medium':
        return <Clock className="h-4 w-4" />;
      case 'high':
        return <AlertCircle className="h-4 w-4" />;
      case 'urgent':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#0A3D62] mb-2">Customer Support</h1>
        <p className="text-gray-600 mb-8">Get help with any of our products or services</p>
        
        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="new">New Ticket</TabsTrigger>
            <TabsTrigger value="existing">My Tickets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Create a Support Ticket</CardTitle>
                <CardDescription>
                  Fill out the form below to submit a new support ticket. We'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...ticketForm}>
                  <form onSubmit={ticketForm.handleSubmit(onSubmitTicket)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={ticketForm.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ticketForm.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={ticketForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of your issue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ticketForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ticketForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your issue"
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-[#3498DB] hover:bg-[#2980B9]"
                      disabled={createTicketMutation.isPending}
                    >
                      {createTicketMutation.isPending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Ticket'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="existing">
            <Card>
              <CardHeader>
                <CardTitle>My Support Tickets</CardTitle>
                <CardDescription>
                  View and manage your existing support tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSearch} className="flex gap-4 mb-6">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit"
                    className="bg-[#3498DB] hover:bg-[#2980B9]"
                    disabled={!customerEmail || isLoadingTickets}
                  >
                    {isLoadingTickets ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      'Search'
                    )}
                  </Button>
                </form>
                
                {customerEmail && !isLoadingTickets && (
                  <div>
                    {tickets && tickets.length > 0 ? (
                      <div className="space-y-4">
                        {tickets.map((ticket) => (
                          <div 
                            key={ticket.id} 
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTicket?.id === ticket.id ? 'border-[#3498DB] bg-[#3498DB]/5' : 'hover:border-[#3498DB]/70'}`}
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-[#0A3D62]">
                                #{ticket.id}: {ticket.subject}
                              </h3>
                              <div className="flex gap-2">
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  {getPriorityIcon(ticket.priority)}
                                  <span className="ml-1 capitalize">{ticket.priority}</span>
                                </Badge>
                                <Badge className={getStatusColor(ticket.status)}>
                                  <span className="capitalize">{ticket.status.replace('_', ' ')}</span>
                                </Badge>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{ticket.description}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No tickets found for this email address.</p>
                        <Button
                          variant="link"
                          className="mt-2 text-[#3498DB]"
                          onClick={() => setActiveTab('new')}
                        >
                          Create a new ticket
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {customerEmail && isLoadingTickets && (
                  <div className="flex justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin text-[#3498DB]" />
                  </div>
                )}
                
                {!customerEmail && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Enter your email address to view your tickets</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {selectedTicket && ticketDetail && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Ticket #{selectedTicket.id}: {selectedTicket.subject}</CardTitle>
                      <CardDescription>
                        Submitted by {selectedTicket.customerName} on {new Date(selectedTicket.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(selectedTicket.priority)}>
                        <span className="capitalize">{selectedTicket.priority}</span>
                      </Badge>
                      <Badge className={getStatusColor(selectedTicket.status)}>
                        <span className="capitalize">{selectedTicket.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description:</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-md border">{selectedTicket.description}</p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-medium mb-4">Conversation</h3>
                  
                  {ticketDetail.messages && ticketDetail.messages.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {ticketDetail.messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.isFromStaff ? 'justify-start' : 'justify-end'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-4 ${message.isFromStaff 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-[#3498DB] text-white'}`}
                          >
                            <div className="font-medium mb-1">{message.senderName} {message.isFromStaff ? '(Staff)' : ''}</div>
                            <p>{message.message}</p>
                            <div className="text-xs mt-2 opacity-70">
                              {new Date(message.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No messages yet. Send a message to start the conversation.</p>
                  )}
                  
                  {['open', 'in_progress'].includes(selectedTicket.status) && (
                    <Form {...messageForm}>
                      <form onSubmit={messageForm.handleSubmit(onSubmitMessage)} className="space-y-4">
                        <FormField
                          control={messageForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  placeholder="Type your message here..."
                                  className="min-h-24"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={messageForm.control}
                          name="senderName"
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button 
                            type="submit" 
                            className="bg-[#3498DB] hover:bg-[#2980B9]"
                            disabled={addMessageMutation.isPending}
                          >
                            {addMessageMutation.isPending ? (
                              <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                  
                  {['resolved', 'closed'].includes(selectedTicket.status) && (
                    <div className="bg-gray-50 border rounded-lg p-4 text-center">
                      <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <p className="text-gray-700">This ticket is {selectedTicket.status}. No further replies can be added.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTicket(null)}
                  >
                    Back to Tickets
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupportPage;