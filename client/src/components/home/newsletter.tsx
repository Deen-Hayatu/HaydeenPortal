import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendNewsletterConfirmation } from "@/lib/emailjs-service";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store the subscription locally first (you might want to keep this)
      // We'll replace the server-side email sending with EmailJS
      // await apiRequest("POST", "/api/newsletter/subscribe", { email });
      
      // For testing without Email.js credentials, uncomment this line to simulate success
      // const result = { success: true };
      
      // Send confirmation email directly with EmailJS
      const result = await sendNewsletterConfirmation(email);
      
      if (result.success) {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        
        setEmail("");
      } else {
        throw new Error('Failed to subscribe to newsletter');
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
      <section id="newsletter" className="py-16 md:py-20 bg-[#0A3D62] text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Stay Updated</h2>
          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter for the latest updates on our solutions, industry insights, and upcoming events.
          </p>
          
          <form 
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            onSubmit={handleSubmit}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              required 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="btn bg-[#27AE60] text-white hover:bg-opacity-90 whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          <p className="text-sm opacity-75 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
