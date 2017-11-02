import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { consultingService } from "../../providers/call-api/http.service";
import { ListPage } from "../../pages/list/list";



/**
 * Generated class for the ListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {
     
  _id;_body;_date;_title;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private service:consultingService) {
        
  }

  
  ionViewDidLoad() {    
    this._id = this.navParams.get('_id');
    this._title = this.navParams.get('_title');                              
    this._body = this.navParams.get('_body');
    this._date = this.navParams.get('_date');    
  }
    
  pushOnPAge(id){
    this.service.deletedNotes(id).then(()=>{      
      this.navCtrl.pop();      
    }).catch()
    
  }
  

}
