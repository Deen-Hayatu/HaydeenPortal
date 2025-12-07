import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

const betaSignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  platform: z.enum(["AgriConnect", "GhEHR", "Both"], {
    required_error: "Please select a platform",
  }),
  role: z.string().min(2, { message: "Please tell us about your role" }),
});

type BetaSignupFormData = z.infer<typeof betaSignupSchema>;

interface BetaSignupFormProps {
  defaultPlatform?: "AgriConnect" | "GhEHR" | "Both";
  className?: string;
}

export default function BetaSignupForm({ defaultPlatform, className = "" }: BetaSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<BetaSignupFormData>({
    resolver: zodResolver(betaSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      platform: defaultPlatform || "Both",
      role: "",
    },
  });

  const onSubmit = async (data: BetaSignupFormData) => {
    setIsSubmitting(true);

    try {
      // Submit to contact form endpoint with beta signup flag
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `Beta Signup Request:\nPlatform: ${data.platform}\nRole: ${data.role}\n\nI'm interested in beta access to ${data.platform === "Both" ? "AgriConnect and GhEHR" : data.platform}.`,
          phone: "",
          company: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit beta signup");
      }

      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Beta Access Requested!",
        description: `We've received your request for ${data.platform === "Both" ? "AgriConnect and GhEHR" : data.platform} beta access. We'll contact you soon.`,
      });
    } catch (error) {
      console.error("Beta signup error:", error);
      toast({
        title: "Request Failed",
        description: "There was an error submitting your beta access request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-[#27AE60] text-white rounded-lg p-8 text-center ${className}`}>
        <CheckCircle className="h-16 w-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Beta Access Requested!</h3>
        <p className="mb-4">
          We've received your request and will contact you soon with more information about beta access.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="bg-white text-[#27AE60] hover:bg-gray-100"
        >
          Request Access for Another Platform
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border shadow-lg p-6 md:p-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#0A3D62] mb-2">Request Beta Access</h3>
        <p className="text-gray-600">
          Be among the first to experience our platforms. Limited spots available.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform Interest *</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="AgriConnect">AgriConnect (Q2 2026)</option>
                    <option value="GhEHR">GhEHR (Q1 2026)</option>
                    <option value="Both">Both Platforms</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Farmer, Healthcare Worker, Business Owner" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500">
                  Tell us about yourself so we can tailor the beta experience
                </p>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#27AE60] hover:bg-[#229954] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Beta Access"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By requesting beta access, you'll receive updates about launch dates and early access opportunities.
          </p>
        </form>
      </Form>
    </div>
  );
}

