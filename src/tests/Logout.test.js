import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import Logout from "../components/auth/Logout/Logout.js";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));
  
  // Mock the signOut method
jest.mock('firebase/auth', () => ({
    signOut: jest.fn(() => Promise.resolve()),
    getAuth: jest.fn(),
    auth: jest.fn(),
    GoogleAuthProvider: jest.fn()
}));

test("Logout works", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    
    const { getByText } = render(
        <BrowserRouter>
            <Logout/>
        </BrowserRouter>
    );

    fireEvent.click(getByText("Logout"));

    expect(signOut).toHaveBeenCalled();

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});

test("Logout fails for unexpected reason", async () => {
    //Mock implementation applies function to console to avoid showing the outputted error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    signOut.mockRejectedValue(new Error('Registration error'));

    const { getByText } = render(
        <BrowserRouter>
            <Logout/>
        </BrowserRouter>
    );
    
    fireEvent.click(getByText("Logout"));

    expect(signOut).toHaveBeenCalled();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
});

test('Rendering Logout button works', async () => {
    const { getByText } = render(<BrowserRouter><Logout /></BrowserRouter>);
    const logoutBtn = getByText("Logout");
  
    expect(logoutBtn).toBeInTheDocument();
});