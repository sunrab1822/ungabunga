import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor (private httpService: HttpService) {}
  locations: any[] = []
  viewPoints: any[] = []
  selectedLocaton: string = ""

  ngOnInit(): void{
    this.httpService.getLocations().subscribe({
      next: (result) =>  this.locations = result,
      error: (err) => console.log(err)
    })
  }

  locationSelect(){
    this.httpService.getViewpoints(this.selectedLocaton).subscribe({
      next: (result) => this.viewPoints = result,
      error: (err) => console.log(err)
    })
  }
}
