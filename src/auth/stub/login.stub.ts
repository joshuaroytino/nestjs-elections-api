import { LoginDto } from '../dto/login.dto';

export const loginStub = (): LoginDto => {
  return {
    email: 'fake@email.com',
    password: 'password',
  };
};
