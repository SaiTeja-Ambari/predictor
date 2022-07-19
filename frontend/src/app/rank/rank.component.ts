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
  ngOnInit(): void {
    this._service.getAlldata().subscribe((res)=>{
      console.log(res);
      this.readData=res;
    })
  }
  rankForm = new FormGroup({
    'name' : new FormControl('',Validators.required),
    'eamcet' : new FormControl('',Validators.required),
    'ip' : new FormControl('',Validators.required)

  });
  rankSubmit(){
    if(this.rankForm.valid){
      this.expectedMsg="success";
      this._service.createData(this.rankForm.value).subscribe((res) =>{
        console.log(this.rankForm.value);
        this.rankForm.reset();
      });
    }
    else{
      console.log("all fields are required");
      this.errorMsg="all fields are required";
    }
  }

}
