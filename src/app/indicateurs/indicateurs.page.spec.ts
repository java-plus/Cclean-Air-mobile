import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateursPage } from './indicateurs.page';

describe('IndicateursPage', () => {
  let component: IndicateursPage;
  let fixture: ComponentFixture<IndicateursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicateursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
