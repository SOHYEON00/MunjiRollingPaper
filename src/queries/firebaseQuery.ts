import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app, storage } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref } from "firebase/storage";

const firebaseDB = getFirestore(app);

export const createNewUser = async (name: string) => {
  try {
    const created = new Date();
    const newUser = await addDoc(collection(firebaseDB, "users"), {
      name,
      id: uuidv4(),
      image: "",
      created: created.toISOString(),
    });

    return newUser;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getCurrentUser = async (id: string) => {
  try {
    const docRef = doc(firebaseDB, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log("Fail to Get Current User", e);
  }
};

export const setUserImage = async (
  id: string,
  newInfo: Record<string, string>
) => {
  try {
    const docRef = doc(firebaseDB, "users", id);
    const setData = await setDoc(docRef, newInfo, { merge: true });

    console.log(setData);
  } catch (e) {
    console.log("Fail to Set User Info", e);
  }
};

export const storagePath = "gs://mungi-rollingpaper.appspot.com/";

export const getStorageURl = async (filename = "") => {
  return getDownloadURL(ref(storage, `${storagePath}${filename}`))
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((e) => {
      Promise.reject(e);
    });
};
