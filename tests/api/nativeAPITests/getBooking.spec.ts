import { test, expect, request } from '@playwright/test';

test('@api Get Booking Details', async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get('https://restful-booker.herokuapp.com/booking/1');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('firstname');
});