import { betterAuth } from "better-auth";
import { createGuest, getGuest } from "./data-service";
import { createSupabaseServerClient } from "./supabase/supabase-server";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const supabase = await createSupabaseServerClient();
          const existingGuest = await getGuest(supabase, user.email);

          if (!existingGuest)
            await createGuest(supabase, {
              email: user.email,
              fullName: user.name,
            });
        },
      },
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const supabase = await createSupabaseServerClient();
      const guest = await getGuest(supabase, user.email);
      return {
        user: {
          ...user,
          guestId: guest.id,
        },
        session,
      };
    }),
  ],
});
