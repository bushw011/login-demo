import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../screens/Login';
import axios from "axios";
import React from 'react';
import { act } from 'react-dom/test-utils';


const mockResult = {"token": "QpwL5tke4Pnpja7X4"}
jest.mock('axios');
const resp = { data: mockResult }
axios.post.mockResolvedValue(resp);
test('renders', () => {
    render(<Login />)
});



test('fails with incorrect input', () => {
    render(<Login />)
    const emailInput = screen.getByPlaceholderText('Email');
    const logInButton = screen.getByText('Sign In')
    fireEvent.change(emailInput, {target: {value: 'email123@e'}})
    fireEvent.click(logInButton)
    expect(screen.getByText('Must Be Valid Email Format')).toBeInTheDocument()
})

test('succeeds with correct input', async () => {
    render(<Login />)
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const logInButton = screen.getByText('Sign In')
    fireEvent.change(emailInput, {target: {value: 'eve.holt@reqres.in'}})
    fireEvent.change(passwordInput, {target: {value: 'password123'}})
    await act(async () => {
        fireEvent.click(logInButton)
    })
    
    expect(screen.getByText('Successfully Logged In!')).toBeInTheDocument()
})