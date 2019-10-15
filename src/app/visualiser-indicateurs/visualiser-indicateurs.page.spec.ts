import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserIndicateursPage } from './visualiser-indicateurs.page';

describe('VisualiserIndicateursPage', () => {
  let component: VisualiserIndicateursPage;
  let fixture: ComponentFixture<VisualiserIndicateursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualiserIndicateursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserIndicateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
