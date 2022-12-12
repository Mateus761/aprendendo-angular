import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosService } from './alunos.service';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';


@NgModule({
  declarations: [
    AlunosComponent,
    AlunoFormComponent,
    AlunoDetalheComponent
  ],
  providers: [
    [AlunosService,
    AlunosDeactivateGuard]
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    FormsModule
  ]
})
export class AlunosModule { }
