import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommunePage } from './details-commune.page';

describe('DetailsCommunePage', () => {
  let component: DetailsCommunePage;
  let fixture: ComponentFixture<DetailsCommunePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCommunePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCommunePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
