import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dasboard.model';

@Component({
  selector: 'app-employee-dasboard',
  templateUrl: './employee-dasboard.component.html',
  styleUrls: ['./employee-dasboard.component.css']
})
export class EmployeeDasboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelobj : EmployeeModel = new EmployeeModel(); 
  employeeData! : any;
  showAdd! : boolean;
  showUpdate! : boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fname :[''],
      lname :[''],
      email :['']
    })

    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails(){
    this.employeeModelobj.fname = this.formValue.value.fname;
    this.employeeModelobj.lname = this.formValue.value.lname;
    this.employeeModelobj.email = this.formValue.value.email;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully :) ")
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },
    err=>{
      alert("Something Went Wrong :(")
    })
  }

  getAllEmployee(){
    this.api.getEmployee(this.employeeModelobj)
    .subscribe(res=>{
      this.employeeData=res;

    })
  }
  
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
      
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelobj.id=row.id;
    this.formValue.controls['fname'].setValue(row.fname);
    this.formValue.controls['lname'].setValue(row.lname);
    this.formValue.controls['email'].setValue(row.email);
    
  }

  updateEmployeeDetails(){
    this.employeeModelobj.fname = this.formValue.value.fname;
    this.employeeModelobj.lname = this.formValue.value.lname;
    this.employeeModelobj.email = this.formValue.value.email;
    this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)
    .subscribe(res=>{
      alert("Employee Details edited successfully :) ")
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    })

  }

}
