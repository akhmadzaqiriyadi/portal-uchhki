import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserMenu from './UserMenu';
import AppSidebar from './AppSidebar';

export default function DashboardNav() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      {/* Mobile Nav Trigger */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Buka menu navigasi</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            {/* TAMBAHKAN INI: Header dan Judul untuk Aksesibilitas.
              Judul ini tidak akan terlihat di layar, tetapi akan dibaca oleh screen reader.
            */}
            <SheetHeader className="h-0 overflow-hidden">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            </SheetHeader>
            
            {/* Render komponen AppSidebar seperti biasa */}
            <AppSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full flex-1">
        {/* Placeholder for breadcrumbs or other nav items */}
      </div>

      <UserMenu />
    </header>
  );
}