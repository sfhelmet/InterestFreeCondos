import React from 'react';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import AuthChecker from '../../../components/auth/AuthChecker';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock auth.currentUser
jest.mock('../../../config/firebase', () => ({
  auth: {
    currentUser: null,
  },
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('AuthChecker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('navigates to login page when no user is authenticated', () => {
    render(
      <AuthChecker>
        <div>Child Component</div>
      </AuthChecker>
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockNavigate.mock.calls[0][0]).toBe('/login');
  });
});
