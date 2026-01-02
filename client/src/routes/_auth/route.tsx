import { authQuery } from "@/queries/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
    beforeLoad: async ({ context }) => {
        const user = await context.queryClient.ensureQueryData(authQuery);
        if (user) throw redirect({ to: "/home" });
    },
});
