import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { FlowService } from './flow.service';

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



    it('#initialization state is raised properly', () => {
        testScheduler.run((helpers) => {
            const { cold, expectObservable } = helpers;
            const initializationState = cold('b');
            const expected = 'b';
        

            //@ts-ignore
            service.getInitializationState = () => initializationState;
            
            service.user.next({ addr: '0x12345', initializationState: { FUSD: false, KittyItems: false, KittyItemsMarket: false, address: '0x12345'}})
            expectObservable(service.initializationState).toBe(expected);
        })
    });
})

