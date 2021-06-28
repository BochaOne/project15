import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddformNoteComponent } from './addform-note.component';

describe('AddformNoteComponent', () => {
  let component: AddformNoteComponent;
  let fixture: ComponentFixture<AddformNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddformNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddformNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
