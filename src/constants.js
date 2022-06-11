
/* Some constants to use in the application */

//How many items to load at once on home page
const RESULTS_PER_PAGE = 5;

//Radius within which ads should be filtered, in Meters (50e3 is 50km)
const GEOSEARCH_PROXIMITY_RANGE = 50e3;

const RATING_MASTER = [
    {
        "rating_name": "1 star",
        "value": 1,
        "suffix": "& above",
    },
    {
        "rating_name": "2 stars",
        "suffix": "& above",
        "value": 2
    },
    {
        "rating_name": "3 stars",
        "suffix": "& above",
        "value": 3
    },
    {
        "rating_name": "4 stars",
        "suffix": "& above",
        "value": 4
    },
    {
        "rating_name": "5 stars",
        "value": 5
    }
];

const LANGUAGE_MASTER = [
    {
        "language_name": "English",
        "value": "english",
		"code": "en"
    },
    {
        "language_name": "हिन्दी",
        "value": "hindi",
		"code": "hi"
    },
    {
        "language_name": "ગુજરાતી",
        "value": "gujarati",
		"code": "guj"
    },
    {
        "language_name": "मराठी",
        "value": "marathi",
		"code": "mr"
    },
    {
        "language_name": "বাংলা",
        "value": "bengali",
		"code": "bn"
    },
    {
        "language_name": "தமிழ்",
        "value": "tamil",
		"code": "ta"
    },
    {
        "language_name": "ଓଡିଆ",
        "value": "odia",
		"code": "or"
    },
    {
        "language_name": "कोंकणी",
        "value": "konkani",
		"code": "kok"
    },
    {
        "language_name": "தெலுங்கு",
        "value": "telugu",
		"code": "te"
    },
    {
        "language_name": "ಕನ್ನಡ",
        "value": "kannada",
		"code": "kn"
    }
];

const USER_ROLES = [
	{
		'name': 'superadmin',
		'id': 0
	},
	{
		'name': 'admin',
		'id': 1
	},
	{
		'name': 'user',
		'id': 2
	}
];

export {
    RESULTS_PER_PAGE,
    RATING_MASTER,
    LANGUAGE_MASTER,
    GEOSEARCH_PROXIMITY_RANGE,
	USER_ROLES
};
