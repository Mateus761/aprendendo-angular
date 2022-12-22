import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(formulario: any) {
    console.log(formulario);
    //console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      })
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  verificaValidTouched(campo: any) {
     return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
      }
  }

  consultaCEP(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if(cep != "") {

      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

          this.resetaDadosForm(form)

         //Consulta o webservice viacep.com.br/
         this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map(dados => dados))
          .subscribe(dados =>  this.populaDadosForm(dados, form));
         }
    }
  }

  populaDadosForm(dados: any, formulario: any) {

    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });
  
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    // console.log(formulario);
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null 
      }
    })
  }

}


