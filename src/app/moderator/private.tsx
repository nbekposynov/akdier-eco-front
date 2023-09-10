import { useRouter } from 'next/navigation';
import { useEffect, ReactNode  } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
  } 
  
const PrivateModeratorRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter();
    const role = localStorage.getItem('role');
  
    useEffect(() => {
      if (!localStorage.getItem('token') || role !== 'moderator') {
        router.push('/');
      }
    }, []);
  
    return <>{children}</>;
  };
  export default PrivateModeratorRoute