import { Form, redirect, useOutletContext } from '@remix-run/react'
import { json, type LoaderFunction } from '@remix-run/node'
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { Separator } from "components/ui/separator"
import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server'
import { SupabaseOutletContext } from '~/utils/supabase'

export const loader: LoaderFunction = async ({ request }) => {
  const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  if (serverSession) {
    return redirect('/', { headers });
  }

  return json({ success: true }, { headers });
}

export default function Login() {
  
  const { supabase, domainUrl } = useOutletContext<SupabaseOutletContext>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${domainUrl}/resources/auth/callback`,
      },
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
            <Button  onClick={handleSignIn} className="w-full">
              Sign in with Google
            </Button>
          <Separator className="my-4" />
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign in with Email
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}