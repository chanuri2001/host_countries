import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../src/pages/Register';
import userEvent from '@testing-library/user-event';

describe('Register Page', () => {
  test('renders registration form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test('shows password mismatch error', async () => {
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'different');
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('allows successful registration', async () => {
    userEvent.type(screen.getByLabelText(/name/i), 'Test User');
    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    await waitFor(() => {
      expect(store.getState().auth.isLoading).toBe(true);
    });
  });
});