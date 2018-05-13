import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppService } from '../services/app.service';
@Component({
	moduleId: module.id,
	selector: 'main',
	templateUrl: 'main.component.html',
	styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {
	private data_arr = new Array();
	private first_arr = new Array();
	private flag = false;
	constructor(private socket: Socket, private _appServices: AppService) {}

	ngOnInit() {
		this._appServices.firstLoad().then(res =>{
			this.data_arr = res.data;
			this.first_arr = res.data;
		});
		this.socket.on('reload', (data: any) => {
			this.data_arr = data;
			this.flag = true;
			for(let i = 0; i < this.data_arr.length; i++)
			for(let j =0; j< this.first_arr.length; j++){
			 	if(this.data_arr[i]._id === this.first_arr[j]._id) {
					this.data_arr[i].change = (this.data_arr[i].price - this.first_arr[j].price).toFixed(2);
					if(this.data_arr[i].price !== this.first_arr[j].price) this.data_arr[i].change_percent = ((this.data_arr[i].price - this.first_arr[j].price) / this.first_arr[j].price * 100).toFixed(2);
					else {
						this.data_arr[i].change_percent = "--";
						this.data_arr[i].change = "--";
					}
					
					if(parseFloat(this.data_arr[i].change) > 0) this.data_arr[i].color = "#68ff54";
					else if(parseFloat(this.data_arr[i].change) < 0) this.data_arr[i].color = "red";
					else this.data_arr[i].color = "black";
				} 
			}
		});
	}
	getTopGainers(){
		this.socket.emit('change-type', 1);
	}
	getTopLosers(){
		this.socket.emit('change-type', 2);
	}
}