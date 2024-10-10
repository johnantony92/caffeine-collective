// app/components/layout.tsx
import { SideMenu } from "~/components/layout/sidemenu";
import { Navbar } from "~/components/layout/navbar";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "components/ui/sheet";
import { Button } from "components/ui/button";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Side Menu (Desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r">
          <div className="p-6">
            <SideMenu />
          </div>
        </aside>

        {/* Side Menu (Mobile) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden fixed top-20 left-4 z-40"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6">
              <SideMenu />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}