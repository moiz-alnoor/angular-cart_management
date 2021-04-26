import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  itemNumber: any;
  master: boolean = true;
  paypal:boolean = false;
  constructor(private _Activatedroute: ActivatedRoute) {
    this.itemNumber = this._Activatedroute.snapshot.paramMap.get('item_number');
  }

  ngOnInit(): void {}
  checkMaster(){
    this.master = true;
    this.paypal = false;
  }
  checkPaypal(){
    this.master = false;
    this.paypal = true;
  }
}
