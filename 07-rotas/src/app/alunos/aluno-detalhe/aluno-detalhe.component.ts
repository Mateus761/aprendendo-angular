import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  aluno!: any;
  inscricao!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService) { }

  ngOnInit(): void {
      this.inscricao =  this.route.params.subscribe(params => {
      let id = params['id'];

      this.aluno = this.alunosService.getAluno(id);
    })
  }


  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
