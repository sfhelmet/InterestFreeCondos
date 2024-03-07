import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import AuthChecker from "../components/auth/AuthChecker";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

jest.mock('../config/firebase', () => ({
    auth: {
        currentUser: undefined
    }
}));

describe('Non Authenticated AuthChecker tests', () => {
    test("AuthChecker redirects to Login if no user authenticated", async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        
        render(
            <BrowserRouter>
              <AuthChecker/>
            </BrowserRouter>
        );
        
        expect(auth.currentUser).toBeFalsy();
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        })
    });
});