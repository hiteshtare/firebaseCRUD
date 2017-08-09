import { ShoppingItem } from './../../models/shopping-item/shopping-item.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  //Creating a new Object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFireDatabase: AngularFireDatabase) {
    this.shoppingItemRef$ = this.angularFireDatabase.list('shopping-list');

    /*
      shopping-list:
        0:
          itemName: 'Pizza',
          itemValue: 4
        1:
          itemName: 'Cheesecake'
          itemValue: 2  
     */
  }

  addShoppingItem(shoppingItem: ShoppingItem) {

    /* 
    Create a new anonymous object and convert itemNumber to a Number.
    Push this to our firebase database under the 'shopping-list' node.
    */
    this.shoppingItemRef$.push({
      itemName: shoppingItem.itemName,
      itemValue: Number(shoppingItem.itemValue)
    });

    //Reset our ShoppingItem Object
    this.shoppingItem = {} as ShoppingItem;

    //Navigate the user back to the ShoppingListPage
    this.navCtrl.pop();
  }
}
