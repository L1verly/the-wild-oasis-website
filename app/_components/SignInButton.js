"use client";

import { signIn } from "@/_lib/auth-client";
import Image from "next/image";

function SignInButton() {
  return (
    <button
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium hover:bg-primary-800 focus:bg-primary-800 cursor-pointer"
      onClick={signIn}
    >
      <Image src="/google-logo.svg" alt="Google logo" height="24" width="24" />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;
