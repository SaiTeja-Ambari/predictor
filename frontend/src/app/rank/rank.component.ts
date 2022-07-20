import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  constructor(private _service:ApiserviceService) { }

  readData:any;
  errorMsg:string="";
  expectedMsg:string="";
  id:number=0;
  name:string="";
  eamcet:number=0;
  ip:number=0;
  ngOnInit(): void {
    this._service.getAlldata().subscribe((res)=>{
      this.readData=res;
    })
  }
  rankForm = new FormGroup({
    'name' : new FormControl('',Validators.required),
    'eamcet' : new FormControl('',Validators.required),
    'ip' : new FormControl('',Validators.required),

  });
  refresh(){
    this._service.getAlldata().subscribe((res)=>{
      this.readData=res;
    })
  }
  rankSubmit(){
    if(this.rankForm.valid){
      this.expectedMsg="success";
      this._service.createData(this.rankForm.value).subscribe((res) =>{
        console.log(this.rankForm.value);
        this.name=this.rankForm.value.name;
        this.eamcet=this.rankForm.value.eamcet;
        this.ip=this.rankForm.value.ip;
        this.rankForm.reset();
        this.refresh();
      });
    }
    else{
      console.log("all fields are required");
      this.errorMsg="all fields are required";
    }
  }

  deleteID(){
    this.findElementToBeDeleted();
    this._service.deleteData(this.id).subscribe((res)=>{
    this.refresh();
   })
  }

  updateID(){
    this.findElementToBeDeleted();

    console.log(this.name,this.id);
    this.rankForm.patchValue({
      name:this.name,
      eamcet:this.eamcet,
      ip:this.ip
    });
  }

  findElementToBeDeleted(){
    this.id=0;
      this.readData.forEach((element: any) => {
        this.id=Math.max(this.id,(element.id));
      });
      console.log(this.readData,this.id);
      
  }
}
