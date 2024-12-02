import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit {

   department : string[] = ['support', 'Manager', 'Designer','developer','QA']
   selectedDepartment: string = '';
   listData :any;
   editIndex: number | null = null;

   isEditMode = false;

  personForm: FormGroup;

  constructor(private form:FormBuilder, private http: HttpClient, private formDataService: FormDataService){

    this.listData = [];

    this.personForm = this.form.group({
      name: ['',],
      email: [''],
      mobile: [''],
      department: [''],
      hrInput:[],
      ManagerInput:[],
      developerInput:[],
      DesignerInput:[],
      QAInput:[],
      gender: ['']
    });
  }

  public addItem() :void {
    if (this.editIndex !== null) {
      // Update existing record
      this.listData[this.editIndex] = this.personForm.value;
      this.editIndex = null; // Reset edit mode
    } else {
      // Add new record
      this.listData.push(this.personForm.value);
    }
  }

  public editItem(item:any): void {
    this.personForm.patchValue({
      name:item.name,
      email:item.email,
      mobile:item.mobile,
      department:item.department,
      gender:item.gender
    }); // Populate the form with the selected item

     this.isEditMode = !this.isEditMode;
  }

  reset(){
    this.personForm.reset();
  }

  ngOnInit(): void {
   
  }


  uploadImage(event: any) {
    const file = event.target.files[0]; // Correctly access the first file
    const formObj = new FormData();
    formObj.append('file', file);
  
    this.http.post('http://localhost:3000/upload', formObj).subscribe({
      next: (res: any) => {
        console.log('Upload success:', res);
      },
      error: (err) => {
        console.error('Upload error:', err);
      },
    });
  }
  
  onSubmit() {
    console.log(this.personForm.value);

    const formData = this.personForm.value;
    this.formDataService.postFormData(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.personForm.reset(); // Resetting the form after success
      },
      error: (error) => console.log('Error:', error),
    });
    
  }

}
