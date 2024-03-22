import { getDoc, getDocs, collection, addDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const getPaymentYears = async () => {
  const docRef = collection(db, 'paymentHistory');
  const docSnap = await getDocs(docRef);
  let years = new Set()
  docSnap.docs.forEach(doc => {
    const date = new Date(doc.data().date.seconds * 1000);
    const year = date.getFullYear();  
    years.add(year);
  });
  return years;
};

export const getPaymentCondos = async (property_id) => {
  const docRef = collection(db, 'paymentHistory');
  const docSnap = await getDocs(docRef);
  const condos = new Set();

  const condoPromises = docSnap.docs.map(async doc => {
    const snap = await getDoc(doc.data().condo);
    if (snap.data().propertyId === property_id.toString()){
      const unit = snap.data().unit;
      condos.add(unit);
    }
  });
  await Promise.all(condoPromises);
  return condos;
};

export const getPaymentHistory = async (property_id, unit, year) => {
  const docRef = collection(db, 'paymentHistory');
  const docSnap = await getDocs(docRef);
  const payments = [];

  const paymentPromises = docSnap.docs.map(async doc => {
    const snap = await getDoc(doc.data().condo);
    if (snap.data().propertyId === property_id.toString() && snap.data().unit === unit){
      const date = new Date(doc.data().date.seconds * 1000);
      if (date.getFullYear() === year){
        payments.push(doc.data());
      }
    }
  });
  await Promise.all(paymentPromises);
  return payments;
};

export const fetchPaymentsByYearAndCondo = async (propertyId, unit, year) => {
  const condoSnap = await getDocs(query(collection(db, 'condoUnits'), where('unit', '==', unit.toString())))
  const condoId = (condoSnap.docs[0].data().id)
  const paymentsRef = collection(db, 'paymentHistory');
  const querySnapshot = await getDocs(query(paymentsRef, 
    where('date', '>=', new Date(`${year}-01-01`)),
    where('date', '<=', new Date(`${year}-12-31`)),
    where('condo', '==', doc(db, `condoUnits/${condoId}`))
  ));
  
  const condoPayments = Array(12).fill(0);
  const parkingPayments = Array(12).fill(0);
  const lockerPayments = Array(12).fill(0);

  await Promise.all(querySnapshot.docs.map(async (doc) => {
    const payment = doc.data();
    const paymentDate = new Date(payment.date * 1000)
    const month = paymentDate.getMonth();
    if (payment.type === 'condo') {
      condoPayments[month] += payment.amount;
    } else if (payment.type === 'parking') {
      parkingPayments[month] += payment.amount;
    } else if (payment.type === 'locker') {
      lockerPayments[month] += payment.amount;
    }
  }));
  return [condoPayments, parkingPayments, lockerPayments];
};

// export const addPayment = async () => {
//   await Promise.all(Array.from({length: 12}, async (_, index) => {
//     const month = index + 1;
//     const date = new Date(`2023-${month}-25`);
//     await addDoc(collection(db, 'paymentHistory'), {
//       amount: 120,
//       condo: doc(db, 'condoUnits/1'),
//       date: date,
//       type: "locker",
//       user: doc(db, 'users/1')
//     });
//     console.log(`Payment added for month ${month}`);
//   }));

//   alert('Payments added for all 12 months');
// };