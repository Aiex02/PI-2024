import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

interface UploadedFile {
  name: string;
  url: string;
  uploadedAt: Date;
  userId: string;
}

async function uploadFile(file: File): Promise<void> {
  try {
    const fileRef = ref(storage, `documents/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);

    const documentData: UploadedFile = {
      url: downloadURL,
      name: file.name,
      uploadedAt: new Date(),
      userId: auth.currentUser?.uid || "", 
    };

    // Salve o URL no Firestore
    await addDoc(collection(db, "documents"), documentData);
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo: ", error);
    throw error;
  }
}
