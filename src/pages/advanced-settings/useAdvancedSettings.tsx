import { createSignal } from "solid-js";

export interface Scale {
    width: string;
    height: string;
}

const useAdvancedSettings = () => {
    const [settingsVisible, setSettingsVisible] = createSignal<boolean>(false);
    const [scale, setScale] = createSignal<Scale>({ width: "", height: "" });

    return {
        settingsVisible,
        setSettingsVisible,
        scale,
        setScale
    }
}

export default useAdvancedSettings;
