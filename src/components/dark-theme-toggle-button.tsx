import { Accessor } from "solid-js";
import SunIcon from "@/components/icons/sun-icon";
import MoonIcon from "@/components/icons/moon-icon";
import IconButton from "@/components/icon-button";

interface DarkThemeToggleButtonProps {
    activeTheme: Accessor<"dark" | "light">;
    onclick: () => void;
}

const DarkThemeToggleButton = (props: DarkThemeToggleButtonProps) => {
    return (
        <IconButton onclick={props.onclick}>
            {
                props.activeTheme() === "light"
                    ?
                    <MoonIcon />
                    :
                    <SunIcon />
            }
        </IconButton>
    )
}

export default DarkThemeToggleButton;
