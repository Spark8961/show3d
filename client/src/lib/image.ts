export async function imageToWebp(file: File, size = 256, quality = 0.8): Promise<File> {
    const bitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unsupported");

    const scale = Math.max(size / bitmap.width, size / bitmap.height);
    const x = (size - bitmap.width * scale) / 2;
    const y = (size - bitmap.height * scale) / 2;

    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, bitmap.width * scale, bitmap.height * scale);

    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/webp", quality);
    });

    return new File([blob], "avatar.webp", { type: "image/webp" });
}
