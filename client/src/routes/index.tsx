import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <h1>LANDING PAGE</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate({ to: "/login" });
                    }}
                >
                    Login
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate({ to: "/signup" });
                    }}
                >
                    Signup
                </button>
            </div>
        </>
    );
}
