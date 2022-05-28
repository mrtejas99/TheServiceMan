
import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
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
		<Nav.Item className="d-flex align-items-center">
			<DarkModeToggle
				onChange={setIsDarkMode}
				checked={isDarkMode}
				size={48}
			/>
		</Nav.Item>
	);
}

export { useDarkMode, DarkToggle };
