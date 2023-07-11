import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

// Additional imports for mocking fetch
import { act } from 'react-dom/test-utils';

// Mock the fetch function
global.fetch = jest.fn().mockResolvedValue({
  json: () =>
    Promise.resolve([
      { credentials: 'Credential 1', details: 'Details 1' },
      { credentials: 'Credential 2', details: 'Details 2' },
    ]),
});

describe('App Component', () => {
  it('should render the component', () => {
    render(<App />);
    expect(screen.getByText('Click the Picture')).toBeInTheDocument();
  });

  it('should fetch and display applicant information when image is clicked', async () => {
    render(<App />);
    const image = screen.getByAltText('Click Me');
    
    // Simulate clicking the image
    fireEvent.click(image);

    // Wait for the fetch to complete and update the component
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Credential 1: Details 1')).toBeInTheDocument();
    expect(screen.getByText('Credential 2: Details 2')).toBeInTheDocument();
  });

  it('should navigate to EditDetailsPage when Edit My Details button is clicked', () => {
    render(<App />);
    const editButton = screen.getByText('Edit My Details');

    fireEvent.click(editButton);

    expect(screen.getByText('Edit Details')).toBeInTheDocument();
  });
});