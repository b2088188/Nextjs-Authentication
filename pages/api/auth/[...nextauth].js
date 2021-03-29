import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { client } from "../../../utils/api-client";

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				try {
					const {
						data: { user },
					} = await client("/api/v1/auth/login", {
						data: { ...credentials, redirect: undefined },
					});
					return {
						email: user.email,
					};
				} catch (err) {
					throw err;
				}
			},
		}),
	],
});
