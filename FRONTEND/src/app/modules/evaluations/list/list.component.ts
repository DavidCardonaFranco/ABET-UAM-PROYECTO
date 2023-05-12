import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Evaluation } from '../../../models/evaluation';
import { EvaluationsService } from '../../../services/evaluations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ['id', 'grade', 'options'];
  theEvaluations:Evaluation[] = [];

  constructor(private evaluationsService: EvaluationsService,
              private router:Router) { }

  ngOnInit(): void {
    this.listEvaluations();
  }

  listEvaluations(): void {
    this.evaluationsService.index().subscribe(response => {
      console.log(response);
      this.theEvaluations = response.data;
    });
  }

  createEvaluation():void{
    this.router.navigate(['/Evaluations/create']);
    console.log("creando evaluación");
  }

  updateEvaluation(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Evaluations/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteEvaluation(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete evaluation',
        text: "Sure you want to delete this evaluation?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.evaluationsService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The evaluation is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }
}
