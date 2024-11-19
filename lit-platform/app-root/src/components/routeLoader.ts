import { BeforeEnterObserver, PreventAndRedirectCommands, Router, RouterLocation } from "@vaadin/router";
import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("router-loader")
export class routeLoader extends LitElement{

    static styles?: CSSResultGroup = css`        
    `;

    @property({type:Boolean})
    isOutlet :boolean = false

    protected createRenderRoot(): Element | ShadowRoot {
        return this
    }

    protected render(): unknown {
        return html`
            
            ${this.isOutlet ? 
                html`<div class="outlet"></div>`:
                html`<slot></slot>`
            }            
            
        `
    }
    
}

@customElement("my-home")
export class Home extends LitElement {
    render() {
      return html`
        <div>
          <h1>Home</h1>
        </div>
      `;
    }
  }

  @customElement("my-project")
  export class Project extends LitElement {
    render() {
      return html`
        <div style="display: flex; gap: 30px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a style="display: block;" href="/project/proj-1/information">Information</a>
            <a style="display: block;" href="/project/proj-2/hostnames">Hostnames</a>
          </div>
          <router-loader></router-loader>
        </div>
      `;
    }
  }
  
  @customElement("my-organization")
  export class ProjectInformation extends LitElement {
    render() {
      return html`
        <div>
          <h1>Project Information</h1>
        </div>
      `;
    }
  }