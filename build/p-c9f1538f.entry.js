/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{r as t,c as e,h as i,H as n,g as o}from"./p-6012429e.js";import{f as a,v as c,w as s,g as r,s as l,b as d,t as h,x as m}from"./p-4eb627ad.js";import{c as u,d as p}from"./p-f6df55ed.js";import{u as f}from"./p-fe096fb9.js";import{o as b}from"./p-cc9b81e9.js";import{C as v}from"./p-8dd480dc.js";import"./p-a2ccabc4.js";import"./p-24f78b05.js";function g(t,e){const i="down"===e?"nextElementSibling":"previousElementSibling";let n=t,o=null;for(;n?.matches("calcite-tree-item");){if(!n.disabled){o=n;break}n=n[i]}return o}const k=class{constructor(i){t(this,i),this.calciteTreeSelect=e(this,"calciteTreeSelect",6),this.lines=!1,this.child=void 0,this.scale="m",this.selectionMode="single",this.selectedItems=[]}componentWillRender(){const t=this.el.parentElement?.closest("calcite-tree");this.lines=t?t.lines:this.lines,this.scale=t?t.scale:this.scale,this.selectionMode=t?t.selectionMode:this.selectionMode,this.child=!!t}render(){return i(n,{"aria-multiselectable":this.child?void 0:("multiple"===this.selectionMode||"multichildren"===this.selectionMode).toString(),role:this.child?void 0:"tree",tabIndex:this.getRootTabIndex()},i("slot",null))}onFocus(){if(!this.child){const t=this.el.querySelector("calcite-tree-item[selected]:not([disabled])")||this.el.querySelector("calcite-tree-item:not([disabled])");a(t)}}onFocusIn(t){(t.relatedTarget===this.el||!this.el.contains(t.relatedTarget))&&this.el.removeAttribute("tabindex")}onFocusOut(t){!this.el.contains(t.relatedTarget)&&(this.el.tabIndex=this.getRootTabIndex())}onClick(t){const e=t.target,i=c(e.querySelectorAll("calcite-tree-item"));if(this.child)return;if(this.child||(t.preventDefault(),t.stopPropagation()),"ancestors"===this.selectionMode&&!this.child)return void this.updateAncestorTree(t);const n="none"===this.selectionMode,o=!n&&t.detail.modifyCurrentSelection&&("multiple"===this.selectionMode||"multichildren"===this.selectionMode),a="multichildren"===this.selectionMode||"children"===this.selectionMode,s=!o&&(("single"===this.selectionMode||"multiple"===this.selectionMode)&&i.length<=0||"children"===this.selectionMode||"multichildren"===this.selectionMode),r="children"===this.selectionMode||"multichildren"===this.selectionMode;if(!this.child){const l=[];null!==this.selectionMode&&(!e.hasChildren||e.hasChildren&&("children"===this.selectionMode||"multichildren"===this.selectionMode))&&l.push(e),a&&i.forEach((t=>{l.push(t)})),s&&c(this.el.querySelectorAll("calcite-tree-item[selected]")).forEach((t=>{l.includes(t)||(t.selected=!1)})),r&&!t.detail.forceToggle&&(e.expanded=!0),o&&window.getSelection().removeAllRanges(),o&&e.selected||a&&t.detail.forceToggle?l.forEach((t=>{t.disabled||(t.selected=!1)})):n||l.forEach((t=>{t.disabled||(t.selected=!0)}))}this.selectedItems=n?[e]:c(this.el.querySelectorAll("calcite-tree-item")).filter((t=>t.selected)),this.calciteTreeSelect.emit(),t.stopPropagation()}keyDownHandler(t){const e=this.el.closest("calcite-tree:not([child])"),i=t.target;if(e===this.el&&"CALCITE-TREE-ITEM"===i.tagName&&this.el.contains(i))if("ArrowDown"!==t.key){if("ArrowUp"===t.key){const e=g(i.previousElementSibling,"up");e&&(e.focus(),t.preventDefault())}if("ArrowLeft"===t.key&&!i.disabled){if(i.hasChildren&&i.expanded)return i.expanded=!1,void t.preventDefault();const e=i.parentElement.closest("calcite-tree-item");return!e||i.hasChildren&&!1!==i.expanded?void 0:(e.focus(),void t.preventDefault())}"ArrowRight"!==t.key||i.disabled||i.hasChildren&&(i.expanded&&s(this.el).activeElement===i?(g(i.querySelector("calcite-tree-item"),"down")?.focus(),t.preventDefault()):(i.expanded=!0,t.preventDefault()))}else{const e=g(i.nextElementSibling,"down");e&&(e.focus(),t.preventDefault())}}updateAncestorTree(t){const e=t.target;if(e.disabled)return;const i=[];let n=e.parentElement.closest("calcite-tree-item");for(;n;)i.push(n),n=n.parentElement.closest("calcite-tree-item");const o=Array.from(e.querySelectorAll("calcite-tree-item:not([disabled])")),a=o.filter((t=>!t.hasChildren)),s=o.filter((t=>t.hasChildren)),r=e.hasChildren?!(e.selected||e.indeterminate):!e.selected;function l(t,e){const i=t.filter((t=>t.selected)),n=t.filter((t=>!t.selected));e.selected=i.length===t.length,e.indeterminate=i.length>0&&n.length>0}a.forEach((t=>{t.selected=r,t.indeterminate=!1})),s.forEach((t=>{l(Array.from(t.querySelectorAll(":scope > calcite-tree > calcite-tree-item")),t)})),e.hasChildren?l(o,e):(e.selected=r,e.indeterminate=!1),i.forEach((t=>{const e=c(t.querySelectorAll("calcite-tree-item")),i=e.filter((t=>t.selected));if(0===i.length)return t.selected=!1,void(t.indeterminate=!1);const n=i.length<e.length;t.indeterminate=n,t.selected=!n})),this.selectedItems=c(this.el.querySelectorAll("calcite-tree-item")).filter((t=>t.selected)),this.calciteTreeSelect.emit()}getRootTabIndex(){return this.child?-1:0}get el(){return o(this)}};k.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{display:block}:host(:focus){outline:2px solid transparent;outline-offset:2px}";const x="children",y="bullet-point",w="check",z=class{constructor(i){t(this,i),this.calciteInternalTreeItemSelect=e(this,"calciteInternalTreeItemSelect",6),this.openTransitionProp="opacity",this.transitionProp="expanded",this.iconClickHandler=t=>{t.stopPropagation(),this.expanded=!this.expanded},this.childrenClickHandler=t=>t.stopPropagation(),this.updateParentIsExpanded=(t,e)=>{r(t,x,{all:!0,selector:"calcite-tree-item"}).forEach((t=>t.parentExpanded=e))},this.updateAncestorTree=()=>{if(this.selected&&"ancestors"===this.selectionMode){const t=[];let e=this.parentTreeItem;for(;e;)t.push(e),e=e.parentElement?.closest("calcite-tree-item");t.forEach((t=>t.indeterminate=!0))}},this.actionsEndSlotChangeHandler=t=>{this.hasEndActions=l(t)},this.disabled=!1,this.expanded=!1,this.iconFlipRtl=void 0,this.iconStart=void 0,this.selected=!1,this.parentExpanded=!1,this.depth=-1,this.hasChildren=null,this.lines=void 0,this.scale=void 0,this.indeterminate=void 0,this.selectionMode=void 0,this.updateAfterInitialRender=!1,this.hasEndActions=!1}expandedHandler(t){this.updateParentIsExpanded(this.el,t),b(this,!0)}getselectionMode(){this.isSelectionMultiLike="multiple"===this.selectionMode||"multichildren"===this.selectionMode}onBeforeOpen(){this.transitionEl.style.transform="scaleY(1)"}onOpen(){this.transitionEl.style.transform="none"}onBeforeClose(){}onClose(){this.transitionEl.style.transform="scaleY(0)"}connectedCallback(){if(this.parentTreeItem=this.el.parentElement?.closest("calcite-tree-item"),this.parentTreeItem){const{expanded:t}=this.parentTreeItem;this.updateParentIsExpanded(this.parentTreeItem,t)}u(this)}disconnectedCallback(){p(this)}componentWillRender(){this.hasChildren=!!this.el.querySelector("calcite-tree"),this.depth=0;let t,e=this.el.closest("calcite-tree");if(e)for(this.selectionMode=e.selectionMode,this.scale=e.scale||"m",this.lines=e.lines;e&&(t=e.parentElement?.closest("calcite-tree"),t!==e);)e=t,this.depth=this.depth+1}componentWillLoad(){this.expanded&&b(this,!0),requestAnimationFrame((()=>this.updateAfterInitialRender=!0))}componentDidLoad(){this.updateAncestorTree()}componentDidRender(){f(this,(()=>this.parentExpanded||1===this.depth))}render(){const t="rtl"===d(this.el),e="single"===this.selectionMode||"children"===this.selectionMode,o="multiple"===this.selectionMode||"multichildren"===this.selectionMode,a="none"===this.selectionMode&&!this.hasChildren,c=this.hasChildren?i("calcite-icon",{class:{chevron:!0,[v.rtl]:t},"data-test-id":"icon",icon:"chevron-right",onClick:this.iconClickHandler,scale:"l"===this.scale?"m":"s"}):null,s=i("slot",{key:"default-slot"}),r="ancestors"===this.selectionMode?i("label",{class:"checkbox-label",key:"checkbox-label"},i("calcite-checkbox",{checked:this.selected,class:"checkbox","data-test-id":"checkbox",indeterminate:this.hasChildren&&this.indeterminate,scale:this.scale,tabIndex:-1}),s):null,l=e?y:o?w:a?"blank":null,m=l?i("calcite-icon",{class:{"bullet-point":l===y,checkmark:l===w,[v.rtl]:t},icon:l,scale:"l"===this.scale?"m":"s"}):null,u=!(this.parentExpanded||1===this.depth),p=this.updateAfterInitialRender&&this.expanded,{hasEndActions:f}=this,b=i("slot",{key:"actionsEndSlot",name:"actions-end",onSlotchange:this.actionsEndSlotChangeHandler}),g=i("calcite-icon",{class:"icon-start",flipRtl:"start"===this.iconFlipRtl||"both"===this.iconFlipRtl,icon:this.iconStart,scale:"l"===this.scale?"m":"s"});return i(n,{"aria-expanded":this.hasChildren?h(p):void 0,"aria-hidden":h(u),"aria-selected":this.selected?"true":o?"false":void 0,"calcite-hydrated-hidden":u,role:"treeitem"},i("div",{class:{"item--expanded":p}},i("div",{class:"node-actions-container"},i("div",{class:{"node-container":!0,[v.rtl]:t},"data-selection-mode":this.selectionMode,ref:t=>this.defaultSlotWrapper=t},c,m,this.iconStart?g:null,r||s),i("div",{class:"actions-end",hidden:!f},b)),i("div",{class:{"children-container":!0,[v.rtl]:t},"data-test-id":"calcite-tree-children",onClick:this.childrenClickHandler,role:this.hasChildren?"group":void 0,ref:t=>this.setTransitionEl(t)},i("slot",{name:x}))))}setTransitionEl(t){this.transitionEl=t}onClick(t){const[e]=m(this.el,"a");e&&"a"!==t.composedPath()[0].tagName.toLowerCase()&&window.open(e.href,""===e.target?"_self":e.target),this.calciteInternalTreeItemSelect.emit({modifyCurrentSelection:"ancestors"===this.selectionMode||this.isSelectionMultiLike,forceToggle:!1})}keyDownHandler(t){let e;switch(t.key){case" ":if("none"===this.selectionMode)return;this.calciteInternalTreeItemSelect.emit({modifyCurrentSelection:this.isSelectionMultiLike,forceToggle:!1}),t.preventDefault();break;case"Enter":if("none"===this.selectionMode)return;const i=c(this.el.children).find((t=>t.matches("a")));i?(i.click(),this.selected=!0):this.calciteInternalTreeItemSelect.emit({modifyCurrentSelection:this.isSelectionMultiLike,forceToggle:!1}),t.preventDefault();break;case"Home":e=this.el.closest("calcite-tree:not([child])"),e.querySelector("calcite-tree-item")?.focus();break;case"End":e=this.el.closest("calcite-tree:not([child])");let n=e.children[e.children.length-1],o=c(n.children).find((t=>t.matches("calcite-tree")));for(;o;)n=o.children[e.children.length-1],o=c(n.children).find((t=>t.matches("calcite-tree")));n?.focus()}}get el(){return o(this)}static get watchers(){return{expanded:["expandedHandler"],selectionMode:["getselectionMode"]}}};z.style='@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block;max-inline-size:100%;cursor:pointer;color:var(--calcite-ui-text-3)}[hidden]{display:none}.node-actions-container{display:flex;justify-content:space-between}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .node-actions-container{min-block-size:1.5rem}:host([scale=s]) .node-actions-container .node-container .checkbox,:host([scale=s]) .node-actions-container .node-container .chevron,:host([scale=s]) .node-actions-container .node-container .checkmark,:host([scale=s]) .node-actions-container .node-container .bullet-point{margin-inline:0.25rem}:host([scale=s]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .node-actions-container{min-block-size:2rem}:host([scale=m]) .node-actions-container .node-container .checkbox,:host([scale=m]) .node-actions-container .node-container .chevron,:host([scale=m]) .node-actions-container .node-container .checkmark,:host([scale=m]) .node-actions-container .node-container .bullet-point{margin-inline:0.5rem}:host([scale=m]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .node-actions-container{min-block-size:2.75rem}:host([scale=l]) .node-actions-container .node-container .checkbox,:host([scale=l]) .node-actions-container .node-container .chevron,:host([scale=l]) .node-actions-container .node-container .checkmark,:host([scale=l]) .node-actions-container .node-container .bullet-point{margin-inline:0.75rem}:host([scale=l]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([lines]) .children-container:after{position:absolute;inset-block-start:0px;z-index:1;inline-size:1px;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;block-size:96%;content:"";background-color:var(--calcite-ui-border-2)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){inline-size:100%;text-decoration-line:none}:host{outline-color:transparent}:host:focus,:host:active{outline:2px solid transparent;outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host(:focus:not([disabled])){outline:2px solid transparent;outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.actions-end{display:flex;flex-direction:row;align-items:center;align-self:stretch}.checkbox{line-height:0}.checkbox-label{pointer-events:none;display:flex;align-items:center}.checkbox:focus{outline:2px solid transparent;outline-offset:2px}.children-container{position:relative;block-size:0px;overflow:hidden;margin-inline-start:1.25rem;transform:scaleY(0);opacity:0;transition:var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out;transform-origin:top}.item--expanded>.children-container{overflow:visible;opacity:1;block-size:auto}.node-container{position:relative;display:flex;min-inline-size:0px;align-items:center}.node-container .checkmark,.node-container .bullet-point{opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:var(--calcite-ui-border-1)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus:not([disabled])) .node-container .checkmark,:host(:focus:not([disabled])) .node-container .bullet-point{opacity:1}:host([selected]) .node-container,:host([selected]) .node-container:hover{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([selected]) .node-container .bullet-point,:host([selected]) .node-container .checkmark,:host([selected]) .node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark{opacity:1;color:var(--calcite-ui-brand)}:host([selection-mode=none]:not([has-children])):host([scale=s]) .node-container{padding-inline-start:0.5rem}:host([selection-mode=none]:not([has-children])):host([scale=m]) .node-container{padding-inline-start:1rem}:host([selection-mode=none]:not([has-children])):host([scale=l]) .node-container{padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=s]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.25rem}:host(:not([has-children])):host([scale=m]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=l]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.75rem}:host([has-children]) .node-container[data-selection-mode=ancestors] .checkbox{margin-inline-start:0}:host([has-children]) .node-container .bullet-point,:host([has-children]) .node-container .checkmark{display:none}:host([has-children][expanded]:not([selected]):not([selection-mode=none])) .node-container ::slotted(*){font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([has-children][selected]) .node-container[data-selection-mode=children],:host([has-children][selected]) .node-container[data-selection-mode=multichildren]{color:var(--calcite-ui-brand)}.chevron{position:relative;align-self:center;color:var(--calcite-ui-text-3);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;flex:0 0 auto;transform:rotate(0deg)}.calcite--rtl .chevron{transform:rotate(180deg)}.item--expanded .node-container>.chevron{transform:rotate(90deg)}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-ui-brand)}';export{k as calcite_tree,z as calcite_tree_item}