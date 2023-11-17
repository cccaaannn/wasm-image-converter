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
    outputFormat: SupportedFormats;
    width: string;
    height: string;
}

export interface FFmpegCommandParameters {
    inputFileName: string;
    outputFileName: string;
    width: string;
    height: string;
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

export enum SupportedFormats {
    PNG = "png",
    JPG = "jpg",
    WEBP = "webp",
    ICO = "ico"
}

interface ImageFormatDetailType {
    extension: string;
    mimeType: ImageMimeTypes;
}

export const ImageFormatDetail: Record<SupportedFormats, ImageFormatDetailType> = {
    png: {
        extension: "png",
        mimeType: ImageMimeTypes.PNG
    },
    jpg: {
        extension: "jpg",
        mimeType: ImageMimeTypes.JPEG
    },
    webp: {
        extension: "webp",
        mimeType: ImageMimeTypes.WEBP
    },
    ico: {
        extension: "ico",
        mimeType: ImageMimeTypes.ICON
    },
}

export interface UseFFmpeg {
    ready: Accessor<boolean>;
    loading: Accessor<boolean>;
    log: Accessor<string>;
    convert: (conversionProps: ConversionProps) => Promise<ConversionResult>;
}
