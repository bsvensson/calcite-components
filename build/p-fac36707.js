/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{q as t,c as n}from"./p-4eb627ad.js";const e="calciteInternalLabelClick",c="calciteInternalLabelConnected",o="calciteInternaLabelDisconnected",s="calcite-label",i=new WeakMap,a=new WeakMap,u=new WeakMap,r=new Set;function l(l){const f=(e=>{const{id:c}=e,o=c&&t(e,{selector:`${s}[for="${c}"]`});if(o)return o;const i=n(e,s);return!i||function(t,n){let e;const c="custom-element-ancestor-check",o=c=>{c.stopImmediatePropagation();const o=c.composedPath();e=o.slice(o.indexOf(n),o.indexOf(t))};return t.addEventListener(c,o,{once:!0}),n.dispatchEvent(new CustomEvent(c,{composed:!0,bubbles:!0})),t.removeEventListener(c,o),e.filter((e=>e!==n&&e!==t)).filter((t=>t.tagName?.includes("-"))).length>0}(i,e)?null:i})(l.el);if(i.has(f)||!f&&r.has(l))return;const d=b.bind(l);if(f){l.labelEl=f;const t=m.bind(l);i.set(l.labelEl,t),l.labelEl.addEventListener(e,t),r.delete(l),document.removeEventListener(c,a.get(l)),u.set(l,d),document.addEventListener(o,d)}else r.has(l)||(d(),document.removeEventListener(o,u.get(l)))}function f(t){if(r.delete(t),document.removeEventListener(c,a.get(t)),document.removeEventListener(o,u.get(t)),a.delete(t),u.delete(t),!t.labelEl)return;const n=i.get(t.labelEl);t.labelEl.removeEventListener(e,n),i.delete(t.labelEl)}function d(t){return t.label||t.labelEl?.textContent?.trim()||""}function m(t){this.disabled||this.el.contains(t.detail.sourceEvent.target)||this.onLabelClick(t)}function h(){r.has(this)&&l(this)}function b(){r.add(this);const t=a.get(this)||h.bind(this);a.set(this,t),document.addEventListener(c,t)}export{o as a,l as c,f as d,d as g,c as l}