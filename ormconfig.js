require('dotenv').config();
const {env} = process;

const dbConfig = {
'name': 'default',
'type': 'postgres',
'host': `${env.HOST}`,
'port': `${env.PORT}`,
'username': `${env.USER}`,
'password': `${env.PASSWORD}`,
'database': `${env.DATABASE}`,
'entities': [
'src/**/*.entity{.ts,.js}',
],
'synchronize': true,
};
console.log("cnfig", dbConfig);
module.exports = dbConfig;