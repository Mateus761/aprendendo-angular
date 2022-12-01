import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos!: any[]
  pagina!: number
  incricao!: Subscription;

  constructor(
    private cursosService: CursosService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();

    this.incricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.pagina = queryParams['pagina'];
      }
    );

  }

  ngOnDestroy() {
    this.incricao.unsubscribe();
  }

  proximaPagina() {
    this.router.navigate(['/cursos'], {queryParams: {'pagina': ++this.pagina}});
  }

}
