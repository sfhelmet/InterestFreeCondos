import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublicKeyRequest from '../../../components/PublicUserKeyRequest/PublicKeyRequest';
import '@testing-library/jest-dom/extend-expect';
import jsrsasign from 'jsrsasign';

// Mock jsrsasign module
jest.mock('jsrsasign', () => ({
  crypto: {
    Util: {
      sha256: jest.fn(() => 'hashedSecretKey'),
    },
  },
  jws: {
    JWS: {
      parse: jest.fn(),
      verifyJWT: jest.fn(() => true),
    },
  },
}));

describe('PublicKeyRequest Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component', () => {
    const { getByText, getByPlaceholderText } = render(<PublicKeyRequest />);
    expect(getByText('Please enter registration key number')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter key number')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    const { getByPlaceholderText } = render(<PublicKeyRequest />);
    const inputField = getByPlaceholderText('Enter key number');
    fireEvent.change(inputField, { target: { value: '123456' } });
    expect(inputField.value).toBe('123456');
  });

  test('handles form submission and validates JWT', () => {
    const { getByPlaceholderText, getByText } = render(<PublicKeyRequest />);
    const inputField = getByPlaceholderText('Enter key number');
    const submitButton = getByText('Submit');

    fireEvent.change(inputField, { target: { value: 'exampleJWT' } });
    fireEvent.click(submitButton);

    expect(jest.spyOn(jsrsasign.crypto.Util, 'sha256')).toHaveBeenCalledTimes(2);
    expect(jsrsasign.crypto.Util.sha256).toHaveBeenCalledWith(process.env.REACT_APP_Secret_Key);
    expect(jsrsasign.jws.JWS.parse).toHaveBeenCalledWith('exampleJWT');
    expect(jsrsasign.jws.JWS.verifyJWT).toHaveBeenCalledWith('exampleJWT', 'hashedSecretKey', { alg: ['HS256'] });  
  });
});
