import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Register from "../components/auth/Register/Register";
import { BrowserRouter } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

test('Rendering Register Works', () => {
    const { getByLabelText, getByText } = render(<BrowserRouter><Register /></BrowserRouter>);
    const userNameInput = getByLabelText('Enter username:');
    const userEmailInput = getByLabelText('Enter email:');
    const userPasswordInput = getByLabelText('Enter new password:');
    const userPhoneInput = getByLabelText('Enter phone:');
    const registerButton = getByText('Register');
  
    expect(userNameInput).toBeInTheDocument();
    expect(userEmailInput).toBeInTheDocument();
    expect(userPasswordInput).toBeInTheDocument();
    expect(userPhoneInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
});

test("Register Works", async () => {
    const user = userEvent.setup();
    render(<BrowserRouter><Register /></BrowserRouter>);

    const randomNumber = Math.floor(Math.random() * 101);
    user.type(document.querySelector(".user-name"), `RegisterTester${randomNumber}`);
    user.type(document.querySelector(".user-email"), `RegisterTester${randomNumber}@nexusTest.ca`);
    user.type(document.querySelector(".user-password"), "Test123");
    user.type(document.querySelector(".user-phone"), "123-456-7890");
    
    user.click(document.querySelector(".register-btn"));

    expect(location.pathname).toBe("/");
});

test('Updates state on input change', () => {
    const { getByLabelText } = render(<BrowserRouter><Register /></BrowserRouter>);
    const userNameInput = getByLabelText('Enter username:');
    const userEmailInput = getByLabelText('Enter email:');
    const userPasswordInput = getByLabelText('Enter new password:');
    const userPhoneInput = getByLabelText('Enter phone:');

    fireEvent.change(userNameInput, { target: { value: 'testUser' } });
    fireEvent.change(userEmailInput, { target: { value: 'testUser@test.com' } });
    fireEvent.change(userPasswordInput, { target: { value: 'testUser' } });
    fireEvent.change(userPhoneInput, { target: { value: '1234567890' } });
  
    expect(userNameInput).toHaveValue('testUser');
    expect(userEmailInput).toHaveValue('testUser@test.com');
    expect(userPasswordInput).toHaveValue('testUser');
    expect(userPhoneInput).toHaveValue('1234567890');
});

test("Register fails on bad email input", async () => {
    const user = userEvent.setup();
    //Mock implementation applies function to console to avoid showing the outputted error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const createUserWithEmailAndPasswordMock = jest.fn().mockRejectedValue(new Error('Registration error'));

    render(
        <BrowserRouter>
            <Register createUserWithEmailAndPassword={createUserWithEmailAndPasswordMock} />
        </BrowserRouter>
    );

    user.click(document.querySelector(".register-btn"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error occurred during account creation');
    });

    consoleErrorSpy.mockRestore();
});