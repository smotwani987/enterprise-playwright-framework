import {test,expect,request} from '@playwright/test';

test('Generate Auth Token',async()=>{

const apiContext = await request.newContext();
const response = await apiContext.post('https://restful-booker.herokuapp.com/auth', {
    data: {
        username: 'admin',
        password: 'password123'
    }
});
expect(response.status()).toBe(200);
const responseBody = await response.json();
console.log(responseBody);
expect(responseBody.token).toBeTruthy();
});