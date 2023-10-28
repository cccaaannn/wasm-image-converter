import Button from '@/components/button';
import DragDropFilePicker from '@/components/drag-drop-file-picker';
import SelectBox from '@/components/select-box';
import useFFmpeg from '@/hooks/useFFmpeg/useFFmpeg';
import { SupportedFormats, SupportedFormatsList } from '@/types/image-format';
import FileUtils from '@/utils/file-utils';
import { Show, createSignal } from 'solid-js';
import Spinner from '@/components/spinner';
import ErrorAlert from '@/components/error-alert';
import DarkThemeToggleButton from '@/components/dark-theme-toggle-button';
import useTheme from '@/hooks/useTheme/useTheme';

function Home() {
    const [selectedFile, setSelectedFiles] = createSignal<File | null>(null);

    const [outputFormat, setOutputFormat] = createSignal<SupportedFormats>(SupportedFormats.ICO);

    const { theme, toggleTheme } = useTheme();

    const { convert, ready, error } = useFFmpeg();

    const onConvert = async () => {
        const file = selectedFile();
        if (!file) return;

        const conversionResult = await convert(file, outputFormat());

        if (conversionResult.status) {
            FileUtils.download(conversionResult.outputFile);
        }

        setSelectedFiles(null);
    }

    return (
        <div class="flex flex-col gap-2 mt-16 mx-auto max-w-screen-md px-4">

            <div class="grid justify-items-center grid-cols-3">
                <div class="flex flex-col justify-center items-center col-start-2">
                    <h1 class="text-gray-900 dark:text-white text-3xl py-1">
                        wasico
                    </h1>
                </div>

                <div class="ml-auto flex justify-end items-end">
                    <DarkThemeToggleButton onclick={toggleTheme} activeTheme={theme} />
                </div>
            </div>

            <Show when={error()}>
                <ErrorAlert label={<><span class="font-medium">Error!</span> An error occurred while converting</>} />
            </Show>

            <Show
                when={ready()}
                fallback={
                    <div class="flex flex-col gap-4 items-center">
                        <Spinner />
                        <span class="text-gray-900 dark:text-white">Loading FFmpeg...</span>
                    </div>
                }
            >
                <div class="flex flex-col gap-2">
                    <DragDropFilePicker
                        file={selectedFile}
                        onchange={setSelectedFiles}
                        accept="image/*"
                    />

                    <div class="flex gap-4 justify-between items-end">
                        <SelectBox
                            // label="Output format"
                            items={SupportedFormatsList}
                            value={outputFormat}
                            onchange={setOutputFormat}
                        />

                        <Button class="h-10" onclick={onConvert} disabled={selectedFile() === null}>
                            Convert
                        </Button>
                    </div>
                </div>
            </Show>

        </div>
    )
}

export default Home;
