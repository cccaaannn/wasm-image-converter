import { SupportedFormats, ImageFormatDetail } from '@/types/image-format';
import FileUtils from '@/utils/file-utils';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { FileData, LogEvent, ProgressEvent } from '@ffmpeg/ffmpeg/dist/esm/types';
import { fetchFile } from '@ffmpeg/util';
import { createSignal, onMount, onCleanup } from 'solid-js';
import { ConversionResult, UseFFmpeg } from './types';

const useFFmpeg = (): UseFFmpeg => {
    const [ready, setReady] = createSignal<boolean>(false);
    const [progress, setProgress] = createSignal(0);
    const [log, setLog] = createSignal("");
    const [error, setError] = createSignal<number>(0);

    const ffmpeg = new FFmpeg();

    onMount(async () => await _load());

    onCleanup(async () => await _unload());

    const _onMessage = () => (logEvent: LogEvent) => {
        setLog(logEvent.message);
    }

    const _onProgress = () => (progressEvent: ProgressEvent) => {
        setProgress(progressEvent.progress);
    }

    const _load = async () => {

        ffmpeg.on('log', _onMessage);
        ffmpeg.on('progress', _onProgress);

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
        ffmpeg.off('progress', _onProgress);
        setReady(false);
    }

    const convert = async (file: File, outputFormat: SupportedFormats): Promise<ConversionResult> => {

        const { name, extension } = FileUtils.splitExtension(file.name);

        if (Object.values(ImageFormatDetail).filter(formatDetail => formatDetail.extension === extension.toLowerCase()).length !== 1) {
            console.error("[UseFFmpeg] Unsupported format");
            return { status: false };
        }

        const inputFormat = extension.toLowerCase() as SupportedFormats;

        const inputFileName = `img.${ImageFormatDetail[inputFormat].extension}`;
        const outputFileName = `${name}.${ImageFormatDetail[outputFormat].extension}`;

        await ffmpeg.writeFile(inputFileName, await fetchFile(file));
        const conversionResult = await ffmpeg.exec(ImageFormatDetail[outputFormat].ffmpegCommand(inputFileName, outputFileName));

        setError(conversionResult);
        if (conversionResult) {
            console.error(`[UseFFmpeg] File conversion error, ffmpeg result: ${conversionResult}`);
            return { status: false };
        }

        console.debug("[UseFFmpeg] File conversion completed successfully");

        const fileData: FileData = await ffmpeg.readFile(outputFileName) as Uint8Array;
        const blob = new Blob([fileData], { type: ImageFormatDetail[outputFormat].mimeType });
        const outputFile: File = new File([blob], outputFileName);

        return {
            status: true,
            outputFile: outputFile
        };
    }

    return {
        ready,
        progress,
        log,
        error,
        convert
    };
}

export default useFFmpeg;
