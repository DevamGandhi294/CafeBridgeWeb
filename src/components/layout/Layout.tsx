import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
  topBarPlaceholder?: string;
}

export default function Layout({ children, topBarPlaceholder }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <Sidebar />
      <TopBar placeholder={topBarPlaceholder} />
      <main className="ml-[220px] pt-[60px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
