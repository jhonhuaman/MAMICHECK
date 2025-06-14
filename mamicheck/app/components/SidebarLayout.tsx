import { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 ml-3 bg-white rounded shadow">{children}</main>
    </div>
  );
}
