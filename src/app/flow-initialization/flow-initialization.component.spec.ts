import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowInitializationComponent } from './flow-initialization.component';

describe('FlowInitializationComponent', () => {
  let component: FlowInitializationComponent;
  let fixture: ComponentFixture<FlowInitializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowInitializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowInitializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
