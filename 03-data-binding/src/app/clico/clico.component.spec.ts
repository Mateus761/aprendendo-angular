import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicoComponent } from './clico.component';

describe('ClicoComponent', () => {
  let component: ClicoComponent;
  let fixture: ComponentFixture<ClicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
