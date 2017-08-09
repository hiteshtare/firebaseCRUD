import { ShoppingItem } from './../../models/shopping-item/shopping-item.model';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';


/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItem$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem: ShoppingItem;
  shoppingItemSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFireDatabase: AngularFireDatabase) {

    //Capture the 'shoppingItemId' as a Navparamter passed from ShoppingListPage. 
    const shoppingItemId = this.navParams.get('shoppingItemId');

    this.shoppingItem$ = this.angularFireDatabase.object(`shopping-list/${shoppingItemId}`);

    //Subscribe to the object and assign the result to this.shoppingItem.
    this.shoppingItemSubscription = this.shoppingItem$.subscribe(shoppingItem => {
      this.shoppingItem = shoppingItem;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
  }

  editShoppingItem(shoppingItem: ShoppingItem) {

    //Update our Firebase node with new item data.
    this.shoppingItem$.update(shoppingItem);

    //Send user back to the ShoppingListPage.
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    
    //Unsubscribe from the Observable when the page is left.  
    this.shoppingItemSubscription.unsubscribe();
  }
}
