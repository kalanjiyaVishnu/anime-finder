import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
const db_anime_ref = collection(db, "anime");
const commnet_ref = collection(db, "comments");
// fetDocs will return the res containing all the docs == returning new array [] == map through all the docs then convert the doc to data by doc.data()
export async function getUserAnimes() {
  const data = await getDocs(db_anime_ref)
    .then(({ docs }) => {
      const actual_data = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      return actual_data;
    })
    .catch((err) => []);
  return data;
}
export async function addToFireStore(anime_data) {
  await addDoc(db_anime_ref, anime_data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
export async function addToComments(comment) {
  await addDoc(commnet_ref, comment)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
export async function removeFromFireStore(id) {
  const anime = doc(db, "anime", id);
  await deleteDoc(anime);
}
