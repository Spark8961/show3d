import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_auth/signup")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signupMutation = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            if (data.session) navigate({ to: "/create-profile" });
        },
    });

    return (
        <div className="container">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Signup</legend>

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
                        signupMutation.mutate();
                    }}
                    disabled={signupMutation.isPending}
                >
                    signup
                </button>

                {signupMutation.isError && <p className="text-error mt-2">{signupMutation.error.message}</p>}
            </fieldset>
        </div>
    );
}
