import { Component } from '@angular/core';
import { MyNote } from './shared/Interfaces/note.interface';
import { TypeNote } from './shared/Interfaces/type-note.interface';
import { HttpNoteService } from './shared/services/http-note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project15';

  noteList!: MyNote[];
  typeList!: TypeNote[];

  constructor (private httpNoteService: HttpNoteService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  async getNotes() {
    try {
      this.typeList = await this.httpNoteService.getTypes();
      this.noteList = await this.httpNoteService.getNotes();
    } catch (err) {
      console.log(err);
    }
  }

  async onAddNote(note: MyNote) {
    note.id = this.noteList.length > 0 
      ? this.noteList[this.noteList.length - 1].id + 1 
      : 1;
    let now = new Date();
    note.noteDate = now.toLocaleString();
    console.log(note);
    try {
      await this.httpNoteService.postNote(note);
      this.getNotes();
    } catch (err) {
      console.log(err);
    } 
  }

  async onDeleteNote(id: number | any) {
    try {
      await this.httpNoteService.deleteNote(id);
      this.getNotes();
    } catch (err) {
      console.log(err);
    }
  }

  async onEditNote(id: number | any, note: MyNote) {
    let now = new Date();
    note = {
      noteTitle: note.noteTitle,
      noteText: note.noteText,
      noteType: note.noteType,
      noteDate: note.noteDate,
      noteDateUpdate: now.toLocaleString(),
    } 
    try {
      await this.httpNoteService.putNote(id, note);
      this.getNotes();
    } catch (err) {
      console.log(err);
    }
  }

  async onAddType(type: TypeNote | any){
    try {
      await this.httpNoteService.postType(type);
      this.getNotes();
    } catch (err) { 
      console.error(err) 
    }
  }

  async onDeleteType(id: number | any) {
    try {
      await this.httpNoteService.deleteType(id);
      this.getNotes();
    } catch (err) {
      console.log(err);
    }
  }
}