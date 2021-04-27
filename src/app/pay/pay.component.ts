import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  totalItem: any;
  master: boolean = true;
  paypal:boolean = false;
  constructor(private _Activatedroute: ActivatedRoute) {
    this.totalItem = this._Activatedroute.snapshot.paramMap.get('totalItem');
  }

  ngOnInit(): void {}

    /* masterCardInput  */
  checkMaster(){
    this.master = true;
    this.paypal = false;
  }
    /* payPalInput  */
  checkPaypal(){
    this.master = false;
    this.paypal = true;
  }
}
