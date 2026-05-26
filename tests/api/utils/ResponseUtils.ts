import {expect} from '../fixtures/generateToken';

export class ResponseUtils{
    static validateStatus(actualStatus:number,expectedStatus:number){
        expect (actualStatus).toBe(expectedStatus);
    }
}