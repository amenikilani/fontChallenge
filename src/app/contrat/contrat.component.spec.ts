/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContratComponent } from './contrat.component';

describe('ContratComponent', () => {
  let component: ContratComponent;
  let fixture: ComponentFixture<ContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
