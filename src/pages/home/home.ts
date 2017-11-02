import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoteItem } from "../../class/note-items";
import { consultingService } from "../../providers/call-api/http.service";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  notes:NoteItem[] = [];
  note:NoteItem;
  private todo : FormGroup;
  
  clocking;

  constructor(public navCtrl: NavController,private service:consultingService, private formBuilder: FormBuilder ) {    
    this.todo = this.formBuilder.group({
      'title': [null,Validators.required],
      'bodyNote': [null,Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(400)])]      
    });
  }  

  ionViewDidLoad(){
    this.clocking = Observable.interval(1000).map(()=> new Date());  
    this.service.getLastNote()
    .then(res=> this.note = res)    
    .catch(err=> console.log(err))
  }

  ionViewWillEnter() {
    console.log('How appens')
    this.service.getLastNote()
    .then(res=> this.note = res)    
    .catch(err=> console.log(err))
  }
 

  logForm(){            
    let newNote = [{'title':this.todo.value.title,'body':this.todo.value.bodyNote,'flag':true}];
    console.log(JSON.stringify(newNote));
    
    this.service.postNotes(JSON.stringify(newNote))
    .then(
      (res)=>this.service.getLastNotes()
            .then(
                notas =>  this.notes = notas))
    .catch((err)=>{console.log(err)});
    
    this.ionViewWillEnter();    
    this.todo.reset();
  }


}
