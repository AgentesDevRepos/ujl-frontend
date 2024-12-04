import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch('http://localhost:3000/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    });

                    const data = await res.json();

                    if (res.ok && data.user) {
                        return { ...data.user, accessToken: data.tokens.access };
                    }
                    return null;
                } catch (error) {
                    console.error('Erro na autenticação:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                ...session.user,
                accessToken: token.accessToken,
            };
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
}); 