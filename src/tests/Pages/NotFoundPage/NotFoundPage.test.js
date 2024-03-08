import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '../../../Pages/NotFoundPage/NotFoundPage';
import nexus_logo from '../../../Images/nexus_logo.png';
import '@testing-library/jest-dom/extend-expect';

describe('NotFoundPage Component', () => {
  test('renders not found page with correct elements', () => {
    const { getByAltText, getByText } = render(<NotFoundPage />);
    const logoImage = getByAltText('A 404 Page');
    const errorMessage = getByText("404! Looks like we're currently building that page right now!");

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', nexus_logo);
    expect(errorMessage).toBeInTheDocument();
  });
});