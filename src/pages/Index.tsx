import React from 'react';
import LoginForm from '../components/Login/LoginForm'; // Assuming LoginForm.tsx is in src/components/Login/

// Define a compatible type for the login form data if LoginFormValues is not exported from LoginForm.tsx.
// This type should match the structure inferred from loginFormSchema in LoginForm.tsx.
interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const handleLoginSuccess = (data: LoginFormData) => {
    // In a real application, you would typically navigate the user,
    // set authentication state (e.g., save a token), etc.
    console.log('Login successful on page. Username:', data.username);
    // Avoid logging or alerting sensitive information like passwords in production.
    alert(`Login successful! Welcome, ${data.username}.`);
    // Example: navigate('/dashboard'); or updateUserContext(userData);
  };

  const handleNavigateToSignup = () => {
    // In a real application, this would navigate to the sign-up page.
    // For example, if using react-router-dom: navigate('/signup');
    console.log('Navigate to signup page requested.');
    alert('Navigating to sign up page (functionality to be implemented).');
  };

  return (
    // Overall layout: Full viewport, flex centered content, background color
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
      {/* Centered Card Container: Fixed width, padding, background, rounded corners, shadow */}
      <div className="w-[400px] p-6 bg-card text-card-foreground rounded-lg shadow-lg">
        {/* MainContentArea: This is where the LoginForm organism is placed */}
        {/* The LoginForm component internally handles its content layout (e.g., flex-col, gap) */}
        <LoginForm 
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={handleNavigateToSignup}
        />
      </div>
    </div>
  );
};

export default LoginPage;
