import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { loginResponseStub } from './stub/login-response.stub';
import { loginStub } from './stub/login.stub';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const loginResponse: LoginResponseDto = loginResponseStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(loginResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('login controller with correct parameters', async () => {
    const loginSpy = jest.spyOn(service, 'login');
    const login: LoginDto = loginStub();

    const result = await controller.login(login);

    expect(result).toEqual(loginResponse);
    expect(loginSpy).toHaveBeenCalledWith(login);
  });
});
