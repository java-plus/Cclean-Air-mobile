import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerIndicateursPage } from './creer-indicateurs.page';

describe('CreerIndicateursPage', () => {
  let component: CreerIndicateursPage;
  let fixture: ComponentFixture<CreerIndicateursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerIndicateursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerIndicateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
