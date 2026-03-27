import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export const signIn = async (returnTo) => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: returnTo,
  });
};
