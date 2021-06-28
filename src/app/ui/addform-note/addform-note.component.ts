import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyNote } from 'src/app/shared/Interfaces/note.interface';
import { TypeNote } from 'src/app/shared/Interfaces/type-note.interface';
import { HttpNoteService } from 'src/app/shared/services/http-note.service';

@Component({
  selector: 'app-addform-note',
  templateUrl: './addform-note.component.html',
  styleUrls: ['./addform-note.component.css']
})
export class AddformNoteComponent implements OnInit {

  @Output() addNote = new EventEmitter<MyNote>();
  @Output() addType = new EventEmitter<TypeNote>();
  @Output() deleteType = new EventEmitter<number>();

  noteForm!: FormGroup;
  typeForm!: FormGroup;

  @Input() typeList!: TypeNote[];

  constructor(private hhtpTypeService: HttpNoteService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const controls = {
      noteTitle: [null, [Validators.required, Validators.maxLength(50)]],
      noteText: [null, [Validators.required, Validators.maxLength(200)]],
      noteType: [null, [Validators.required]],
      newType: [null],
    };

    const controlsType = {
      noteType: [null, [Validators.required]],
    }

    this.typeForm = this.fb.group(controlsType);

    this.getTypes();
    this.noteForm = this.fb.group(controls);
  }

  onAddNote() {
    const note = this.noteForm.value;
    this.addNote.emit(note);
    this.noteForm.reset();
  }

  onAddType(){
    let newType:TypeNote = { 
      noteType:this.noteForm.value["newType"] 
    };
    this.addType.emit(newType);
    this.noteForm.reset();
    // if(this.noteForm.value["newType"]!=null)
    // {
    //   let newType:TypeNote = { 
    //     noteType:this.noteForm.value["newType"] 
    //   };
    //   this.addType.emit(newType);
    //   this.noteForm.reset();
    // } else {
    //   alert("Тип для добавления не указан!");
    // }
  }

  onDeleteType(){
    if(this.noteForm.value["noteType"]!=null)
    {
      this.deleteType.emit(this.noteForm.value["noteType"]);
      this.noteForm.reset();
    } else {
      alert("Тип для удаления не указан!");
    }
  }

  async getTypes() {
    try {
      this.typeList = await this.hhtpTypeService.getTypes();
    } catch (err) {
      console.log(err);
    }
  }
}
