import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Logout from '../../../../components/auth/Logout/Logout';
import '@testing-library/jest-dom/extend-expect';
import { signOut } from 'firebase/auth';

// Mock the auth from Firebase config
jest.mock('../../../../config/firebase', () => ({
    getAuth: jest.fn(),
}));

// Mock the signOut function from Firebase auth
jest.mock('firebase/auth', () => ({
    signOut: jest.fn(() => Promise.resolve()),
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Logout component', () => {
  test('renders logout button', () => {
    const { getByText } = render(<Logout />);
    const logoutButton = getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  test('disables button when clicked', () => {
    const { getByText } = render(<Logout />);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeDisabled();
  });

  test('calls signOut when button is clicked', async () => {
    const { getByText } = render(<Logout />);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });

  test('navigates to specified route after successful sign out', async () => {
    const { getByText } = render(<Logout />);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('error occur while logout', async () => {
    const { getByText } = render(<Logout />);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles error on signOut', async () => {
    // Mock the signOut function from Firebase auth to throw an error
    jest.mock('firebase/auth', () => ({
        signOut: jest.fn(() => { throw new Error('Sign-out failed'); }),
      }));
  
      // Mock the useNavigate hook
      const mockNavigate = jest.fn();
      jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => mockNavigate,
      }));

    const { getByText } = render(<Logout />);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      
    });
  });
});
