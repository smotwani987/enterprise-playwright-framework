import dotenv from 'dotenv';

const environment = process.env.ENV || 'qa'

dotenv.config({
    path: `.env${environment}`
})
console.log('Loaded BASE_URL:', process.env.BASE_URL);
export const ENV = {
    BASE_URL: process.env.BASE_URL || '',
    USERNAME: process.env.USERNAME || '',
    PASSWORD: process.env.PASSWORD || '',
    API_BASE_URL: process.env.API_BASE_URL || ''
};