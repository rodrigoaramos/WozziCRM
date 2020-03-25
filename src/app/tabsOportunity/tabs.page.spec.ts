import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOportunityComponent } from './tabsOportunity.component';

describe('TabsPage', () => {
  let component: TabsOportunityComponent;
  let fixture: ComponentFixture<TabsOportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsOportunityComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
