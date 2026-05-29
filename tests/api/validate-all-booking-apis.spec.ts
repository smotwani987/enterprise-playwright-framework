import { test, expect } from './fixtures/generateToken';
import { BookingClient } from './clients/BookingClient';
import { ResponseUtils } from './utils/ResponseUtils';
import { createBookingPayload } from './data/factories/BookingFactories';

test('@api TC00_Validate All API operations',async({apiContext})=>{
    //Create New Booking
    const clientObj= new BookingClient(apiContext);
    const bookingResponse=await clientObj.createBooking(createBookingPayload({lastname:'Pathak'}));
    const bookingJsonResponse=await bookingResponse.json();
    const bookingID=bookingJsonResponse.bookingid;
    console.log('Booking ID: '+bookingID);

    //Get Created Value
    const createdBookingInfo=await clientObj.getBooking(bookingID);
    console.log((await createdBookingInfo.json()));

    //Update Name and Amount
    //Used createBookingPayload data factory object to update one value and reuse it as complete payload in line 22
    const updatedValues=createBookingPayload({totalprice:5000});
    const updateBookingResponse = await clientObj.updateBooking(bookingID,updatedValues);
    ResponseUtils.validateStatus(updateBookingResponse.status(),200);

    //Get the New Value
    const updatedBookingResponse = await clientObj.getBooking(bookingID);
    const updatedBookingBody = await updatedBookingResponse.json();
    console.log('Updated Booking:', updatedBookingBody);
    expect(updatedBookingBody.totalprice).toBe(updatedValues.totalprice);

    //Delete the bookingId
    const deleteBooking=await clientObj.deleteBooking(bookingID);
    ResponseUtils.validateStatus(deleteBooking.status(),201);
    console.log('Deleted Booking');
});