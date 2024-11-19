import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationStart,NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, RoutesRecognized } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteLoaderService {

  previousLoaderRoute !:number

  currentRoute !:number

  routeCount : number  =0  

  loaderEnabled :boolean = false

  increaseCount = ()=>{
    this.routeCount++
    return this.routeCount
  }

  decreaseCount = (value:number)=>{
    this.routeCount = value-1
  }

}
