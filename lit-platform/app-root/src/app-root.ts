import { LitElement, html, css, PropertyValueMap } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { routes } from './route';
import { routerService } from './services/routerLoader';
import { BeforeEnterObserver, PreventAndRedirectCommands, Router, RouterLocation } from "@vaadin/router";



const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

@customElement('app-root')
export class AppRoot extends LitElement {
  @property({ type: String }) header = 'My app';

  inst:any

  items:any[] = []

  static styles = css`
    
  `;

  constructor(){
    super()
    // setTimeout(() => {
    //   let outlet = this.shadowRoot?.querySelector("router-loader")?.firstElementChild as HTMLElement
    //   let _routerService = routerService.getInstance();
    //   _routerService.initialize(outlet,routes)
    //   // _routerService.router.setRoutes(routes)
      
    //   _routerService.router.subscribe()
      
    //   //@ts-ignore
    //   _routerService.router.addEventListener("afterEnter",(event:any)=>{
    //     console.log("afterenter",event)
    //   })
      
    //   // console.log(_routerService.router.location)
    //   // window.addEventListener("onBeforeEnter",()=>{
    //   //   console.log("log ")
    //   // })
    // }, );
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
      
  }

  connectedCallback(): void {
      super.connectedCallback()
      // let outlet = this.shadowRoot?.querySelector("router-loader")?.firstElementChild as HTMLElement
      this.inst = new Router(this)
      console.log(this.inst,"instce")
      this.inst.setRoutes(routes)
      this.inst.addEventListener("afterEnter",(event:any)=>{
        console.log(event,"event++-")
      })
      
  }

  async onBeforeEnter(
    location: RouterLocation,
    commands: PreventAndRedirectCommands,
    router: Router) 
  {
    console.log("called++__")
  }

  onAfterEnter(){
    console.log("called in afterenter")
  }

  render() {

    for(let i=0;i<100000;i++){
      this.items.push(i+1)
    }
    
    return html`
      <style>       
    
*{
    padding: 0;
    box-sizing: border-box;
    margin: 0;
}
.container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.header{
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    column-gap: 12px;
}
.link{
    padding: 5px 12px;
    border: 1px solid #dedede;
    border-radius: 2px;
    cursor: pointer;
}
.body{
    padding: 20px;    
    flex-grow: 1;   
    display: flex; 
}
router-loader{
  width:100%
}
.outlet{
  display: grid;
    width: 100%;
    height: 100%;    
    min-width: 100%;
    min-height: 100%;
}


  
      </style>

        <div class="container">
          <div class="header">
              <a class="link" href="/">Home</a>
              <a class="link" href="/project">Project</a>
              <a class="link" href="/organization">Organization</a>
          </div>
          <div class="body">
             <router-loader ?isOutlet=${true}></router-loader>
          </div>
        </div>
    `;
  }
}



// <div class="container">
//         <!-- scroll container -->
//         <div class="scroll-container">
//             <div class="translate">                
//                <user-component>
                 
//                </user-component>

//             </div>
            
//         </div>
//       </div>

// <!-- HTML element -->
// <div class="scroll-container">  
//     ${virtualScroll({
//         items:this.items,
//         renderItem:(item,index) => html`<div class="child">value ${item} index ${index}</div>`
//     })}      
// </div>   


// <!-- USER-component -->
// <user-component>
//   ${virtualScroll({
//     items:this.items,
//     renderItem:(item,index) => html`<div class="child">value ${item} index ${index}</div><div>ilaya</div>`
//   })}
// </user-component>
