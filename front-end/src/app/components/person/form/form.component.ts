import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RestService } from '../../../services/rest/rest.service'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PersonFormComponent implements OnInit {
  form: FormGroup;

  people: any;
  peoples:any = [];
  idPeople: string;

  title:string = "Cadastrar Pessoa";
  

  constructor(private rest: RestService, public formBuilder: FormBuilder, private router: Router, 
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params.subscribe(params => {
        if(params['id']) {
          this.idPeople = params['id'];
          this.title = "Editar Pessoa"
          this.getPeople(this.idPeople);
        }
      });

      this.form = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        email: new FormControl(),
        dateBird: new FormControl()
     });

    }

  ngOnInit() {
    
    if(this.idPeople) {
      this.getPeople(this.idPeople);
    } else {
      this.fieldsForm("", "", "", "");
    }

  }

  submit() {    
    if(this.form.value.id > 0) {
      this.rest.putRequest('people', this.form.value).subscribe((data: {}) => {
        this.people = data;
        if(this.people.id>0) {
          this.router.navigate(['/pessoa/'+this.people.id]);
        }
        
      });
    } else {
      console.log("ELSE");
      this.rest.postRequest('people', this.form.value).subscribe((data: {}) => {
        this.people = data;
        if(this.people.id>0) {
          this.router.navigate(['/pessoa/'+this.people.id]);
        }
        
      });
    }
  }

  getPeople(id: string) {
    this.rest.getRequest('people/'+id).subscribe((data: {}) => {
      this.people = data;
      this.people.dateBird[1] = this.formatDate(this.people.dateBird[1]);
      this.people.dateBird[2] = this.formatDate(this.people.dateBird[2]);
      this.fieldsForm(this.people.id, this.people.name, this.people.email, this.people.dateBird.join("-"));
    });
  }

  fieldsForm(id: string, name: string, email:string, dateBird: string) {
    this.form = this.formBuilder.group({
      id: [id],
      name: [name],
      email: [email],
      dateBird: [dateBird]
    });
  }

  formatDate(value: number): string {
    if(value<10) {
      return "0"+value;
    }
    return ""+value;
  }

}
