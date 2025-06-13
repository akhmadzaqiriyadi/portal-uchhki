import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Logika varian ini HANYA bergantung pada props, bukan hook.
const sidebarVariants = cva(
  'flex flex-col h-full bg-card border-r transition-all duration-300 ease-in-out',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64 lg:w-[280px]', // Menggunakan lebar dari layout
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, ...props }, ref) => {
    // Komponen ini tidak lagi memanggil useSidebar().
    // Ia hanya menggunakan prop 'collapsed' yang diterima.
    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ collapsed }), className)}
        {...props}
      />
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-4  flex items-center justify-center', className)} {...props} />;
  }
);
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex-1 overflow-y-auto', className)} {...props} />;
  }
);
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-4 border-t', className)} {...props} />;
  }
);
SidebarFooter.displayName = 'SidebarFooter';

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };