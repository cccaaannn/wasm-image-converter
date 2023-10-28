import { SelectBoxItem } from "@/components/select-box";

export enum ImageMimeTypes {
    APNG = "image/apng",
    AVIF = "image/avif",
    GIF = "image/gif",
    JPEG = "image/jpeg",
    PNG = "image/png",
    SVG = "image/svg+xml",
    WEBP = "image/webp",
    ICON = "image/x-icon",
}

export enum SupportedFormats {
    PNG = "png",
    JPG = "jpg",
    WEBP = "webp",
    ICO = "ico"
}

interface ImageFormatDetailType {
    extension: string;
    mimeType: ImageMimeTypes;
    ffmpegCommand: (inputFileName: string, outputFileName: string) => Array<string>;
}

export const ImageFormatDetail: Record<SupportedFormats, ImageFormatDetailType> = {
    png: {
        extension: "png",
        mimeType: ImageMimeTypes.PNG,
        ffmpegCommand: (inputFileName: string, outputFileName: string) => ["-i", inputFileName, outputFileName]
    },
    jpg: {
        extension: "jpg",
        mimeType: ImageMimeTypes.JPEG,
        ffmpegCommand: (inputFileName: string, outputFileName: string) => ["-i", inputFileName, outputFileName]
    },
    webp: {
        extension: "webp",
        mimeType: ImageMimeTypes.WEBP,
        ffmpegCommand: (inputFileName: string, outputFileName: string) => ["-i", inputFileName, outputFileName]
    },
    ico: {
        extension: "ico",
        mimeType: ImageMimeTypes.ICON,
        ffmpegCommand: (inputFileName: string, outputFileName: string) => ["-i", inputFileName, "-vf", "scale=256:256", outputFileName]
    },
}

export const SupportedFormatsList = Object.values(SupportedFormats).map<SelectBoxItem<SupportedFormats>>(format => { return { label: format, value: format as SupportedFormats } });
