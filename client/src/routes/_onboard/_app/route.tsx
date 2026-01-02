import { authQuery } from "@/queries/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_onboard/_app")({
    beforeLoad: async ({ context }) => {
        const session = await context.queryClient.ensureQueryData(authQuery);
        if (!session) throw redirect({ to: "/login" });
    },
});
