import FileIcon from '../../../components/Utils/FileIcons';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders file icon based on file extension', () => {
    const { container } = render(<FileIcon filename="example.pdf" />);
    const fileIcon = container.querySelector('#file-icon');
    expect(fileIcon).toHaveClass('fas fa-file-pdf');
});

test('renders default file icon for unknown extensions', () => {
    const { container } = render(<FileIcon filename="example.xyz" />);
    const fileIcon = container.querySelector('#file-icon');
    expect(fileIcon).toHaveClass('fas fa-file');
});