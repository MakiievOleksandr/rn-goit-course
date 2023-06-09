// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

// import * as firebase from 'firebase';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDfb6IxLghu6KIfwTonr0p9mT6Ya9M58Bs',
  authDomain: 'rn-project-da9f8.firebaseapp.com',
  projectId: 'rn-project-da9f8',
  storageBucket: 'rn-project-da9f8.appspot.com',
  messagingSenderId: '480923470377',
  appId: '1:480923470377:web:c15aa64cc8662c1c9c6a38',
};

const app = initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export default firebase;
