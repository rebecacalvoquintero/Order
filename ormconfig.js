require('dotenv').config();
const { env } = process;

const dbConfig = {
  'name': 'default',
  'type': 'postgres',
  'url': `${env.DATABASE_URL}`,
  'entities': [
    `${env.PRODUCTION}/**/*.entity{.ts,.js}`,
  ],
  'synchronize': true,
};

module.exports = dbConfig;
