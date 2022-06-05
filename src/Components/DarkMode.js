
import React, { useContext } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

import { ClientSettingsContext } from "./ClientSettings";

/* Dark mode user-settings hook */
function useDarkMode() {
    const [cs, updateCS] = useContext(ClientSettingsContext);
    const setIsDarkMode = (dark_mode) => updateCS({"darkMode": dark_mode});
    let isDarkMode;
    if (cs === undefined || cs.darkMode === undefined)
        setIsDarkMode((isDarkMode = false));
    else
        isDarkMode = cs.darkMode;
    return [isDarkMode, setIsDarkMode];
}

/* Dark mode switch UI component */
function DarkToggle() {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    return (
        <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={48}
        />
    );
}

export { useDarkMode, DarkToggle };
