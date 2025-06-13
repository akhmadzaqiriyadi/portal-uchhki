'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, User, Settings, PanelLeft, ShieldCheck } from 'lucide-react';

import { useSidebar } from '@/components/providers/SidebarProvider';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

// Navigation items for a regular user
const userNavItems = [
  { href: '/user/dashboard', label: 'Dashboard', icon: Home },
  { href: '/user/pendaftaran', label: 'Pendaftaran HKI', icon: FileText },
  { href: '/user/profile', label: 'Profil Saya', icon: User },
];

// Navigation items for an admin
const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/pendaftaran', label: 'Semua Pendaftaran', icon: FileText },
  { href: '/admin/verifikasi', label: 'Verifikasi', icon: ShieldCheck },
  { href: '/admin/users', label: 'Manajemen Pengguna', icon: User },
  { href: '/admin/settings', label: 'Pengaturan', icon: Settings },
];

export default function AppSidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { role, loading } = useAuth();
  const pathname = usePathname();

  const navItems = role === 'admin' ? adminNavItems : userNavItems;

  return (
    <Sidebar collapsed={isCollapsed} className="hidden lg:flex">
      <SidebarHeader className="flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Portal HKI</h1>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <PanelLeft className="size-5" />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-2 px-2">
          {loading ? (
            <p className="text-sm text-muted-foreground p-2">Loading...</p>
          ) : (
            navItems.map((item) => (
              <Link key={item.href} href={item.href} title={item.label}>
                <Button
                  variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start', isCollapsed && 'justify-center px-0')}
                >
                  <item.icon className={cn('size-5', !isCollapsed && 'mr-3')} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            ))
          )}
        </nav>
      </SidebarContent>
      <SidebarFooter>
        {/* You can add footer content here if needed, e.g., a link to documentation */}
      </SidebarFooter>
    </Sidebar>
  );
}