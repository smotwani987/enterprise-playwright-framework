import { BookingPayload } from '../../interfaces/BookingPayload';

export function createBookingPayload(overrides?: Partial<BookingPayload>): BookingPayload {
    return {
        firstname: `Sahil_${Date.now()}`,
        lastname: 'Motwani',
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-01-01',
            checkout: '2025-01-05'
        },
        additionalneeds: 'Breakfast',
        ...overrides
    };
}