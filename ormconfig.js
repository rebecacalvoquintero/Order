require('dotenv').config();
const { env } = process;

const dbConfig = {
  'name': 'default',
  'type': 'postgres',
  'url': `${env.DATABASE_URL}`,
  'entities': [
    env.PRODUCTION === 'true' ? 'dist' : 'src' + `/**/*.entity{.ts,.js}`,
  ],
  'synchronize': true,
};

module.exports = dbConfig;