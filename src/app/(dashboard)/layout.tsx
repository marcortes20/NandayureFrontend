import Nav from '@/components/dashboard/nav/nav';
import SideBar from '@/components/dashboard/sidebar/side-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
};

export default function DasboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <SideBar />
      <div className="flex-1 p-4">
        <Nav />
        {children}
      </div>
    </main>
  );
}
