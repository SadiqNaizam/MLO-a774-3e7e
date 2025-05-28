import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { Loader2 } from 'lucide-react'; // Optional: For a loading spinner icon

// Define Zod schema for form validation
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  onNavigateToSignup?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onLoginSuccess,
  onNavigateToSignup
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = React.useCallback(async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login attempt with:', data);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Example credential check for demonstration
      if (data.username === "testuser" && data.password === "password123") {
        console.log('Login successful');
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
        // form.reset(); // Optionally reset form after successful login
      } else if (data.username === "erroruser") { // Simulate a server-side validation error example
        form.setError("username", { 
          type: "manual", 
          message: "This username is currently blocked by the server."
        });
        console.log('Login failed: Username blocked.');
      } else {
        // General error for wrong credentials
        form.setError("root.apiError", { // Using 'root' for general form errors not tied to a specific field
          type: "manual",
          message: "Invalid username or password. Please try again.",
        });
        console.log('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      form.setError("root.apiError", {
        type: "manual",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [onLoginSuccess, form]); // form is stable, but included as it's used for setError

  return (
    <div className={cn("w-full", className)}>
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6 text-card-foreground">
        Log in
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Input */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} disabled={isLoading} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} disabled={isLoading} autoComplete="current-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display general form errors (e.g., root.apiError) */}
          {form.formState.errors.root?.apiError && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.apiError.message}
            </p>
          )}
          
          {/* Login Button */}
          <Button type="submit" className="w-full mt-2" disabled={isLoading}> {/* Added mt-2 for slight separation if an error message appears above */} 
            {isLoading ? (
              <>
                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                <span>Logging in...</span>
              </>
            ) : (
              'Log in'
            )}
          </Button>
        </form>
      </Form>
      
      {/* Signup Link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        or,{' '}
        <Button
          variant="link"
          type="button" // Important to prevent form submission if nested or by accident
          className="p-0 h-auto font-medium text-primary hover:text-primary/90 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-1 rounded-sm"
          onClick={onNavigateToSignup}
          disabled={isLoading}
        >
          sign up
        </Button>
      </p>
    </div>
  );
};

export default LoginForm;
