import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EloginPage } from './elogin.page';

describe('EloginPage', () => {
  let component: EloginPage;
  let fixture: ComponentFixture<EloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
