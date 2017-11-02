import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { consultingService } from '../../providers/call-api/http.service'
import { ListDetailPage } from "../list-detail/list-detail";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  notes:any[]
  constructor(public navCtrl: NavController, public navParams: NavParams, private service:consultingService) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies    
    this.getData();
    }

    ionViewDidEnter() {
      this.getData();
  }

    getData(){
      this.service.getNotes()
      .then(data=>this.notes = data)
      .catch()
    }
    
    pushPage(id,title,body,date){          
      this.navCtrl.push(ListDetailPage, {
        _id:id,
        _title:title,
        _body:body,
        _date:date        

      });
  
    }
  
}
