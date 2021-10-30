import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { FlowService } from './flow.service';
import { InitializationState, User } from './models';

const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('Flow Service', () => {

    let service: FlowService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ FlowService ]
        })
    
    service = TestBed.inject(FlowService);
 
    });

    it('#initialization state is retrieved when user logs in', () => {
        testScheduler.run((helpers) => {
            const { cold, expectObservable } = helpers;
          
            const initState: InitializationState = { FUSD: false, KittyItems: false, KittyItemsMarket: false, address: '0x12345'}
            //@ts-ignore
            service.getInitializationState = () => cold('-a', { a: initState});;
            
            const user: User = { addr: '0x12345' };
            service.user.next(user);
            
            expectObservable(service.initializationState).toBe('-a', {a: initState});
        })
    });
})

