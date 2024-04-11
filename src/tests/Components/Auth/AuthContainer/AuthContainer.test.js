import { fireEvent, waitFor, render } from "@testing-library/react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AuthContainer from "../../../../components/auth/AuthContainer/AuthContainer";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    signInWithPopup: jest.fn(() => Promise.resolve())
}));

describe('AuthContainer (Login Logic) tests', () => {
    test('Non SSO Sign In works', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const { getByText } = render(
        <BrowserRouter>
            <AuthContainer/>
        </BrowserRouter>
        );

        const nonSSOSignInBtn = getByText("Sign In");

        fireEvent.click(nonSSOSignInBtn);

        expect(signInWithEmailAndPassword).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test('Non SSO Sign in fails', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        signInWithEmailAndPassword.mockRejectedValue(new Error('Error signing in'));

        const { getByText } = render(
            <BrowserRouter>
                <AuthContainer/>
            </BrowserRouter>
        );

        const nonSSOSignInBtn = getByText("Sign In");

        fireEvent.click(nonSSOSignInBtn);

        expect(signInWithEmailAndPassword).toHaveBeenCalled();

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error signing in');
        });
    });

    test('Google SSO Sign n works', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const { getByText } = render(
        <BrowserRouter>
            <AuthContainer/>
        </BrowserRouter>
        );

        const SSOSignInBtn = getByText("Sign In With Google");

        fireEvent.click(SSOSignInBtn);

        expect(signInWithPopup).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test('Google SSO Sign in fails', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        signInWithPopup.mockRejectedValue(new Error('Error signing in with Google'));

        const { getByText } = render(
            <BrowserRouter>
                <AuthContainer/>
            </BrowserRouter>
        );

        const SSOSignInBtn = getByText("Sign In With Google");

        fireEvent.click(SSOSignInBtn);

        expect(signInWithPopup).toHaveBeenCalled();

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error signing in with Google');
        });
    });
});