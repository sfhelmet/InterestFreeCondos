import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AuthChecker from "../../../components/auth/AuthChecker";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

jest.mock('../../../config/firebase', () => ({
    auth: {
        currentUser: {
            uid: "test"
        }
    }
}));

describe('Authenticated User AuthChecker Tests', () => {
    test("AuthChecker renders children", async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
    
        const { getByText } = render(
            <BrowserRouter>
                <AuthChecker>
                    <p>Test Children</p>
                </AuthChecker>
            </BrowserRouter>
        );
    
        const children = getByText("Test Children");

        expect(auth.currentUser).toBeTruthy();
        expect(children).toBeInTheDocument();
    });
});