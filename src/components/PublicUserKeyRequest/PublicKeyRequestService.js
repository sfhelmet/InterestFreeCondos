import { doc, setDoc, getDoc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const uploadKey = async (keyNumber, expiration_date) => {
    await setDoc(doc(db, 'usedKeys', keyNumber), {
        key: keyNumber,
        expiration_date: expiration_date,
    });
};

export const keyExists = async (keyNumber) => {
    const docRef = doc(db, 'usedKeys', keyNumber);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};

export const getUserIdbyEmail = async (email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].id;
};

export const updateCondo = async (userId, condoUnit, userType) => {
    const typeId = userType === 'Renter' ? 'renterId' : 'ownerId';
    const condoRef = collection(db, 'condoUnits');
    const q = query(condoRef, where('unit', '==', condoUnit));

    getDocs(q)
    .then((querySnapshot) => {
    querySnapshot.forEach((document) => {
        const docRef = doc(db, 'condoUnits', document.id);

        updateDoc(docRef, 
            { [typeId] : userId})
        .then(() => {
            console.log('Document successfully updated!');
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
        });
    });
    })
    .catch((error) => {
    console.error('Error getting documents: ', error);
    });
};