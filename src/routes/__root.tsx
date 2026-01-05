import { useClerkAuth } from "@/auth/clerk";
import { AvatarButton } from "@/components/AvatarButton";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { useDbByUser } from "@/hooks/useDbByUser";
import type { SessionDataFetchers } from "@/lib/sessionData";
import { useUserActions } from "@/stateStore/user";
import { Outlet, createRootRouteWithContext, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface RouterContext {
  auth: ReturnType<typeof useClerkAuth> | undefined;
  sessionIds?: string[];
  sessionDataFetchers: SessionDataFetchers;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { authed, user } = useClerkAuth();
  const { getUserProfile, updateLastLogin } = useDbByUser(user?.id);
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
            <Link to="/" className="flex gap-2 place-items-center">
              <img src="/ultra-ball.png" className="size-8" />
              <h1 className="text-3xl">
                <span className="text-accent">locke</span>-r
              </h1>
            </Link>

            {profileFetching ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex gap-2 place-items-center">
                {getUserProfile.data?.data?.displayName} <AvatarButton />
              </div>
            )}
          </nav>
          <div className="bg-accent px-4 pt-2 pb-4 rounded-b-lg">
            <Outlet />
          </div>
        </>
      )}
      {!authed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 place-items-center text-center rounded-lg bg-neutral-950 p-8">
          <img src="/ultra-ball.png" className="size-32" />
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
