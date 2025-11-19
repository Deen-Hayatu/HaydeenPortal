import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import EnhancedButton from "@/components/ui/enhanced-button";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { sendContactForm } from "@/lib/emailjs-service";
import MobileMoney from "@/components/payment/mobile-money";
import ContactFormProtectionProvider from "@/components/security/contact-form-protection";
import HeadTags from "@/components/seo/head-tags";
import ResponsiveContainer from "@/components/mobile/responsive-container";
import TouchOptimized from "@/components/mobile/touch-optimized";
import { EnhancedValidation, emailRules, ghanaPhoneRules } from "@/components/forms/enhanced-form-validation";

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email address is too long" }),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^(\+233|0)[2-5][0-9]{8}$/.test(val.replace(/\s/g, '')), {
      message: "Please enter a valid Ghana phone number"
    }),
  company: z.string().max(100, { message: "Company name is too long" }).optional(),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange', // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const watchedFields = form.watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // For testing without Email.js credentials, uncomment this line to simulate success
      // const result = { success: true };
      
      // Send email directly using EmailJS
      const result = await sendContactForm(data);
      
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });

        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Message failed to send",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactFormProtectionProvider>
      {({ canSubmit, remainingCooldown, recordAttempt }) => (
        <>
          <HeadTags
            title="Contact Us | Haydeen Technologies Ghana - Get in Touch"
            description="Contact Haydeen Technologies for innovative software solutions in Ghana. Located in Effiduasi, Ashanti. We offer AgriConnect, GhEHR, and custom website design services."
            keywords="contact Haydeen Technologies, software company Ghana, Effiduasi Ashanti, AgriConnect support, GhEHR contact, website design Ghana"
            canonical="https://haydeentechnologies.com/contact"
          />
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90">
              Have questions or want to learn more about our solutions? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Interested in our solutions or want to explore how we can work together? Fill out the form or contact us directly using the information below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F2F2F2] flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#0A3D62]" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">Visit Us</h3>
                    <p className="text-gray-600">Bw 14 Benz road<br />Effiduasi Ashanti</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F2F2F2] flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#0A3D62]" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">Email Us</h3>
                    <p className="text-gray-600">info@haydeentech.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-[#F2F2F2] flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-[#0A3D62]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A3D62] mb-1">Call Us</h3>
                    <p className="text-gray-600">+233 207 884 182</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-[#0A3D62] mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-[#0A3D62] hover:text-white transition-colors" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-[#0A3D62] hover:text-white transition-colors" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center hover:bg-[#0A3D62] hover:text-white transition-colors" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#F2F2F2] rounded-lg p-8">
              <h2 className="text-2xl font-bold text-[#0A3D62] mb-6">Send Us a Message</h2>

                <div className="bg-white rounded-lg border border-dashed border-[#0A3D62]/20 p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#27AE60] mt-1" />
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold text-[#0A3D62]">We respond within two business days.</p>
                    <p>All submissions are stored securely in Neon Postgres and routed through our internal ticketing workflow—no marketing drip, just a human follow-up.</p>
                  </div>
                </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              type="email" 
                              autoComplete="email"
                              {...field} 
                              className="bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                          <EnhancedValidation
                            value={field.value}
                            rules={emailRules}
                            showValidation={field.value.length > 0}
                          />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+233 207 884 182" 
                              type="tel" 
                              autoComplete="tel"
                              {...field} 
                              className="bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                          <EnhancedValidation
                            value={field.value || ''}
                            rules={ghanaPhoneRules}
                            showValidation={!!(field.value && field.value.length > 5)}
                          />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Organization (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Company" 
                              {...field} 
                              className="bg-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us how we can help you..." 
                            className="min-h-[120px] bg-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <EnhancedButton 
                    type="submit" 
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    loadingText="Sending message..."
                    disabled={!canSubmit}
                    leftIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
                  >
                    Send Message
                  </EnhancedButton>

                    <p className="text-xs text-gray-500">
                      By submitting, you consent to Haydeen Technologies contacting you regarding your enquiry. We never share your information with third parties and can execute an NDA before detailed conversations.
                    </p>
                  
                  {!canSubmit && remainingCooldown > 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      Please wait {Math.ceil(remainingCooldown / 1000)} seconds before sending another message.
                    </p>
                  )}
                  
                  {/* Mobile Money Payment Option */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-semibold text-[#0A3D62] mb-4">Quick Payment Options</h3>
                    <p className="text-gray-600 mb-4">
                      Need to make a quick payment? Use Mobile Money for instant transactions.
                    </p>
                    <MobileMoney
                      amount={100}
                      currency="GHS"
                      description="Consultation Fee"
                      onSuccess={() => {
                        toast({
                          title: "Payment Successful!",
                          description: "Thank you for your payment. We'll contact you soon.",
                        });
                      }}
                      onError={(error) => {
                        toast({
                          title: "Payment Failed",
                          description: error,
                          variant: "destructive",
                        });
                      }}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Our Location</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Visit our office in Effiduasi, Ashanti Region to meet our team and learn more about our solutions.
            </p>
          </div>
          
          <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254697.24703437256!2d-1.3836!3d6.9186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf89a8dc4c8d51%3A0xf2b9ff0b9a2f7b1!2sEffiduasi%2C%20Ghana!5e0!3m2!1sen!2sus!4v1689847225457!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Haydeen Technologies office location in Effiduasi"
              aria-label="Google Maps showing Haydeen Technologies location in Effiduasi, Ashanti"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A3D62] mb-4">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Find answers to common questions about our solutions and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">How can AgriConnect help my farming business?</h3>
              <p className="text-gray-600">
                AgriConnect provides real-time weather data, market connections, educational resources, and more to help you make better decisions, improve yields, and increase profitability. It's designed specifically for the challenges faced by West African farmers.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Do I need consistent internet access to use your solutions?</h3>
              <p className="text-gray-600">
                We design our solutions with limited connectivity in mind. Many features of AgriConnect work offline, and we optimize for low-bandwidth connections. Data syncs when connectivity is available to ensure you always have the most current information.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">How do you handle data privacy and security?</h3>
              <p className="text-gray-600">
                We take data privacy and security seriously. All user data is encrypted, and we follow industry best practices for security. We never share your personal information with third parties without your explicit consent.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-[#0A3D62] mb-3">Do you offer custom solutions for businesses?</h3>
              <p className="text-gray-600">
                Yes, we work with businesses and organizations to develop custom solutions tailored to specific needs and challenges. Contact us to discuss your requirements and how we can help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </ContactFormProtectionProvider>
  );
};

export default Contact;
