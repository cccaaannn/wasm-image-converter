import { Accessor } from "solid-js";

type ConversionErrorResult = {
    status: false;
    message: string;
}

type ConversionSuccessResult = {
    status: true;
    outputFile: File;
}

export type ConversionResult = ConversionSuccessResult | ConversionErrorResult;

export interface ConversionProps {
    file: File;
    outputFormat: SupportedFormat;
    width: number | null;
    height: number | null;
}

export interface FFmpegCommandParameters {
    inputFileName: string;
    outputFileName: string;
    outputFormat: SupportedFormat;
    width: number | null;
    height: number | null;
}

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

export enum SupportedFormat {
    PNG = "png",
    JPG = "jpg",
    JPEG = "jpeg",
    WEBP = "webp",
    ICO = "ico",
    SVG = "svg",
    GIF = "gif",
    APNG = "apng"
}

interface ImageFormatDetailType {
    extension: string;
    mimeType: ImageMimeTypes;
    maxWidth: number;
    maxHeight: number;
    defaultWidth: number;
    defaultHeight: number;
}

export const ImageFormatDetail: Record<SupportedFormat, ImageFormatDetailType> = {
    png: {
        extension: "png",
        mimeType: ImageMimeTypes.PNG,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    },
    jpg: {
        extension: "jpg",
        mimeType: ImageMimeTypes.JPEG,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    },
    jpeg: {
        extension: "jpeg",
        mimeType: ImageMimeTypes.JPEG,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    },
    webp: {
        extension: "webp",
        mimeType: ImageMimeTypes.WEBP,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    },
    ico: {
        extension: "ico",
        mimeType: ImageMimeTypes.ICON,
        maxWidth: 256,
        maxHeight: 256,
        defaultWidth: 256,
        defaultHeight: 256
    },
    svg: {
        extension: "svg",
        mimeType: ImageMimeTypes.SVG,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    },
    gif: {
        extension: "gif",
        mimeType: ImageMimeTypes.GIF,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    },
    apng: {
        extension: "apng",
        mimeType: ImageMimeTypes.APNG,
        maxWidth: Infinity,
        maxHeight: Infinity,
        defaultWidth: -1,
        defaultHeight: -1
    }
}

export interface UseFFmpeg {
    ready: Accessor<boolean>;
    loading: Accessor<boolean>;
    log: Accessor<string>;
    convert: (conversionProps: ConversionProps) => Promise<ConversionResult>;
}
