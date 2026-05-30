import { test, expect, request } from '@playwright/test';

test('@api Update Booking Details', async () => {
    const apiContext = await request.newContext();

    const authResponse = await apiContext.post('https://restful-booker.herokuapp.com/auth', {
    data: {
        username: 'admin',
        password: 'password123'
    }
});

expect(authResponse.status()).toBe(200);
const authResponsebody = await authResponse.json();
const authToken=await authResponsebody.token;

const createResponse=await apiContext.post(
        'https://restful-booker.herokuapp.com/booking',
        {
            data:{
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast",
            },
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    );
    expect(await createResponse.status()).toBe(200);
    const createResponseBody=await createResponse.json();
    const createdID=await createResponseBody.bookingid;

    const deleteResponse = await apiContext.delete(`https://restful-booker.herokuapp.com/booking/`+createdID,
        {
            headers: {
               Cookie:`token=${authtoken}`
            }
        });
    expect(await deleteResponse.status()).toBe(201);
    console.log(deleteResponse);
});
