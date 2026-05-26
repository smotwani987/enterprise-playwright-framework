import { APIRequestContext } from "@playwright/test";
import { headers } from "../data/headers";
import { APIContants } from "../constants/APIconstants";
import { BookingPayload } from "../interfaces/BookingPayload";

export class BookingClient{

   private apiContext: APIRequestContext;
    
   constructor(apiContext: APIRequestContext) {
      this.apiContext = apiContext;
   };

   async createBooking(payload: BookingPayload) {
      return this.apiContext.post(APIContants.BASE_URL+APIContants.ENDPOINTS.BOOKING,
         {
            data: payload,
            headers: headers
         }
      );
   }
   async updateBooking(bookingId: number, payload: BookingPayload) {
      return await this.apiContext.put(
         `${APIContants.BASE_URL}${APIContants.ENDPOINTS.BOOKING}/${bookingId}`,
         {
            data: payload
         }
      );
   }

   async deleteBooking(bookingId: number) {
      return await this.apiContext.delete(`${APIContants.BASE_URL}${APIContants.ENDPOINTS.BOOKING}/${bookingId}`)
   };
   
   async getBooking(bookingId: number) {
      return await this.apiContext.get(
         `${APIContants.BASE_URL}${APIContants.ENDPOINTS.BOOKING}/${bookingId}`
      );
   }
}