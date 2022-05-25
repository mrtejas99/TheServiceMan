
import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import DarkModeToggle from "react-dark-mode-toggle";

import { ClientSettingsContext } from "./ClientSettings";

/* Dark mode user-settings hook */
function useDarkMode() {
	const [cs, updateCS] = useContext(ClientSettingsContext);
	const [isDarkMode, setIsDarkMode] = useState(cs.darkMode || false);
	useEffect(() => updateCS({"darkMode": isDarkMode}), [isDarkMode]);
	return [isDarkMode, setIsDarkMode];
}

function isDarkTheme() {
	const [ { darkMode } ] = useContext(ClientSettingsContext);
	return darkMode;
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

export { useDarkMode, isDarkTheme, DarkToggle };
