import { ENV } from 'config/env';
import { test, expect } from '../../../../fixtures/hybridFixture';

test.describe('@smoke Hybrid Fixture Validations', () => {
    test('TC11_Navigate_to_Admin page', async ({ apiContext }) => {
       await apiContext.get(
        '',
        {
            data:"",
            headers:{"":""}
        }
       )
    });
});