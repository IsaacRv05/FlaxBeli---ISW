import { AfterViewInit, Component} from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PedidosDetailComponent } from '../pedidos-detail/pedidos-detail.component';

@Component({
  selector: 'app-pedidos-all',
  templateUrl: './pedidos-all.component.html',
  styleUrls: ['./pedidos-all.component.css']
})
export class PedidosAllComponent implements AfterViewInit{
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  displayedColumns = ['id','fechaOrden','estado',"acciones"];
  constructor(
    private route: ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog
  ) { 

  }

  ngAfterViewInit(): void {
    this.listaPedidos();
  }

  listaPedidos() {
    this.gService
      .list('pedido/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((datas: any) => {
        console.log(datas);
        this.datos = datas;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detallePedido(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(PedidosDetailComponent,dialogConfig);
  }


}
