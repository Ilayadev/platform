import { Router } from "@vaadin/router"

export class routerService { 

    outlet !:HTMLElement

    router !:Router

    static _instance :routerService

    initialize = (outlet:HTMLElement,routes:any[])=>{
        this.outlet = outlet
        this.router = new Router(this.outlet)
        this.router.setRoutes(routes)
    }

    public static getInstance(){
        return (routerService._instance = routerService._instance || new routerService());
    }
}