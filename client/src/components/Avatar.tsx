type AvatarProps = {
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
    const initials = username.trim().charAt(0).toUpperCase();
    const color = colorFromString(username);

    return (
        <div
            style={{
                width: size,
                height: size,
                backgroundColor: src ? "transparent" : color,
            }}
            className="
        rounded-full
        flex items-center justify-center
        text-white text-sm font-medium
        overflow-hidden
        select-none"
        >
            {src ? <img src={src} alt={username} className="h-full w-full object-cover" /> : initials}
        </div>
    );
};
