import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("user-component")
export class userComponent extends LitElement{
    protected render(): unknown {
        return html`
            <style>
                :host{
                    width:100%;
                    height:100%;
                    display:flex
                }
                .container{
                  flex-grow:1;
                  overflow-y:auto
                }
            </style>
            <div class="container">
                <slot></slot>
            </div>
        `
    }
}