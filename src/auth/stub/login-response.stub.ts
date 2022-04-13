import { LoginResponseDto } from '../dto/login-response.dto';

export const loginResponseStub = (): LoginResponseDto => {
  return {
    accessToken: 'fake-jwt-token',
  };
};
