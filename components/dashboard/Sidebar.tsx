// file: components/dashboard/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Settings, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  role: string | null
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const userRoutes = [
    {
      href: '/user/dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/user/hak-cipta',
      label: 'Hak Cipta',
      icon: FileText,
    },
    {
      href: '/user/settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

  const adminRoutes = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/admin/hak-cipta',
      label: 'Manajemen Hak Cipta',
      icon: FileText,
    },
    {
        href: '/admin/users',
        label: 'Manajemen Pengguna',
        icon: Users,
      },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

  const routes = role === 'admin' ? adminRoutes : userRoutes

  // --- CHANGE IS HERE ---
  // The className with "hidden lg:block..." has been removed from this div
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span>Portal UCHHKI</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  'bg-gray-200/50 text-gray-900 dark:bg-gray-700/50 dark:text-gray-50':
                    pathname === route.href,
                }
              )}
              href={route.href}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}