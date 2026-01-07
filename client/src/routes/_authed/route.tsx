import { createFileRoute, redirect } from "@tanstack/react-router";
import { sessionQuery } from "@/queries/session";

export const Route = createFileRoute("/_authed")({
    beforeLoad: async ({ context }) => {
        const result = await context.queryClient.ensureQueryData(sessionQuery);
        if (!result) throw redirect({ to: "/login" });
    },
});
