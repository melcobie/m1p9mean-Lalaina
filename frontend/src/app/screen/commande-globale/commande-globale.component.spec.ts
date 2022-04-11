import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeGlobaleComponent } from './commande-globale.component';

describe('CommandeGlobaleComponent', () => {
  let component: CommandeGlobaleComponent;
  let fixture: ComponentFixture<CommandeGlobaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeGlobaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeGlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
