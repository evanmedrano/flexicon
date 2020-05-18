import FlashService from '../services/FlashService';

export function redirectToLoginScreen() {
  FlashService.set('message', 'You need to sign in first.');
  return null;
}
