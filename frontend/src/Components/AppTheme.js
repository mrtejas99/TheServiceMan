
//Default theme
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext } from "react";
import { Helmet } from 'react-helmet';

import { useDarkMode } from './DarkMode'

/* List of themes from Bootswatch */
const BootswatchTheme = {
	DEFAULT: 'default',
	FLATLY: 'flatly',
	DARKLY: 'darkly',
	CYBORG: 'cyborg',
	SLATE: 'slate',
	CERULEAN: 'cerulean',
	COSMO: 'cosmo',
	JOURNAL: 'journal',
	LITERA: 'litera',
	LUMEN: 'lumen',
	LUX: 'lux',
	MATERIA: 'materia',
	MINTY: 'minty',
	PULSE: 'pulse',
	SANDSTONE: 'sandstone',
	SIMPLEX: 'simplex',
	SKETCHY: 'sketchy',
	SOLAR: 'solar',
	SPACELAB: 'spacelab',
	SUPERHERO: 'superhero',
	UNITED: 'united',
	YETI: 'yeti'
};

/* Bootswatch theme component */
function BoostrapTheme(props) {
	const [ darkMode ] = useDarkMode();
	const lightTheme = props.lightModeTheme || BootswatchTheme.FLATLY;
	const darkTheme = props.darkModeTheme || BootswatchTheme.DARKLY;
	const BSThemeCSS = props.bootswatchCDN + (darkMode ? darkTheme : lightTheme) + '/bootstrap.min.css';
	
	if ((darkMode && darkTheme !== BootswatchTheme.DEFAULT) || (!darkMode && lightTheme !== BootswatchTheme.DEFAULT))
		return (
			<Helmet>
				<link rel="stylesheet" href={BSThemeCSS} type="text/css" />
			</Helmet>
		);

	//Fish <><
	return <></>;
}

BoostrapTheme.defaultProps = {
	bootswatchCDN: 'https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/',
	lightModeTheme: BootswatchTheme.DEFAULT
};

export { BoostrapTheme, BootswatchTheme };
