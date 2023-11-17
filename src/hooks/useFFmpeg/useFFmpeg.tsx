import { SupportedFormats, ImageFormatDetail } from '@/hooks/useFFmpeg/types';
import FileUtils from '@/utils/file-utils';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { FileData, LogEvent } from '@ffmpeg/ffmpeg/dist/esm/types';
import { fetchFile } from '@ffmpeg/util';
import { createSignal, onMount, onCleanup } from 'solid-js';
import { ConversionProps, ConversionResult, FFmpegCommandParameters, UseFFmpeg } from './types';

const formatFFmpegCommand = (parameters: FFmpegCommandParameters): string[] => {
    const command = ["-i", parameters.inputFileName];

    command.push("-vf");
    const scale = `${parameters.width ?? -1}:${parameters.height ?? -1}`;
    command.push(`scale=${scale}`);

    command.push(parameters.outputFileName);

    return command;
}

const useFFmpeg = (): UseFFmpeg => {
    const [ready, setReady] = createSignal<boolean>(false);
    const [loading, setLoading] = createSignal<boolean>(false);
    const [log, setLog] = createSignal("");

    const ffmpeg = new FFmpeg();

    onMount(async () => await _load());

    onCleanup(async () => await _unload());

    const _onMessage = () => (logEvent: LogEvent) => {
        setLog(logEvent.message);
    }

    const _load = async () => {

        ffmpeg.on('log', _onMessage);

        await ffmpeg.load({
            coreURL: "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.js",
            wasmURL: "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.wasm",
            workerURL: "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm/ffmpeg-core.worker.js",
        });

        setReady(true);

        console.debug("[UseFFmpeg] FFmeg loaded");
    }

    const _unload = async () => {
        ffmpeg.off('log', _onMessage);
        setReady(false);
    }

    const convert = async (conversionProps: ConversionProps): Promise<ConversionResult> => {
        setLoading(true);

        const { name, extension } = FileUtils.splitExtension(conversionProps.file.name);

        if (!Object.values(ImageFormatDetail).some(formatDetail => formatDetail.extension === extension.toLowerCase())) {
            console.error("[UseFFmpeg] Unsupported format");
            setLoading(false);
            return {
                status: false,
                message: `Unsupported format '${extension}'.`
            };
        }

        const inputFormat = extension.toLowerCase() as SupportedFormats;

        const inputFileName = `img.${ImageFormatDetail[inputFormat].extension}`;
        const outputFileName = `${name}.${ImageFormatDetail[conversionProps.outputFormat].extension}`;

        const parameters: FFmpegCommandParameters = {
            inputFileName: inputFileName,
            outputFileName: outputFileName,
            ...conversionProps
        }

        const command = formatFFmpegCommand(parameters);

        await ffmpeg.writeFile(inputFileName, await fetchFile(conversionProps.file));
        const conversionResult = await ffmpeg.exec(command);

        if (conversionResult) {
            console.error(`[UseFFmpeg] File conversion error, ffmpeg result: ${conversionResult}`);
            setLoading(false);
            return {
                status: false,
                message: "An error occurred while converting."
            };
        }

        console.debug("[UseFFmpeg] File conversion completed successfully");

        const fileData: FileData = await ffmpeg.readFile(outputFileName) as Uint8Array;
        const blob = new Blob([fileData], { type: ImageFormatDetail[conversionProps.outputFormat].mimeType });
        const outputFile: File = new File([blob], outputFileName);

        setLoading(false);
        return {
            status: true,
            outputFile: outputFile
        };
    }

    return {
        ready,
        loading,
        log,
        convert
    };
}

export default useFFmpeg;
