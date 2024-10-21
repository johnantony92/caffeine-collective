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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
      

          {isAuthenticated? (
        <>
          <span className="text-sm font-medium">@{userDetails.username}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={userDetails?.userAvatarUrl||undefined} alt={`${userDetails.username}'s avatar`} />
            <AvatarFallback>{getInitials(userDetails?.username||"")}</AvatarFallback>
          </Avatar>
          <Button
            variant="default"
            size="sm"
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </>
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