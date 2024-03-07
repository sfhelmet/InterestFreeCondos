import { getDownloadURL, uploadBytes } from "firebase/storage";
import Profile from "../Pages/ProfilePage/Profile";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";

jest.mock('firebase/storage', () => ({
    ...jest.requireActual('firebase/storage'),
    uploadBytes: jest.fn(() => Promise.resolve()),
    getDownloadURL: jest.fn(() => Promise.resolve())
}));

describe('Profile Page Tests', () => {
    test('Upload Profile Picture works', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );

        const uploadBtn = document.querySelector('.upload-btn input');

        fireEvent.change(uploadBtn);

        expect(uploadBytes).toHaveBeenCalled();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('File uploaded!');
        });
    });

    test('Upload Profile Picture fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        uploadBytes.mockRejectedValue(new Error('Error occurred while uploading profile picture'))
        
        render(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );

        const uploadBtn = document.querySelector('.upload-btn input');

        fireEvent.change(uploadBtn);

        expect(uploadBytes).toHaveBeenCalled();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error occurred while uploading profile picture');
        });
    });

    test('Fetch Profile Picture URL works', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <AuthenticatedUserContext.Provider value={{ uid: 'test'}}>
                    <Profile/>
                </AuthenticatedUserContext.Provider>
            </BrowserRouter>
        );

        expect(getDownloadURL).toHaveBeenCalled();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('URL fetched');
        });
    });

    test('Fetch Profile Picture URL fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        getDownloadURL.mockRejectedValue(new Error());

        render(
            <BrowserRouter>
                <AuthenticatedUserContext.Provider value={{ uid: 'test'}}>
                    <Profile/>
                </AuthenticatedUserContext.Provider>
            </BrowserRouter>
        );

        expect(getDownloadURL).toHaveBeenCalled();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });
    });
});