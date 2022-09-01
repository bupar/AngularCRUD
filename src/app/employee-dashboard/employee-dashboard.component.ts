import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup;
  employeeModelObj:EmployeeModel =new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder:FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      emailId:[''],
      mobileNumber:[''],
      salary:['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=true;
  }
  postEmployeeDetail(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.emailId=this.formValue.value.emailId;
    this.employeeModelObj.mobileNumber=this.formValue.value.mobileNumber;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee has been added successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong !");
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }
  deleteEmployee(row :any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee has been deleted.")
      this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.showAdd=true;
    this.showUpdate=false;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetail(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.emailId=this.formValue.value.emailId;
    this.employeeModelObj.mobileNumber=this.formValue.value.mobileNumber;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated successfully!")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
