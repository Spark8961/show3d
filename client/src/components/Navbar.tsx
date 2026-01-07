import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "./Avatar";
import { profileQuery } from "@/queries/profile";
import { sessionQuery } from "@/queries/session";
import { supabase } from "@/lib/supabase";

export const Navbar = () => {
    const queryClient = useQueryClient();
    const session = queryClient.getQueryData(sessionQuery.queryKey)!;
    const uid = session.user.id;
    const profile = queryClient.getQueryData(profileQuery(uid).queryKey)!;
    const logOutMutation = useMutation({
        mutationFn: async () => {
            await supabase.auth.signOut();
        },
        onSuccess: () => {
            queryClient.clear();
        },
    });
    return (
        <div className="navbar bg-base shadow-sm">
            <div className="flex-1">
                <Link to="/home" className="text-2xl px-3 py-2 hover:bg-transparent border-none shadow-none">
                    Show3D
                </Link>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w10 rounded-full">
                            <Avatar username={profile.display_name} src={profile.img_url} />
                        </div>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a
                                className="text-error"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logOutMutation.mutate();
                                }}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
