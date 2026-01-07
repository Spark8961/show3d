import { useEffect, useRef, useState } from "react";

type ImagePickerProps = {
    initialSrc?: string | null;
    onChange?: (file: File | null) => void;
};

export const ImagePicker = ({ initialSrc, onChange }: ImagePickerProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(initialSrc ?? null);

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleSelect(file?: File) {
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange?.(file);
    }

    return (
        <>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleSelect(e.target.files?.[0])} />

            <button type="button" className="avatar placeholder" onClick={() => inputRef.current?.click()}>
                <div className="w-32 rounded-full bg-base-300 overflow-hidden">{preview ? <img src={preview} alt="Preview" className="object-cover w-full h-full" /> : <span className="text-sm opacity-60">Pick image</span>}</div>
            </button>
        </>
    );
};
