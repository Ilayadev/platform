import { ChildPart, Part, html, noChange, nothing } from "lit";
import {PartInfo, directive} from 'lit/directive.js';
import { AsyncDirective } from 'lit/async-directive.js';
import { ItemTemplate, repeat } from 'lit/directives/repeat.js';

export interface virtualScrollConfig{
    items:any[],
    renderItem:ItemTemplate<any>,
    itemSize?:number
}

export class VirtualScroll extends AsyncDirective{
    
    public initialized : boolean = false

    public _scrollableElement !: HTMLElement

    public _hostElement !: HTMLElement

    public hostIsComponent : boolean = false

    public clientHeight !: number;

    public scrolltop !: number;

    public viewPortCount !: number;

    public itemSize : number = 50

    public nodePadding : number = 1

    public startNode : number = 0

    public endNode !: number;

    public itemCount !: number;

    public offsetY !: number;

    public items : any[] = []

    public configuration !: virtualScrollConfig    

    public keyFuntion !:any

    public renderItem !:CallableFunction

    constructor(part:PartInfo){
        super(part)        
        this.keyFuntion=(item:any, index:any) => index;
    }
    
    render(config:virtualScrollConfig): unknown {      
       return this.creatVIEW()
    }

    update(_part: ChildPart, [config]:virtualScrollConfig[]): unknown {
        
        if(!this.initialized){
            this.directiveInitialize(_part)
            this.configuration=config
            this.items = config.items
            this.itemCount = this.items.length
            this.itemSize = config.itemSize || 50
            this.renderItem = config.renderItem            
        }
                
        return noChange
    }  
    
    directiveInitialize =(part:ChildPart)=>{
        this.initialized=true
        this._hostElement = part.parentNode as HTMLElement
        this._hostElement.style.position="relative"
        setTimeout(() => {
            this._scrollableElement=this.getScrollElement(this._hostElement)
            this.getDOMData()
            this.getViewPortCount()
            this._scrollableElement.addEventListener("scroll", this.elementScroll,{passive:true})
            this.calculateCurrentNode()       
            this.addStyleToScrollable()
            this.creatBottomElement()
        }, );
    }
    
    getScrollElement=(element:HTMLElement) : any=>{
          
        if(element.tagName === "BODY")  return this._hostElement
        
        if (this.isComponent(element)) {
            let x = this._bdsElementSearch(element)
            console.log(x)
            if(x){
                return x
            }else{
                let parentElement = this.getParentElement(element)
                return this.getScrollElement(parentElement as HTMLElement)
            }
        } else {

            let scrollable = this.canScrollable(element)
            if (scrollable) {                
                return element
            } else {                
                let parentElement = this.getParentElement(element)
                return this.getScrollElement(parentElement as HTMLElement)
            }
        }        

    }

    getParentElement=(element:HTMLElement)=>{

        if(element.parentElement){
            return element.parentElement
        }
        let parentNode=element.parentNode
        if(parentNode && parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE){
            //@ts-ignore
            return parentNode.host || null
        }
        return null
    }

    isComponent = (element:HTMLElement)=>{
       return element.shadowRoot ? true : false
    }

    _bdsElementSearch = (element:HTMLElement)=>{        
        let queue = [element.shadowRoot?.lastElementChild]
        let returnValue :any = false
        while(queue.length>0){

            let currentelement=queue.shift() as HTMLElement
            if(!this.isComponent(currentelement) ){
                if(this.canScrollable(currentelement)){
                    returnValue = currentelement
                    break
                }else{
                    let children = Array.from(currentelement.children)
                    children.forEach((element:any) => {
                        queue.push(element)
                    });
                }                
            }
            
        }
        return returnValue
    }

    canScrollable = (element:HTMLElement)=>{

        let computedStyle = window.getComputedStyle(element)        
        return computedStyle.overflowY === "auto" || computedStyle.overflowY === "scroll"
    }

    getDOMData = () => {
        this.clientHeight = this._scrollableElement?.offsetHeight as number        
        this.scrolltop = this._scrollableElement?.scrollTop as number
    }

    getViewPortCount = () => {
        this.viewPortCount = Math.ceil(this.clientHeight / this.itemSize) + (2 * this.nodePadding)
    }

    elementScroll = (event: any) => {
        this.scrolltop = event.target.scrollTop
        this.calculateCurrentNode()
    }

    calculateCurrentNode = () => {
        
        let node = Math.floor(this.scrolltop / this.itemSize) - this.nodePadding;
        this.startNode = Math.max(0, node);
        this.endNode = this.startNode + Math.min((this.itemCount - this.startNode), this.viewPortCount)
        let position = this.startNode * this.itemSize        
        if (position !== this.offsetY) {
          this.offsetY = position          
          this.setValue(this.render(this.configuration))
          this.setOffsetForChildren()
        }
    }

    creatVIEW = () => {

        let slicedItems = this.items.slice(this.startNode, this.endNode);
        return html`
            ${repeat(slicedItems,this.keyFuntion,(item,index)=>{
               
                return this.renderItem(item,index+this.startNode)
            })}
        `        
    }

    addStyleToScrollable = ()=>{
        this._scrollableElement.style.position = "relative"
    }

    creatBottomElement = ()=>{
        let ele = document.createElement("div");
        ele.setAttribute("bottom-element","")
        ele.textContent="VS"
        ele.style.visibility="hidden"
        ele.style.position = "absolute"
        ele.style.marginTop="-2px"
        ele.style.width="100%"        
        ele.style.transform = `translate(${0}px, ${(this.itemCount*this.itemSize)}px)`;
        ele.style.fontSize="2px"
        ele.style.top="0px"
        this._scrollableElement.appendChild(ele)
    }

    get _children() {
        const arr = [];
        let next = this._hostElement.firstElementChild;
        while (next) {
            if (!next.hasAttribute("bottom-element")) {
                arr.push(next);
            }
            next = next.nextElementSibling;
        }
        return arr;
    }

    setOffsetForChildren = ()=>{
        this._children.forEach((x,index)=>{
            let y = x as HTMLElement
            y.style.position = 'absolute';
            y.style.top="0px"
            y.style.transform = `translate(${0}px, ${(this.startNode*this.itemSize)+(index*this.itemSize)}px)`;
        })
    }
    
}

export const virtualScroll = directive(VirtualScroll)