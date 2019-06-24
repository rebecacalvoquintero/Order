require('dotenv').config();
const {env} = process;

const dbConfig = {
'name': 'default',
'type': 'postgres',
'url': `${env.DATABASE_URL}`,
'entities': [
'dist/**/*.entity{.ts,.js}',
],
'synchronize': true,
};
console.log("cnfig", dbConfig);
module.exports = dbConfig;