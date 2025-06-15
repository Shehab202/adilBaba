import AxiosAuth from "@/lib/axiosAuth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter Email",
        },
        password: {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        const dataLogin = {
          email_or_phone: credentials?.email,
          password: credentials?.password,
        };
        try {
          const res = await AxiosAuth.post("/login", dataLogin);
          console.log(res.data);

          if (res) {
            const userData = res.data.user;
            userData.accessToken = res.data.token;
            return userData;
          }
        } catch (e: any) {
          const errorMessage =
            e?.message || e?.response?.data?.message || "Something went wrong!";
          throw new Error(errorMessage);
        }
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "register",
      credentials: {
        name: {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter Name",
        },
        email: {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter Email",
        },
        password: {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
        region: {
          name: "region",
          label: "region",
          type: "text",
          placeholder: "Enter region",
        },
        company_name: {
          name: "company_name",
          label: "Company Name",
          type: "text",
          placeholder: "Enter Company Name",
        },
      },
      async authorize(credentials) {
        try {
          const user = await AxiosAuth.post("/register", {
            name: credentials?.name,
            region: credentials?.region,
            company_name: credentials?.company_name || undefined, // Optional field
            email: credentials?.email,
            password: credentials?.password,
          });

          if (user) {
            user.data.user["accessToken"] = user.data?.token;
            return user.data.user;
          }
        } catch (e: any) {
          const errorMessage =
            e?.message || e?.response?.data?.message || "Something went wrong!";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }) => {
      if (user) {
        token.user = user;
        token.provider = account?.provider;
        // @ts-ignore
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.id = token.id;
        session.user = { ...token.user };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};
