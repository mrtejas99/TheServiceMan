
import {
    FirebaseAuthProvider,
    FirebaseDataProvider
} from 'react-admin-firebase';

import { firebaseConfig } from '../firebase';

const options = {};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

export { dataProvider, authProvider };
