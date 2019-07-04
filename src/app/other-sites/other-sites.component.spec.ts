import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSitesComponent } from './other-sites.component';

describe('OtherSitesComponent', () => {
  let component: OtherSitesComponent;
  let fixture: ComponentFixture<OtherSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
