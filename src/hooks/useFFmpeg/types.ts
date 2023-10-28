import { SupportedFormats } from "@/types/image-format";
import { Accessor } from "solid-js";

type ConversionErrorResult = {
    status: false;
}

type ConversionSuccessResult = {
    status: true;
    outputFile: File;
}

export type ConversionResult = ConversionSuccessResult | ConversionErrorResult;

export interface UseFFmpeg {
    ready: Accessor<boolean>;
    progress: Accessor<number>;
    log: Accessor<string>;
    error: Accessor<number>;
    convert: (file: File, outputFormat: SupportedFormats) => Promise<ConversionResult>;
}
