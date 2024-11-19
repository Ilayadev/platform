import { Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[virtualScroll][virtualScrollOf]',
  standalone: true
})
export class virtualScroll implements OnInit {

  private _hostElement: any;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
  ) { }

  public isShadowrootComponent: boolean = false

  public items: any[] = []

  public scrollableElement !: HTMLElement

  public scrolltop: number = 0

  public clientHeight: number = 0

  public nodePadding: number = 1

  public viewPortCount !: number

  public itemCount: number = 0

  public startNode: number = 0

  public endNode: number = 0

  public offsetY !: number

  public itemSize: number = 50

  public callback !: any

  private stack: number[] = []

  private viewStore: Map<number, EmbeddedViewRef<any>> = new Map<number, EmbeddedViewRef<any>>()

  @Input()
  set virtualScrollItemSize(value: number) {
    this.itemSize = value
  }
  @Input()
  set virtualScrollOf(inputArray: any) {
    this.items = inputArray
    this.itemCount = this.items.length
  }

  ngOnInit(): void {

    this._hostElement = this.template.elementRef.nativeElement.parentElement
    this.scrollableElement = this.getScrollElement(this._hostElement)
    this._hostElement.style.position="relative"
    this.getDOMData()
    this.getViewPortCount()
    this.scrollableElement?.addEventListener("scroll", this.elementScroll, { passive: true })
    this.calculateCurrentNode()
    this.addStyleToScrollable()
    this.creatBottomElement()
  }

  //creat view of template inside the container

  creatVIEW = () => {

    let slicedItems = this.items.slice(this.startNode, this.endNode);
    
    slicedItems.forEach((item: any, index: number) => {    //view construct and reuse 
      if (!this.stack.includes(index)) {
        let embeddedView = this.container.createEmbeddedView(this.template, {
          $implicit: {
            value:item,
            index: this.startNode + index
          }          
        });
        this.stack.push(index)
        this.viewStore.set(index, embeddedView)
      } else {
        let previous_view = this.viewStore.get(index) as EmbeddedViewRef<any>;
        previous_view.context.$implicit = {
          value:item,
          index :index + this.startNode
        }        
        previous_view.detectChanges()
      }
      let viewElement = this.viewStore.get(index)?.rootNodes as any[]      
      this.setOffsetForChildren(viewElement[viewElement.length-1], index)     

    });

    if (this.stack.length > slicedItems.length) {    //removing unwanted view
      let diff = this.stack.length - slicedItems.length
      let to_remove = this.stack.splice(-diff)
      to_remove.forEach(x => {
        let view = this.viewStore.get(x)
        view?.destroy()
      })
    }
  }

  //find anchestor scrollable element

  getScrollElement = (element: HTMLElement): any => {

    if (element.tagName === "BODY") return this._hostElement

    if (this.isComponent(element)) {
      let x = this._bdsElementSearch(element)
      
      if (x) {
        return x
      } else {
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

  getParentElement = (element: HTMLElement) => {

    if (element.parentElement) {
      return element.parentElement
    }
    let parentNode = element.parentNode
    if (parentNode && parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      //@ts-ignore
      return parentNode.host || null
    }
    return null
  }

  isComponent = (element: HTMLElement) => {
    return element.shadowRoot ? true : false
  }

  _bdsElementSearch = (element: HTMLElement) => {
    let queue = [element.shadowRoot?.lastElementChild]
    let returnValue: any = false
    while (queue.length > 0) {

      let currentelement = queue.shift() as HTMLElement
      if (!this.isComponent(currentelement)) {
        if (this.canScrollable(currentelement)) {
          returnValue = currentelement
          break
        } else {
          let children = Array.from(currentelement.children)
          children.forEach((element: any) => {
            queue.push(element)
          });
        }
      }

    }
    return returnValue
  }

  canScrollable = (element: HTMLElement) => {

    let computedStyle = window.getComputedStyle(element)
    return computedStyle.overflowY === "auto" || computedStyle.overflowY === "scroll"
  }

  //math logic

  calculateCurrentNode = () => {
    let node = Math.floor(this.scrolltop / this.itemSize) - this.nodePadding;
    this.startNode = Math.max(0, node);
    this.endNode = this.startNode + Math.min((this.itemCount - this.startNode), this.viewPortCount)
    let position = this.startNode * this.itemSize

    if (position !== this.offsetY) {
      this.offsetY = position
      this.creatVIEW()
    }
  }

  //get data from scroller

  getDOMData = () => {
    this.clientHeight = this.scrollableElement?.clientHeight as number
    this.scrolltop = this.scrollableElement?.scrollTop as number
  }

  getViewPortCount = () => {
    this.viewPortCount = Math.ceil(this.clientHeight / this.itemSize) + (2 * this.nodePadding)
  }

  //element scroll
  elementScroll = (event: any) => {
    this.scrolltop = event.target.scrollTop
    this.calculateCurrentNode()
  }

  addStyleToScrollable = () => {
    this.scrollableElement.style.position = "relative"
  }

  creatBottomElement = () => {
    let ele = document.createElement("div");
    ele.setAttribute("bottom-element", "")
    ele.textContent = "VS"
    ele.style.visibility = "hidden"
    ele.style.position = "absolute"
    ele.style.marginTop = "-2px"
    ele.style.width = "100%"
    ele.style.transform = `translate(${0}px, ${(this.itemCount * this.itemSize)}px)`;
    ele.style.fontSize = "2px"
    ele.style.top = "0px"
    this.scrollableElement.appendChild(ele)
  }

  setOffsetForChildren = (element: HTMLElement, index: number) => {
    element.style.position = 'absolute';
    element.style.top = "0px"
    element.style.transform = `translate(${0}px, ${(this.startNode * this.itemSize) + (index * this.itemSize)}px)`;
  }

}
