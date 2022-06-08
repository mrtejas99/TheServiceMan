
/* Some constants to use in the application */

//How many items to load at once on home page
const RESULTS_PER_PAGE = 5;

const RATING_MASTER = [
    {
        "rating_name": "1 star",
        "value": 1,
        "suffix": " & above",
    },
    {
        "rating_name": "2 stars",
        "suffix": " & above",
        "value": 2
    },
    {
        "rating_name": "3 stars",
        "suffix": " & above",
        "value": 3
    },
    {
        "rating_name": "4 stars",
        "suffix": " & above",
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
        "value": "english"
    },
    {
        "language_name": "हिन्दी",
        "value": "hindi"
    },
    {
        "language_name": "ગુજરાતી",
        "value": "gujarati"
    },
    {
        "language_name": "मराठी",
        "value": "marathi"
    },
    {
        "language_name": "বাংলা",
        "value": "bengali"
    },
    {
        "language_name": "தமிழ்",
        "value": "tamil"
    },
    {
        "language_name": "ଓଡିଆ",
        "value": "odia"
    },
    {
        "language_name": "कोंकणी",
        "value": "konkani"
    },
    {
        "language_name": "தெலுங்கு",
        "value": "telugu"
    },
    {
        "language_name": "ಕನ್ನಡ",
        "value": "kannada"
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
	USER_ROLES
};
