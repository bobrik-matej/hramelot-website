import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            // Optional: Add scopes like 'guilds' to see user servers
            authorization: {params: {scope: 'identify email guilds'}},
        }),
    ],
});

export {handler as GET, handler as POST};
