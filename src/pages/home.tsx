import ConvertButton from '@/components/convert-button';
import DragDropFilePicker from '@/components/drag-drop-file-picker';
import SelectBox from '@/components/select-box';
import useFFmpeg from '@/hooks/useFFmpeg/useFFmpeg';
import { SupportedFormat } from '@/hooks/useFFmpeg/types';
import FileUtils from '@/utils/file-utils';
import { Show, createSignal } from 'solid-js';
import Spinner from '@/components/spinner';
import ErrorAlert from '@/components/error-alert';
import DarkThemeToggleButton from '@/components/dark-theme-toggle-button';
import useTheme from '@/hooks/useTheme/useTheme';
import IconButton from '@/components/icon-button';
import GearIcon from '@/components/icons/gear-icon';
import { ConversionProps } from '@/hooks/useFFmpeg/types';
import useAdvancedSettings from '@/pages/advanced-settings/useAdvancedSettings';
import AdvancedSettings from '@/pages/advanced-settings/advanced-settings';
import { SelectBoxItem } from "@/components/select-box";
import InfoIcon from '@/components/icons/info-icon';
import InfoAlert from '@/components/info-alert';

export const SupportedFormatsList = Object.values(SupportedFormat).map<SelectBoxItem<SupportedFormat>>(format => { return { label: format, value: format as SupportedFormat } });

function Home() {
    const [selectedFile, setSelectedFiles] = createSignal<File | null>(null);

    const [outputFormat, setOutputFormat] = createSignal<SupportedFormat>(SupportedFormat.ICO);

    const { settingsVisible, setSettingsVisible, scale, setScale } = useAdvancedSettings();

    const { theme, toggleTheme } = useTheme();

    const { ready, loading, convert } = useFFmpeg();

    const [error, setError] = createSignal<string>("");
    const [infoVisible, setInfoVisible] = createSignal<boolean>(false);

    const onConvert = async () => {
        const file = selectedFile();
        if (!file) return;

        const conversionProps: ConversionProps = {
            file: file,
            outputFormat: outputFormat(),
            width: scale().width ? parseInt(scale().width, 10) : null,
            height: scale().height ? parseInt(scale().height, 10) : null
        }

        const conversionResult = await convert(conversionProps);

        conversionResult.status ? setError("") : setError(conversionResult.message);

        if (conversionResult.status) {
            FileUtils.download(conversionResult.outputFile);
        }

        setSelectedFiles(null);
    }

    return (
        <div class="flex flex-col gap-3 mt-16 mx-auto max-w-screen-md px-4">

            <div class="flex justify-between items-end">
                <IconButton onclick={() => setInfoVisible(!infoVisible())}>
                    <InfoIcon />
                </IconButton>

                <h1 class="text-gray-900 dark:text-white text-3xl py-1">
                    wasico
                </h1>

                <DarkThemeToggleButton onclick={toggleTheme} activeTheme={theme} />
            </div>

            <Show when={infoVisible()}>
                <InfoAlert label={
                    <div class="flex flex-col">
                        <span class="font-medium">Usage</span>
                        <span>- Leave scale values empty to keep the original value.</span>
                        <span>- Ico format supports up to 255x255.</span>
                    </div>
                } />
            </Show>

            <Show when={error()}>
                <ErrorAlert label={<><span class="font-medium">Error!</span> {error()}</>} />
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
                <div class="flex flex-col gap-4">
                    <DragDropFilePicker
                        file={selectedFile}
                        onchange={setSelectedFiles}
                        accept="image/*"
                    />

                    <div class="flex justify-between items-end">
                        <div class="flex items-center gap-2">
                            <SelectBox
                                items={SupportedFormatsList}
                                value={outputFormat}
                                onchange={setOutputFormat}
                            />

                            <IconButton
                                onclick={() => setSettingsVisible(!settingsVisible())}
                            >
                                <GearIcon />
                            </IconButton>
                        </div>

                        <ConvertButton
                            onclick={onConvert}
                            disabled={selectedFile() === null || loading()}
                            loading={loading()}
                        />
                    </div>

                    <Show when={settingsVisible()}>
                        <AdvancedSettings scale={scale} setScale={setScale} />
                    </Show>

                </div>
            </Show>

        </div>
    )
}

export default Home;
