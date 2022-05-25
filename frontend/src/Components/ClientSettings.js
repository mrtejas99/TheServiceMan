
/* Client (navigator) settings */

import useLocalStorage from "use-local-storage";
import React, { createContext } from "react";

const ClientSettingsContext = createContext();

function useClientSettings() {
	const [clientSettings, setClientSettings] = useLocalStorage("userSettings", {});
	const updateClientSetting = properties => setClientSettings(Object.assign(Object.assign({}, clientSettings), properties));
	return [clientSettings, updateClientSetting];
}

function ClientSettingsProvider(props) {
	const csHook = useClientSettings();
	return (
		<ClientSettingsContext.Provider value={csHook}>
			{props.children}
		</ClientSettingsContext.Provider>
	);
}

export { useClientSettings, ClientSettingsContext, ClientSettingsProvider };
