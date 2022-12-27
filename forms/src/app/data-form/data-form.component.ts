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
    //   email: new FormControl(null),

    //   endereco: new FormGroup({
    //     cep: new FormControl(null)
    //   })
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null,  Validators.required],
        numero: [null,  Validators.required],
        complemento: [null],
        rua: [null,  Validators.required],
        bairro: [null,  Validators.required],
        cidade: [null,  Validators.required],
        estado: [null,  Validators.required]
    })
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

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
      }
  }

    verificaValidTouched(campo: string) {
      return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
}

consultaCEP() {

  let cep = this.formulario.get('endereco.cep')?.value

  //Nova variável "cep" somente com dígitos.
  cep = cep.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if(cep != "") {

    //Expressão regular para validar o CEP.
    let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm()

       //Consulta o webservice viacep.com.br/
       this.http.get(`//viacep.com.br/ws/${cep}/json/`)
        .pipe(map(dados => dados))
        .subscribe(dados =>  this.populaDadosForm(dados));
       }
  }

}


  populaDadosForm(dados: any){
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome')?.setValue('Mateus');

  }

resetaDadosForm() {
  this.formulario.patchValue({
    endereco: {
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null 
    }
  })
};

  

}



