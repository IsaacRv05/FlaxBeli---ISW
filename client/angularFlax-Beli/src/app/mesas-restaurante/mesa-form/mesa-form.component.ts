import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrls: ['./mesa-form.component.css']
})
export class MesaFormComponent implements OnInit {
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList:any;
  mesaInfo:any;
  respMesa:any;
  submitted = false;
  mesaForm!: FormGroup;
  idVideojuego: number = 0;
  isCreate:boolean=true;

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
      this.formularioReactive();
      this.listaRestaurantes();
    
  }

  ngOnInit(): void {
        //Verificar si se envio un id por parametro para crear formulario para actualizar
        this.activeRouter.params.subscribe((params:Params)=>{
          this.idVideojuego=params['id'];
          if(this.idVideojuego!=undefined){
            this.isCreate=false;
            this.titleForm="Actualizar";
             //Obtener videojuego a actualizar del API
             this.gService.get('mesa',this.idVideojuego).pipe(takeUntil(this.destroy$))
             .subscribe((data:any)=>{
              this.mesaInfo=data;
              this.mesaForm.setValue({
                id:this.mesaInfo.id,
                codigoMesa:this.mesaInfo.codigoMesa,
                capacidad:this.mesaInfo.capacidad,
                estadoMesa:this.mesaInfo.estadoMesa,
                restaurante:this.mesaInfo.restauranteId.map(({id}) => id)
              })
             });
          }
    
        });
  }

    //Crear Formulario
    formularioReactive(){
      //[null, Validators.required]
      this.mesaForm=this.fb.group({
        id:[null,null],
        codigoMesa:[null, Validators.required],
        capacidad:[null, Validators.required],
        estadoMesa: [null, Validators.required],
        restaurante:[null, Validators.required]
      });
     
    }
    listaRestaurantes() {
      this.restaurantesList = null;
      this.gService
        .list('restaurante')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          // console.log(data);
          this.restaurantesList = data;
        });
    }

    public errorHandling = (control: string, error: string) => {
      return this.mesaForm.controls[control].hasError(error);
    };

  //Crear Videojueogo
  crearMesa(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.mesaForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.mesaForm.get('restauranteId')?.value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.mesaForm.patchValue({ restauranteId:gFormat});
    console.log(this.mesaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('mesa',this.mesaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respMesa=data;
      this.router.navigate(['/mesa/all'],{
        queryParams: {create:'true'}
      });
    });
  
  }
  //Actualizar Videojuego
  actualizarMesa(){
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.mesaForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.mesaForm.get('restaurante')?.value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.mesaForm.patchValue({ restaurante:gFormat});
    console.log(this.mesaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('mesa',this.mesaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respMesa=data;
      this.router.navigate(['/mesas/all'],{
        queryParams: {update:'true'}
      });
    });
  }
  onReset() {
    this.submitted = false;
    this.mesaForm.reset();
  }
  onBack() {
    this.router.navigate(['/mesas/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}
