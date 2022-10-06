import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'topsecretshitnobodynevereverhavetoknowabout',
  expires: process.env.JWT_EXPIRES || '2h',
  refreshTokenExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
}));
