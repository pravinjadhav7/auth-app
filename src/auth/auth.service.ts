import { Injectable, UnauthorizedException, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user: UserDocument = await this.usersService.findOne(email);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user.toObject();
        return result;
      }
      this.logger.warn(`Invalid login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error validating user credentials');
    }
  }

  async login(user: any) {
    try {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Error during login: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error during login');
    }
  }

  async register(userDto: CreateUserDto) {
    try {
      // No need for isPasswordStrong check because the DTO will validate it
      const user = await this.usersService.create(userDto);
      return this.login(user);
    } catch (error) {
      this.logger.error(`Error during registration: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error during registration');
    }
  }
}
