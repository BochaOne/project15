import { NodeWithI18n } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyNote } from 'src/app/shared/Interfaces/note.interface';
import { TypeNote } from 'src/app/shared/Interfaces/type-note.interface';
import { HttpNoteService } from 'src/app/shared/services/http-note.service';



@Component({
  selector: 'app-card-note',
  templateUrl: './card-note.component.html',
  styleUrls: ['./card-note.component.css']
})
export class CardNoteComponent implements OnInit {

  @Input() note!: MyNote;
  
  noteForm!: FormGroup;
  typeList: TypeNote[] = [];

  modeEdit = false;

  @Output() deleteNote = new EventEmitter<number>();
  @Output() editNote = new EventEmitter<MyNote>();

  constructor(private hhtpTypeService: HttpNoteService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const controls = {
      noteTitle: [null, [Validators.required, Validators.maxLength(50)]],
      noteText: [null, [Validators.required, Validators.maxLength(200)]],
      noteType: [null, [Validators.required]],
      noteDate: [],
    }

    this.getTypes();
    this.noteForm = this.fb.group(controls);
    
    if(this.note) {
      this.noteForm.patchValue(this.note);
    }
  }

  onDeleteNote() {
    this.deleteNote.emit(this.note.id);
  }

  onEditNote() {
    this.modeEdit = false;
    const note = this.noteForm.value;
    this.editNote.emit(note);
  }

  async getTypes() {
    try {
      this.typeList = await this.hhtpTypeService.getTypes();
    } catch (err) {
      console.log(err);
    }
  }

  find(id: any) {
    return this.typeList.find((item)=> item.id == id)?.noteType;
  }
}
