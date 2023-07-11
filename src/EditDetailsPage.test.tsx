import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditDetailsPage from './EditDetailsPage';

describe('EditDetailsPage', () => {
  test('renders EditDetailsPage component', () => {
    // Mock onSave function
    const onSaveMock = jest.fn();

    // Render EditDetailsPage
    render(<EditDetailsPage onSave={onSaveMock} />);

    // Assert that the component renders correctly
    expect(screen.getByText('Edit Details')).toBeInTheDocument();

    // Simulate user input and click the Save button
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const ageInput = screen.getByLabelText('Age:');
    fireEvent.change(ageInput, { target: { value: '30' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Assert that onSave function was called with the correct details
    expect(onSaveMock).toHaveBeenCalledWith({
      credentials: {
        details: {
          Name: 'John Doe',
          Age: '30',
        },
      },
    });
  });
});
