import { useEffect, useRef, useState } from "react";
import type { AvatarProps } from "@/components/Avatar";
import { Avatar } from "@/components/Avatar";

type ImagePickerProps = {
    avatar: Pick<AvatarProps, "username" | "size">;
    initialSrc?: string | null;
    onChange?: (file: File | null) => void;
};

export const ImagePicker = ({ initialSrc, onChange, avatar }: ImagePickerProps) => {
    const size = avatar.size ?? 128;
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(initialSrc ?? null);

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleSelect = (file?: File) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) return;
        if (file.size > 2 * 1024 * 1024) return;

        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange?.(file);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const clear = () => {
        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        onChange?.(null);
    };

    return (
        <>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleSelect(e.target.files?.[0])} />

            <button type="button" onClick={() => inputRef.current?.click()} className="inline-block">
                <Avatar username={avatar.username} src={preview} size={size} />
            </button>
            <button type="button" onClick={clear}>
                Remove
            </button>
        </>
    );
};
