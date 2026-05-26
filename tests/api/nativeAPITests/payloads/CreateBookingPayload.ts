export const createBookingPayload = {
    firstname: 'Poonam',
    lastname: 'Pathak',
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-01-05'
    },
    additionalneeds: 'Breakfast'
};
// Need DB Setup here to show DB Integration to make payload dynamic