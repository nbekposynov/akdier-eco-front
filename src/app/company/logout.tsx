import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Удаление токена из localStorage
    localStorage.removeItem('token');
    
    // Перенаправление на страницу выхода
    router.push('/');
  };

  useEffect(() => {
    // Проверка наличия токена в localStorage
    const token = localStorage.getItem('token');
    
    // Если токен отсутствует, перенаправление на страницу выхода
    if (!token) {
      router.push('/');
    }
  }, []);

  return (
    <Button variant="contained" onClick={handleLogout}>Выход</Button>
  );
};

export default LogoutButton;