import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const firebaseDB = getFirestore(app);

const createNewUser = async (name: string) => {
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

export { createNewUser };
