import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from './../products-service.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  /* productsSelectData  */
  selectProducts = [
    { id: 1, name: 'pizza' },
    { id: 2, name: 'coffee' },
    { id: 3, name: 'sush' },
    { id: 4, name: 'chowder' },
    { id: 5, name: 'cake' },
  ];

  /* uiData  */

  defaultSearchKey = 'pizza';
  products: any[] = [];
  recipes: any[] = [];
  productsParameters: any;
  isLoadingData: boolean = false;
  cartItems: any[] = [];
  exist: any;

  //  all this key are available

  apiKey = 'e2fc984542944254a3ff7b6fe1e553ab';
  //apiKey = '3adcaf7fdc8f400f84ae38d0eafa4a75'

  // not use for dev
  //apiKey = 'cbac52df41214743a4dabcacf89b4226'
  //apiKey = 'c63e3cb004bf4b62a30b3332ed3895ae'

  constructor(private ProductsServiceService: ProductsServiceService) {}

  ngOnInit(): void {
    localStorage.setItem('apiKey', this.apiKey);
    this.getProducts();
  }

  /* getProductsAsDefault  */
  getProducts() {
    this.productsParameters = {
      searchKey: this.defaultSearchKey,
      apiKey: localStorage.getItem('apiKey'),
    };
    this.isLoadingData = true;
    this.ProductsServiceService.getDefaultProducts(
      this.productsParameters
    ).subscribe((productsData: any) => {
      this.products = productsData.products;
      this.isLoadingData = false;
    });
  }

  /* getProductsAsDefault  */
  getRecipe(product: any) {
    //this.recipes

    for (let i = 0; i < product.length; i++) {
      this.productsParameters = {
        product_id: product[i].id,
        apiKey: localStorage.getItem('apiKey'),
      };

      this.ProductsServiceService.getProductsRecipe(
        this.productsParameters
      ).subscribe((recipeData: any) => {
        this.recipes.push(recipeData);
      });
    }
  }
  /* getSelectedProducts  */

  onChange(selectedOptions: any) {
    if (selectedOptions === undefined) {
      selectedOptions.name == this.defaultSearchKey;
    }
    this.isLoadingData = true;
    this.productsParameters = {
      searchKey: selectedOptions.name,
      apiKey: localStorage.getItem('apiKey'),
    };

    this.ProductsServiceService.selectedProducts(
      this.productsParameters
    ).subscribe((productsData: any) => {
      this.products = productsData.products;
      this.isLoadingData = false;
    });
  }

  /*  when user add item to card  */
  onAdd(product: any) {
    this.exist = this.cartItems.find((x: any) => x.id == product.id);
    if (this.exist) {
      this.cartItems = this.cartItems.map((x: any) =>
        x.id === product.id ? { ...this.exist, qty: this.exist.qty + 1 } : x
      );
    } else {
      this.cartItems = [...this.cartItems, { ...product, qty: 1 }];
    }
  }

  /*  when user remove item from card  */
  onRemove(product: any) {
    this.exist = this.cartItems.find((x: any) => x.id === product.id);
    if (this.exist.qty === 1) {
      this.cartItems = this.cartItems.filter((x: any) => x.id !== product.id);
    } else {
      this.cartItems = this.cartItems.map((x: any) =>
        x.id === product.id ? { ...this.exist, qty: this.exist.qty - 1 } : x
      );
    }
  }
}
