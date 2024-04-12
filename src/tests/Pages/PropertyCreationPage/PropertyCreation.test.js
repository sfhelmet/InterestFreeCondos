
jest.requireActual("../../../config/firebase.js");

jest.mock("firebase/firestore", {
    collection: jest.fn(),
    addDoc: jest.fn() 
});

jest.mock("firebase/storage", {
    uploadBytes: jest.fn(),
    ref: jest.fn()
});