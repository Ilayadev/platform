import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { virtualScroll } from '../../directives/virtual-scroll.directive';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user',  
  imports: [virtualScroll,NgFor,NgStyle,UserListComponent,NgIf],
  standalone:true,
  templateUrl: './user.component.html',  
  styleUrls:['./user.component.css'], 
  encapsulation:ViewEncapsulation.ShadowDom
  
})
export class UserComponent implements OnInit {
  public items :any[]=[]

  height:number=60  

  translate : string = "translateY(0px)"

  ngOnInit(): void {
      for(let i=1;i<=200000;i++){
        this.items.push(i)
      }

      console.log(this.generateDummy(100))
  }

  viewChanged=(data:any)=>{    
    this.translate=`translateY(${data}px)`    
  }

  // statusList = ["paid", "unpaid", "draft", "sent","open"]

  statusList = ["active","completed","inProgress","testing"]

  subject = [
    "A business proposal for a new product or service",
    "A educational proposal for a new course or program",
    "	A event proposal for a conference or workshop",
    "A funding proposal for a non-profit organization",
    "A marketing proposal for a new marketing campaign",
    "A policy proposal for a new government initiative or regulation",
    "A project proposal for a new construction project",
    "	A research proposal for a scientific study",
    "A technology proposal for a new software or hardware solution",
    "An investment proposal for a new venture or start-up"
  ]


  userList = []

  generateDummy = (count:number)=>{

      let list = []

      for(let i=0 ;i<count; i++){

        let name = "Milestone"+(i+1)
        let percentage = Math.ceil(Math.random()*100)
        let user = this.userList[Math.floor(Math.random()* (this.userList.length-1))]
        let status = this.statusList[Math.floor(Math.random()*(this.statusList.length-1))]
        let startDate = this.getRandomDate(new Date(2020, 0, 1), new Date(2022, 0, 1));  
        let endData = this.getRandomDate(new Date(2023, 0, 1),new Date())
        let task =  this.getRandomInt(1,100);
        let bug = this.getRandomInt(task,task*2)

        let obj = {
          name,
          percentage,
          user,
          status,
          startDate,
          endData,
          task:{
            total:task,
            completed:Math.ceil(Math.random()*(task/2))
          },
          bug:{
            total:bug,
            completed:Math.ceil(Math.random()*(bug/2))
          }
        }

        
        // let amount = "$"+this.getRandomInt(100,500)+" USD"        
        // let sub = this.subject[Math.floor(Math.random()* (this.subject.length-1))]        
        // let obj = {
        //   id:"#"+user["id"],
        //   user:user,
        //   subject:sub,
        //   amount:amount,
        //   date:startDate,
        //   status
        // }

        list.push(obj)

      }

      return list
  }

  getRandomDate(start:Date, end:Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
  
}
