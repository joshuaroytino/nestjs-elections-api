import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<LoginResponseDto> {
    const auth = await this.authModel
      .findOne({ email: login.email })
      .select('+password');

    if (!auth) {
      throw new Error('Invalid credentials');
    }

    if (auth.password !== login.password) {
      throw new Error('Invalid credentials');
    }

    return {
      accessToken: await this.generateJWTAccessToken(auth),
    };
  }

  async generateJWTAccessToken(auth: Auth): Promise<string> {
    const payload: JwtPayloadDto = { email: auth.email, sub: auth._id };
    return await this.jwtService.signAsync(payload);
  }

  async comparePassword(
    simplePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(simplePassword, hashedPassword);
  }
}
