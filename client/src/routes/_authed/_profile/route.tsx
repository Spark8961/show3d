import { profileQuery } from "@/queries/profile";
import { sessionQuery } from "@/queries/session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/_profile")({
    beforeLoad: async ({ context }) => {
        const session = await context.queryClient.ensureQueryData(sessionQuery);
        const uid = session?.user.id ?? null;

        const { profile } = await context.queryClient.ensureQueryData(profileQuery(uid));
        if (profile === null) throw redirect({ to: "/create-profile" });
    },
});
