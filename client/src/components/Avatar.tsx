import { useState } from "react";

export type AvatarProps = {
    username: string;
    src?: string | null;
    size?: number;
};

function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function colorFromString(str: string) {
    const hash = hashString(str);
    return `hsl(${hash % 360}, 65%, 50%)`;
}

export const Avatar = ({ username, src, size = 32 }: AvatarProps) => {
    const [loaded, setLoaded] = useState(false);

    const initial = username.trim().charAt(0).toUpperCase();
    const color = colorFromString(username);

    return (
        <span
            className="relative rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden select-none"
            style={{
                width: size,
                height: size,
                backgroundColor: color,
            }}
        >
            <span
                style={{
                    fontSize: Math.round(size * 0.45),
                }}
                className="font-medium text-white"
            >
                {initial}
            </span>

            {src && <img src={src} alt={username} onLoad={() => setLoaded(true)} className={`absolute inset-0 h-full w-full object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`} />}
        </span>
    );
};
