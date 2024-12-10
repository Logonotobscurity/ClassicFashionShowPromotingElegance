import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export default function Newsletter() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Welcome aboard! 🎉",
          description: "Thanks for subscribing! Check your email for a welcome message.",
          variant: "default",
          duration: 5000,
        });
        form.reset();
      } else {
        // Show specific error message from the server
        const errorMessage = data.message || "Something went wrong. Please try again.";
        toast({
          title: "Subscription Failed",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
        
        // If the email is already subscribed, clear the form
        if (errorMessage.toLowerCase().includes("already subscribed")) {
          form.reset();
        }

        // Log the error for debugging
        console.error("Subscription error:", { status: response.status, message: errorMessage });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Error",
        description: "Unable to subscribe. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-8 text-lg">Subscribe to our newsletter for updates and exclusive offers</p>
        
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="bg-white text-foreground h-12"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your email"
                      {...field}
                      className="bg-white text-foreground h-12"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-200" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
