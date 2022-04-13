import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedjwtService } from '../_app/mocks/jwt.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './schema/auth.schema';
import { loginResponseStub } from './stub/login-response.stub';
import { loginStub } from './stub/login.stub';

describe('AuthService', () => {
  let service: AuthService;
  const login: LoginDto = loginStub();
  const loginResponse: LoginResponseDto = loginResponseStub();

  class AuthModel {
    constructor(private data) {}
    static findOne = jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(login),
    }));
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Auth.name),
          useValue: AuthModel,
        },
        {
          provide: JwtService,
          useValue: mockedjwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('Login service with correct parameters', async () => {
    const loginSpy = jest.spyOn(service, 'login');
    const login: LoginDto = loginStub();

    const result = await service.login(login);

    expect(result).toEqual(loginResponse);
    expect(loginSpy).toHaveBeenCalledWith(login);
  });
});
