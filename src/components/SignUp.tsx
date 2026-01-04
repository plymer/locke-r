import { SignUpButton } from "@clerk/clerk-react";
import { Button } from "./ui/Button";
import { CLERK_MODAL_VIS_CONFIG } from "@/lib/constants";

export const SignUp = () => {
  return (
    <SignUpButton mode="modal" appearance={CLERK_MODAL_VIS_CONFIG}>
      <Button>Sign Up</Button>
    </SignUpButton>
  );
};
