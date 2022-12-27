import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    })

    // [Validators.required, Validators.minLength(3), Validators.maxLength(20)]

  }

  onSubmit() {
    console.log(this.formulario)

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form
        // this.formulario.reset();
        this.resetar();
      },
      (error: any) => alert('erro'))
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
      }
  }

    verificaValidTouched(campo: any) {
      return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
}

}
