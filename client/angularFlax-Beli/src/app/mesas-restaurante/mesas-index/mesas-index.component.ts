import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-mesas-index',
  templateUrl: './mesas-index.component.html',
  styleUrls: ['./mesas-index.component.css']
})
export class MesasIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(

    private gSevice: GenericService,
    private dialog:MatDialog
  ) { 
    this.listaVideojuegos();
    }
    listaVideojuegos() {
      this.gSevice
        .list('mesa/')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datos = data;
        });
    }
}
