// app/components/navbar.tsx
import {  Link } from "@remix-run/react";
import { Button } from "components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { Logo } from "./logo";
import {  TypedSupabaseClient } from "~/utils/supabase";
import { UserDetails } from "~/types/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";

interface NavbarProps {
  isAuthenticated: boolean;
  userDetails:UserDetails
  supabase: TypedSupabaseClient;
}

export function Navbar({ isAuthenticated, userDetails, supabase }: NavbarProps) {

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
      

          {isAuthenticated? (
               <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                   <Avatar className="h-8 w-8">
                     <AvatarImage src={userDetails?.userAvatarUrl||undefined} alt={userDetails.username || 'User avatar'} />
                     <AvatarFallback>{userDetails.username || 'U'}</AvatarFallback>
                   </Avatar>
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
               <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
             </DropdownMenu>
          ) : (
            <>
            
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}