import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateAdminRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      if (!localStorage.getItem('token') || role !== 'admin') {
        router.push('/');
      }
    }
  }, []);

  return <>{children}</>;
};

export default PrivateAdminRoute;