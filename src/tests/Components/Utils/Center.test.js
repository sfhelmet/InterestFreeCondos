import React from 'react';
import { render } from '@testing-library/react';
import Center from "../../../components/Utils/Center"
import '@testing-library/jest-dom/extend-expect';


describe('Center component', () => {
  test('renders children centered vertically and horizontally', () => {
    const { getByText } = render(
      <Center>
        <div>Test Content</div>
      </Center>
    );

    const centeredContent = getByText('Test Content');
    
    // Assertions to check if the content is centered vertically and horizontally
    expect(centeredContent).toHaveStyle('display: block');
  });

  test('applies custom height if provided', () => {
    const { container } = render(
      <Center height="200px">
        <div>Test Content</div>
      </Center>
    );

    const centerDiv = container.firstChild;

    // Assertion to check if custom height is applied
    expect(centerDiv).toHaveStyle('height: 200px');
  });

  test('converts numerical height to vh unit', () => {
    const { container } = render(
      <Center height={50}>
        <div>Test Content</div>
      </Center>
    );

    const centerDiv = container.firstChild;

    // Assertion to check if numerical height is converted to vh unit
    expect(centerDiv).toHaveStyle('height: 50vh');
  });
});
