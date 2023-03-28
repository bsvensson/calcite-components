/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{r as i,h as a,g as t}from"./p-6012429e.js";import{e}from"./p-4eb627ad.js";import{h as n,i as r}from"./p-72a0bc37.js";import"./p-a2ccabc4.js";import"./p-8dd480dc.js";const c=class{constructor(a){i(this,a),this.scale="m",this.thumbnail=void 0,this.fullName=void 0,this.username=void 0,this.userId=void 0,this.thumbnailFailedToLoad=!1}render(){return this.determineContent()}determineContent(){if(this.thumbnail&&!this.thumbnailFailedToLoad)return a("img",{alt:"",class:"thumbnail",onError:()=>this.thumbnailFailedToLoad=!0,src:this.thumbnail});const i=this.generateInitials(),t=this.generateFillColor();return a("span",{class:"background",style:{backgroundColor:t}},i?a("span",{"aria-hidden":"true",class:"initials"},i):a("calcite-icon",{class:"icon",icon:"user",scale:this.scale}))}generateFillColor(){const{userId:i,username:a,fullName:t,el:c}=this,o=e(c),s=i&&`#${i.substr(i.length-6)}`,l=a||t||"",m=s&&r(s)?s:function(i){let a=0;for(let t=0;t<i.length;t++)a=i.charCodeAt(t)+((a<<5)-a);let t="#";for(let i=0;i<3;i++)t+=("00"+(a>>8*i&255).toString(16)).substr(-2);return t}(l);return(i||l)&&r(m)?`hsl(${function(i){return function(i){let{r:a,g:t,b:e}=i;a/=255,t/=255,e/=255;const n=Math.max(a,t,e),r=Math.min(a,t,e),c=n-r;if(n===r)return 0;let o=(n+r)/2;switch(n){case a:o=(t-e)/c+(t<e?6:0);break;case t:o=(e-a)/c+2;break;case e:o=(a-t)/c+4}return Math.round(60*o)}(n(i))}(m)}, 60%, ${"dark"===o?20:90}%)`:"var(--calcite-ui-foreground-2)"}generateInitials(){const{fullName:i,username:a}=this;return i?i.trim().split(" ").map((i=>i.substring(0,1))).join(""):!!a&&a.substring(0,2)}get el(){return t(this)}};c.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{display:inline-block;overflow:hidden;border-radius:50%}:host([scale=s]){block-size:1.5rem;inline-size:1.5rem;font-size:var(--calcite-font-size--3)}:host([scale=m]){block-size:2rem;inline-size:2rem;font-size:var(--calcite-font-size--2)}:host([scale=l]){block-size:2.75rem;inline-size:2.75rem;font-size:var(--calcite-font-size-0)}.icon{display:flex}.background{display:flex;block-size:100%;inline-size:100%;align-items:center;justify-content:center;border-radius:50%}.initials{font-weight:var(--calcite-font-weight-bold);text-transform:uppercase;color:var(--calcite-ui-text-2)}.thumbnail{block-size:100%;inline-size:100%;border-radius:50%}";export{c as calcite_avatar}