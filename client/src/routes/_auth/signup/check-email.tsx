import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup/check-email")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Plese check your email.</div>;
}
