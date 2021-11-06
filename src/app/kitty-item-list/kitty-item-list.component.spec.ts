import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KittyItemListComponent } from './kitty-item-list.component';

describe('KittyItemListComponent', () => {
  let component: KittyItemListComponent;
  let fixture: ComponentFixture<KittyItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KittyItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KittyItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
