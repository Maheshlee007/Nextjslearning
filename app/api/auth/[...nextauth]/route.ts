import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
     CredentialsProvider({
       name: 'Credentials',
        credentials: {
          username: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: Record<"username" | "password", string> | undefined, req){
            console.log("credentials", credentials);
            console.log("req", req );
             if(!credentials?.username || !credentials?.password){
                return null;
             }
            const user = { id: "1", name: 'User', email: 'user@example.com' };
            return user;
        } 
     }),
  ],
  pages:{
    signIn:'/signin' // custom signin page if we remove it will automatically redirect  to default nextauth signin page
  },
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session instead of database sessions which means no DB needed, if needed we can use DB sessions
  },
  jwt: {
    secret: 'my_secret_key', // Use a strong secret in production
  }

});

// export default handler;
 
export { handler as GET, handler as POST };