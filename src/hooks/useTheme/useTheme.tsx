import Theme from '@/hooks/useTheme/theme-context';
import { createEffect, onMount } from 'solid-js';
import { ThemeType } from "./types";

const THEME_STORAGE_KEY = "THEME";

const useTheme = () => {

    onMount(() => {
        const loadedTheme: string | null = localStorage.getItem(THEME_STORAGE_KEY);
        if (loadedTheme === null || !Object.values<string>(ThemeType).includes(loadedTheme)) return;
        Theme.setActiveTheme(loadedTheme as ThemeType);
    });

    createEffect(() => {
        if (Theme.activeTheme() === ThemeType.light) {
            localStorage.setItem(THEME_STORAGE_KEY, ThemeType.light);
            document.documentElement.classList.remove(ThemeType.dark);
        }

        if (Theme.activeTheme() === ThemeType.dark) {
            localStorage.setItem(THEME_STORAGE_KEY, ThemeType.dark);
            document.documentElement.classList.add(ThemeType.dark);
        }
    });

    const toggleTheme = () => {
        Theme.setActiveTheme(Theme.activeTheme() === ThemeType.dark ? ThemeType.light : ThemeType.dark);
    }

    return {
        theme: Theme.activeTheme,
        toggleTheme
    }
}

export default useTheme;
