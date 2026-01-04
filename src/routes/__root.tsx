import { useClerkAuth } from "@/auth/clerk";
import { AvatarButton } from "@/components/AvatarButton";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { authed } = useClerkAuth();

  // we will add the user's username to the nav later
  // this will be stored in the supabase db and synced with clerk on sign up
  // they will be able to change it in their profile settings later as well

  return (
    <>
      {authed && (
        <>
          <nav className="flex justify-between place-items-center max-w-2xl mx-auto bg-neutral-950 p-2 rounded-lg">
            <div className="flex gap-2 place-items-center">
              <img src="./ultra-ball.png" className="size-8" />
              <h1 className="text-3xl">
                <span className="text-accent">locke</span>-r
              </h1>
            </div>
            <div>
              <AvatarButton />
            </div>
          </nav>
          <Outlet />
        </>
      )}
      {!authed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 place-items-center text-center rounded-lg bg-neutral-950 p-8">
          <img src="./ultra-ball.png" className="size-32" />
          <div className="flex gap-2 flex-col">
            <h1 className="text-6xl">
              <span className="text-accent">locke</span>-r
            </h1>
            <p className="text-xl">Begin your adventure</p>
            <div className="flex gap-2 justify-center mt-4">
              <SignIn />
              <SignUp />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
