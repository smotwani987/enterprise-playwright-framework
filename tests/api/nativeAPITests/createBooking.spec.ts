import {test,request, expect} from '@playwright/test';

test('@api Create Booking',async()=>{
    const apiContext=await request.newContext();
    const response=await apiContext.post(
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
    expect(await response.status()).toBe(200);
    const responseBody=await response.json();
    console.log(responseBody); 
});