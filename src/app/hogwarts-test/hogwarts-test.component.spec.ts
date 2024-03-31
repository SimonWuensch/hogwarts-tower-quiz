import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogwartsTestComponent } from './hogwarts-test.component';

describe('HogwartsTestComponent', () => {
  let component: HogwartsTestComponent;
  let fixture: ComponentFixture<HogwartsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HogwartsTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HogwartsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
