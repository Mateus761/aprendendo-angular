import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clico',
  templateUrl: './clico.component.html',
  styleUrls: ['./clico.component.scss']
})
export class ClicoComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, 
    AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

  @Input()
  valorInicial: number = 10;

  constructor() {
    this.log('construtor')
   }

   ngOnChanges() {
    this.log('ngOnChanges')
   }

  ngOnInit(): void {
    this.log('ngOnInit')
  }

  ngDoCheck() {
    this.log('ngDoCheck')
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit')
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit')
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked')
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked')
  }
  
  ngOnDestroy(): void {
    this.log('ngOnDestroy')
  }

  private log(hook: string) {
    console.log(hook)
  }

}
