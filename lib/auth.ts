import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

        const admin = await Admin.findOne({ email: credentials?.email });

        if (!admin) throw new Error("Invalid email");

        const isMatch = await bcrypt.compare(
          credentials!.password,
          admin.password
        );

        if (!isMatch) throw new Error("Invalid password");

        return {
          id: admin._id.toString(),
          email: admin.email,
          role: "admin",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // ✅ now correctly typed
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};