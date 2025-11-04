import { Body, Controller, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/users/dtos/login.dto';
import { AuthService } from './auth.service';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exception.filter';

@Controller('auth')
@UseFilters(MongoExceptionFilter)
export class AuthController {
    constructor(
        private readonly users: UsersService,
        private readonly auth: AuthService,
    ) { }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.users.verifyCredentials(dto.email, dto.password);
        const { accessToken, refreshToken } = this.auth.issueTokens({
            sub: (user as any)._id,
            email: user.email,
        });
        await this.users.setRefreshToken((user as any)._id.toString(), refreshToken);
        return {
            status: 'success',
            message: 'Login successful',
            accessToken,
            refreshToken,
            user,
        };
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        if (!refreshToken) throw new UnauthorizedException('Missing refresh token');
        const user = await this.users.findByRefreshToken(refreshToken);
        const { accessToken, refreshToken: newRefreshToken } = this.auth.issueTokens({
            sub: (user as any)._id,
            email: user.email,
        });
        await this.users.setRefreshToken((user as any)._id.toString(), newRefreshToken);
        return {
            status: 'success',
            message: 'Token refreshed',
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}


