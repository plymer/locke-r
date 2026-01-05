import { useClerkAuth } from "@/auth/clerk";
import { AvatarButton } from "@/components/AvatarButton";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { useDb } from "@/hooks/useDb";
import { useUserActions } from "@/stateStore/user";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { authed, user } = useClerkAuth();
  const { getUserProfile, updateLastLogin } = useDb(user?.id);
  const { setUserId } = useUserActions();

  useEffect(() => {
    if (!authed) return;
    if (!user) return;

    setUserId(user.id);
  }, [authed, user]);

  useEffect(() => {
    if (user?.id) {
      updateLastLogin.mutate();
    }
  }, [user?.id]);

  const profileFetching = getUserProfile.isFetching;

  return (
    <>
      {authed && (
        <>
          <nav className="flex justify-between place-items-center bg-neutral-950 p-2 rounded-t-lg">
            <div className="flex gap-2 place-items-center">
              <img src="./ultra-ball.png" className="size-8" />
              <h1 className="text-3xl">
                <span className="text-accent">locke</span>-r
              </h1>
            </div>

            {profileFetching ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex gap-2 place-items-center">
                {getUserProfile.data?.data?.displayName} <AvatarButton />
              </div>
            )}
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
