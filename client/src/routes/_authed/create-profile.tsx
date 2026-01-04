import { api } from "@/lib/api";
import { profileQuery } from "@/queries/profile";
import { sessionQuery } from "@/queries/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authed/create-profile")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const [displayname, setDisplayname] = useState("");
    const [username, setUsername] = useState("");
    const queryClient = useQueryClient();
    const createProfileMutation = useMutation({
        mutationFn: async ({ displayname, username }: { displayname: string; username: string }) => {
            await api.post("/profile/create", { displayname, username });
        },
        onSuccess: async () => {
            const session = queryClient.getQueryData(sessionQuery.queryKey)!;
            await queryClient.refetchQueries(profileQuery(session.user.id));
            navigate({ to: "/home" });
        },
    });

    return (
        <div className="container">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Signup</legend>

                <label className="label">Display Name</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Display Name"
                    value={displayname}
                    onChange={(e) => {
                        setDisplayname(e.target.value);
                    }}
                />

                <label className="label">Username</label>
                <input
                    type="text"
                    className="input"
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />

                <button
                    className="btn btn-neutral mt-4"
                    onClick={() => {
                        createProfileMutation.mutate({ displayname, username });
                    }}
                    disabled={createProfileMutation.isPending}
                >
                    signup
                </button>

                {createProfileMutation.isError && <p className="text-error mt-2">{createProfileMutation.error.message}</p>}
            </fieldset>
        </div>
    );
}
