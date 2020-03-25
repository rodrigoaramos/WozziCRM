import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabBasicComponent } from './tabBasic.component';

describe('Tab1Page', () => {
  let component: TabBasicComponent;
  let fixture: ComponentFixture<TabBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabBasicComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
