import HeightIcon from "@/components/icons/height-icon";
import WidthIcon from "@/components/icons/width-icon";
import { Accessor, Setter } from "solid-js";
import { Scale } from "@/pages/advanced-settings/useAdvancedSettings";

interface AdvancedSettingsProps {
    scale: Accessor<Scale>;
    setScale: Setter<Scale>;
}

const AdvancedSettings = (props: AdvancedSettingsProps) => {
    return (
        <div
            class="
            flex 
            flex-col 
            items-center 
            justify-center 
            w-full 
            p-4
            rounded-lg 
            bg-gray-50 
            dark:bg-gray-700 
            "
        >
            <div class="flex items-center md:gap-20 md:flex-row gap-5 flex-col w-full">
                <div class="flex w-full">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <WidthIcon />
                    </span>
                    <input value={props.scale().width} onchange={(e) => props.setScale(scale => { return { ...scale, width: e.target.value } })} type="number" placeholder="width" class="rounded-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <span class="pb-1 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        px
                    </span>
                </div>
                <h3 class="text-gray-900 dark:text-gray-500 text-xl py-1 md:flex hidden">
                    X
                </h3>
                <div class="flex w-full">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <HeightIcon />
                    </span>
                    <input value={props.scale().height} onchange={(e) => props.setScale(scale => { return { ...scale, height: e.target.value } })} type="number" placeholder="height" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <span class="pb-1 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        px
                    </span>
                </div>
            </div>

        </div>
    )
}

export default AdvancedSettings;
