import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/Button";
import { CLERK_MODAL_VIS_CONFIG } from "@/lib/constants";

export const SignIn = () => {
  return (
    <SignInButton mode="modal" appearance={CLERK_MODAL_VIS_CONFIG}>
      <Button>Sign In</Button>
    </SignInButton>
  );
};
