import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { login } from "../requests/user.requests";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email', type: 'text'
                },
                password: {
                    label: 'password', type: 'password'
                },
            },
            async authorize(credentials, _) {
                try {
                    const { data }: any = await login({ email: credentials?.email, password: credentials?.password });

                    if (data.success) {
                        return data;
                    }

                    return null;
                } catch (err: any) {
                    console.log(err);
                }
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user }: any) {
            if (user?.error) throw new Error(user?.error)
            return true;
        },
        async jwt({ token, user }) {
            user && (token.user = user)
            return token;
        },
        async session({ session, token }) {
            session = token.user as any
            return session;
        }
    }
};