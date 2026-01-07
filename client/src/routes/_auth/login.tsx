import { supabase } from "@/lib/supabase";
import { profileQuery } from "@/queries/profile";
import { sessionQuery } from "@/queries/session";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/login")({
    beforeLoad: async ({ context }) => {
        const session = await context.queryClient.ensureQueryData(sessionQuery);

        if (session) {
            const profile = await context.queryClient.ensureQueryData(profileQuery(session?.user.id));

            if (!profile) throw redirect({ to: "/create-profile" });
            if (profile) throw redirect({ to: "/home" });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signinMutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return data;
        },
    });

    return (
        <div className="container">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Signin</legend>

                <label className="label">Email</label>
                <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <label className="label">Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button
                    className="btn btn-neutral mt-4"
                    onClick={() => {
                        signinMutation.mutate({ email, password });
                    }}
                    disabled={signinMutation.isPending}
                >
                    signin
                </button>

                {signinMutation.isError && <p className="text-error mt-2">{signinMutation.error.message}</p>}
            </fieldset>
        </div>
    );
}
