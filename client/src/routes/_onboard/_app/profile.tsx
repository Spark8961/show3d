import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_onboard/_app/profile")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_onboard/_app/profile"!</div>;
}
