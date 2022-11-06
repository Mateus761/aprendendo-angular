import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  // styleUrls: ['./data-binding.component.scss']
  styles: [
    `
        .highlight {
          background-color: yellow;
          font-weight: bold;
      }
    `
  ]
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loaine.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://lorempixel.com.br/400/200/nature'

  valorAtual: string = '';
  valorSalvo?: string = '';

  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular';

  valorInicial = 15;

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  botaoClicado() {
    alert('Botão clicado!')
  }

  onKeyUp(evento: KeyboardEvent) {
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: string) {
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento: any) {
    console.log(evento.novoValor);
  }

  constructor() { }

  ngOnInit(): void {
  }


 ultimaParada(combustivel: number,consumo: number,postosDeGasolina: Array<number>) {  

    let postosValidos = []
  
    let maiorDistancia = combustivel * consumo   

    let postoMaisLonge: number

    for (let i = 0; i < postosDeGasolina.length; i++) {
      if (postosDeGasolina[i] > maiorDistancia) {
        postosValidos.push(postosDeGasolina[i])
      }
    }
    if (postosValidos.length > 0) {
      postoMaisLonge = Math.max(...postosValidos)
      return postoMaisLonge;
    }

    else return -1
  }

}
