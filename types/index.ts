export interface    Video {
    id: string;
    title: string;
    description?: string;
    publicId: string;
    originalSize: number;
    compressedSize: number;
    duration: number;
    format: string;
    createdAt: string;
}