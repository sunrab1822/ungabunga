import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit{
  constructor (private httpService: HttpService) {}

  viewPoints: any[] = []
  errorMessage : string = ""
  selectedrate = ""
  selectedPoint = 0
  model = {
    viewpointId: 14,
    email: "",
    rating: 0,
    comment: ""
  }
  ffe = false


  ngOnInit(): void{
    this.httpService.getAllViewpoints().subscribe({
      next: (result) =>  this.viewPoints = result,
      error: (err) => console.log(err)
    })
  }

  send() : void {
    this.model.rating = Number(this.selectedrate)
    this.model.viewpointId = Number(this.selectedPoint)
    if (!this.ffe){
      this.errorMessage = "fogadja el a felhasználói feltételeket"
      return;
    }
    if (this.model.viewpointId == 0)
    {
      this.errorMessage = "Válassza ki a klátót"
      return
    }
    if (this.model.email == "")
    {
      this.errorMessage = "Adjon meg emailt"
      return
    }
    if (this.model.rating == 0)
    {
      console.log(this.model.rating, this.selectedrate)
      this.errorMessage = "Értékelje"
      return
    }
    if (this.model.comment == "")
    {
      this.errorMessage = "irjon commentet"
      return
    }

    console.log(this.model)

    this.httpService.sendRating(this.model).subscribe({
      next: (result: any) => {
        alert(`A kilátó eddigi értékelese ${result.average}, ${result.count} látogató vélemény alapján`)
      },
      error: (err:any) =>{
        this.errorMessage = err.error?.message ?? err.message
      }
    })

  }
}
