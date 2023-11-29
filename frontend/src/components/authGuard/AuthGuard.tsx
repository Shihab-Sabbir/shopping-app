// AuthGuard.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthcheck from '../../hooks/useCheckAuth';
import LoadingScreen from '../loaders/LoadingScreen';
import { logout } from '../../redux/features/auth/authSlice';

interface pageProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: pageProps) {
  const { authChecked, isLoading } = useAuthcheck();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!authChecked && !isLoading) {
    logout();
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
}
