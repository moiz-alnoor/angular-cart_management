import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductsServiceService {

  constructor(private http: HttpClient) { }

 /* when user  getting the first look */
  getDefaultProducts(productsParameters:any) {
   return this.http.get(`https://api.spoonacular.com/food/products/search?query=${productsParameters.searchKey}&apiKey=${productsParameters.apiKey}`);
   }

 /* when user chose a product */
  selectedProducts(productsParameters:any) {
    return this.http.get(`https://api.spoonacular.com/food/products/search?query=${productsParameters.searchKey}&apiKey=${productsParameters.apiKey}`);
  }

 /* Recipe of the product */
  getProductsRecipe(productsParameters:any){
  return this.http.get(`https://api.spoonacular.com/food/products/${productsParameters.product_id}?apiKey=${productsParameters.apiKey}`);

  }

}
