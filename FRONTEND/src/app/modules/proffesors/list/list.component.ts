import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Proffesor } from '../../../models/proffesor';
import { ProffesorsService } from '../../../services/proffesors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'name', 'email', 'options'];
  theProffesors:Proffesor[] = [];

  constructor(private proffesorsService: ProffesorsService,
              private router:Router) { }

  ngOnInit(): void {
    this.listProffesors();
  }

  listProffesors(): void {
    this.proffesorsService.index().subscribe(response => {
      console.log(response);
      this.theProffesors = response.data;
    });
  }

  createProffesor():void{
    this.router.navigate(['/Proffesors/create']);
    console.log("creando profesor");
  }

  updateProffesor(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Proffesors/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteProffesor(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete proffesor',
        text: "Sure you want to delete this proffesor?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.proffesorsService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The proffesor is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }
}
