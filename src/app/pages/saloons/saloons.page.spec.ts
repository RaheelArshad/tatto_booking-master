import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaloonsPage } from './saloons.page';

describe('SaloonsPage', () => {
  let component: SaloonsPage;
  let fixture: ComponentFixture<SaloonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaloonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaloonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
