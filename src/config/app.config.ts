export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'topsecretshitnobodynevereverhavetoknowabout',
    expires: process.env.JWT_EXPIRES || '2h',
    refreshTokenExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
  },
});
