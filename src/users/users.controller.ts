import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exception.filter';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
@UseFilters(MongoExceptionFilter)
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly auth: AuthService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const created = await this.users.create(dto.email, dto.password);
    return {
      status: 'success',
      message: 'User registered successfully',
      user: created, // password automatically omitted by toJSON()
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.users.verifyCredentials(dto.email, dto.password);
    const token = this.auth.issueToken({
      sub: (user as any)._id,
      email: user.email,
    });
    return {
      status: 'success',
      message: 'Login successful',
      token,
      user,
    };
  }
}
