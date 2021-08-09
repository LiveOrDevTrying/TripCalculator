import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserswidgetComponent } from './userswidget.component';

describe('UserswidgetComponent', () => {
  let component: UserswidgetComponent;
  let fixture: ComponentFixture<UserswidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserswidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
