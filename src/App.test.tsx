import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import App from './App';
import { act } from 'react-test-renderer';

jest.mock('react-native-geolocation-service', () => {});
jest.mock('react-native-permissions', () => {});
jest.mock('./wallet/setUpWallet', () => ({
  setUpWallet: jest.fn(),
}));

describe('Testing react navigation', () => {
  test('app goes from welcome to username/profile picture screen', async () => {
    const component = <App />;

    render(component);

    const header = await screen.findByText('Welcome to\nQuaiPay.');
    expect(header).toBeOnTheScreen();
    act(() => {
      const setupButton = screen.getByText('Setup');
      fireEvent.press(setupButton);
    });

    await new Promise(r => setTimeout(r, 5000));

    const chooseUserName = screen.getByText(
      'Choose a\nusername and\nprofile picture',
    );
    expect(chooseUserName).toBeOnTheScreen();
  }, 10000);
});
