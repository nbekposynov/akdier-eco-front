import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Check if the code is running in the browser environment
    if (typeof window !== 'undefined') {
      // Remove the token from localStorage
      localStorage.removeItem('token');
      
      // Redirect to the '/' page
      router.push('/');
    }
  };

  useEffect(() => {
    // Check for the presence of a token in localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      // If no token is found, redirect to the '/' page
      if (!token) {
        router.push('/');
      }
    }
  }, []);

  return (
    <Button variant="contained" onClick={handleLogout}>Выход</Button>
  );
};

export default LogoutButton;