
import FirebaseKeys from './FirebaseKeys';
import * as firebase from 'firebase';

firebase.initializeApp(FirebaseKeys.FirebaseConfig);

export default firebase;
