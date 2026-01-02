import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_onboard")({
    beforeLoad: async ({ context }) => {
        const session = await context.queryClient.ensureQueryData(profileQuery);
        if (!session) throw redirect({ to: "/onboard" });
    },
});
