import { EditShoppingItemPage } from './../edit-shopping-item/edit-shopping-item';
import { ShoppingItem } from './../../models/shopping-item/shopping-item.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddShoppingPage } from './../add-shopping/add-shopping';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFireDatabase: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {

    /* 
      Pointing shoppingListRef$ at Firebase -> 'shopping-list' node.
      This means that not only we can push things frpm this reference to the database, but ALSO
      we have access to everything inside of that node. 
     */
    this.shoppingListRef$ = this.angularFireDatabase.list('shopping-list');
  }

  navigateToAddShopping() {
    //navigate the user to AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

  /*
    Displays an ActionSheet which consist of the following options :
    1.Edit the ShoppingItem.
    2.Delete the ShoppingItem.
    3.Cancel selection. 
   */
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [{
        text: 'Edit',
        handler: () => {
          /*
          Send user to the EditShoppingItem Page and use key as a parameter.
          */
          this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key })
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          /*
          Delete the current ShoppingItem. 
           */
          this.shoppingListRef$.remove(shoppingItem.$key);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          /* 
          Cancel selection of the current ShoppingItem.
          */
        }
      }
      ]
    }).present();
  }
}
