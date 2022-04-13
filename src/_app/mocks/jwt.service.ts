export const mockedjwtService = {
  signAsync: jest.fn(() => 'fake-jwt-token'),
  get(key: string) {
    switch (key) {
      case 'JWT_ACCESS_TOKEN_SECRET':
        return 'fake-jwt-token-secret';
      case 'JWT_EXPIRATION_TIME':
        return '1 hour';
    }
  },
};
