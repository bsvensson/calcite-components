/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{r as a,c as t,h as i,g as e}from"./p-6012429e.js";import{t as n}from"./p-4eb627ad.js";import{s as c,a as o,c as r}from"./p-48fb9a71.js";import{c as s,d as l}from"./p-41991c90.js";import{c as d,s as m,d as h,u as p}from"./p-087f7b65.js";import"./p-a2ccabc4.js";import"./p-8dd480dc.js";import"./p-9981817e.js";import"./p-24f78b05.js";const f=class{constructor(i){a(this,i),this.calciteHandleNudge=t(this,"calciteHandleNudge",6),this.handleKeyDown=a=>{switch(a.key){case" ":this.activated=!this.activated,a.preventDefault();break;case"ArrowUp":if(!this.activated)return;a.preventDefault(),this.calciteHandleNudge.emit({direction:"up"});break;case"ArrowDown":if(!this.activated)return;a.preventDefault(),this.calciteHandleNudge.emit({direction:"down"})}},this.handleBlur=()=>{this.activated=!1},this.activated=!1,this.dragHandle=void 0,this.messages=void 0,this.messageOverrides=void 0,this.effectiveLocale=void 0,this.defaultMessages=void 0}onMessagesChange(){}connectedCallback(){d(this),s(this)}async componentWillLoad(){c(this),await m(this)}componentDidLoad(){o(this)}disconnectedCallback(){h(this),l(this)}effectiveLocaleChange(){p(this,this.effectiveLocale)}async setFocus(){await r(this),this.handleButton?.focus()}render(){return i("span",{"aria-pressed":n(this.activated),class:{handle:!0,"handle--activated":this.activated},onBlur:this.handleBlur,onKeyDown:this.handleKeyDown,role:"button",tabindex:"0",title:this.messages.dragHandle,ref:a=>{this.handleButton=a}},i("calcite-icon",{icon:"drag",scale:"s"}))}static get assetsDirs(){return["assets"]}get el(){return e(this)}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}};f.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{display:flex}.handle{display:flex;cursor:move;align-items:center;justify-content:center;align-self:stretch;border-style:none;background-color:transparent;outline-color:transparent;color:var(--calcite-ui-border-input);padding-block:0.75rem;padding-inline:0.25rem;line-height:0}.handle:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.handle:focus{color:var(--calcite-ui-text-1);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.handle--activated{background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-1)}.handle calcite-icon{color:inherit}";export{f as calcite_handle}