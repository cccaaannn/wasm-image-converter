import { createSignal, createRoot } from "solid-js";
import { ThemeType } from "./types";

const createTheme = () => {
    const [activeTheme, setActiveTheme] = createSignal<ThemeType>(ThemeType.light);
    return { activeTheme, setActiveTheme };
}

export default createRoot(createTheme);
