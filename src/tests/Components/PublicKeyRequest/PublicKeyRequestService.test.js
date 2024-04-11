
import '@testing-library/jest-dom/extend-expect';
import { uploadKey, keyExists, getUserIdbyEmail, updateCondo } from '../../../components/PublicUserKeyRequest/PublicKeyRequestService';
import { db } from '../../../config/firebase';
import { doc, getDoc, setDoc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore';

jest.mock('../../../config/firebase', () => ({
    db: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
}));

describe('uploadKey', () => {
    test('should set a document with keyNumber and expiration_date', async () => {
        const keyNumber = 'testKey';
        const expiration_date = '2024-12-31';
        await uploadKey(keyNumber, expiration_date);
        expect(setDoc).toHaveBeenCalledWith(doc(db(), 'usedKeys', keyNumber), {
            key: keyNumber,
            expiration_date: expiration_date,
        });
    });
});

describe('keyExists', () => {
    test('should return true if the key exists', async () => {
        const mockDocSnap = {
            exists: jest.fn().mockReturnValue(true),
        }
        getDoc.mockResolvedValue(mockDocSnap);

        const keyNumber = 'testKey';
        const result = await keyExists(keyNumber);
        expect(result).toBe(true);
    });

    test('should return false if the key does not exist', async () => {
        const mockDocSnap = {
            exists: jest.fn().mockReturnValue(false),
        }
        getDoc.mockResolvedValue(mockDocSnap);

        const keyNumber = 'testKey';
        const result = await keyExists(keyNumber);
        expect(result).toBe(false);
    });
});

describe('getUserIdbyEmail', () => {
    test('should return the user ID corresponding to the provided email', async () => {
        const email = 'test@example.com';
        const userId = 'testUserId';
        const mockQuerySnapshot = {
            docs: [{ id: userId }],
        };
        getDocs.mockResolvedValue(mockQuerySnapshot);

        const result = await getUserIdbyEmail(email);
        expect(result).toBe(userId);
        expect(query).toHaveBeenCalledWith(collection(db(), 'users'), where('email', '==', email));
    });
});

describe('updateCondo', () => {
    test('should update condo document with userId based on userType', async () => {
        const userId = 'testUserId';
        const condoUnit = 'testUnit';
        const userType = 'Renter';
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: 'documentId' });
            }),
        };
        getDocs.mockResolvedValue(mockQuerySnapshot);

        await updateCondo(userId, condoUnit, userType);

        expect(query).toHaveBeenCalledWith(collection(db(), 'condoUnits'), where('unit', '==', condoUnit));
        expect(updateDoc).toHaveBeenCalledWith(doc(db(), 'condoUnits', 'documentId'), { renterId: userId });
    });
    
    test('should update condo document with ownerId when userType is Owner', async () => {
        const userId = 'testUserId';
        const condoUnit = 'testUnit';
        const userType = 'Owner';
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: 'documentId' });
            }),
        };
        getDocs.mockResolvedValue(mockQuerySnapshot);

        await updateCondo(userId, condoUnit, userType);

        expect(query).toHaveBeenCalledWith(collection(db(), 'condoUnits'), where('unit', '==', condoUnit));
        expect(updateDoc).toHaveBeenCalledWith(doc(db(), 'condoUnits', 'documentId'), { ownerId: userId });
    });
});