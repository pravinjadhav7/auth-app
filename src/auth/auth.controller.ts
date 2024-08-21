import { Controller, Post, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
      return this.authService.login(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'An error occurred during login');
    }
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message || 'An error occurred during registration');
    }
  }
}
