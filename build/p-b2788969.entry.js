/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{r as t,c as i,h as e,H as s,g as a}from"./p-6012429e.js";import{g as n,d as o,h as r,b as l}from"./p-4eb627ad.js";import{s as c,c as h,d,H as u}from"./p-3785eef6.js";import{u as p}from"./p-fe096fb9.js";import{c as m,d as b,g as f}from"./p-fac36707.js";import{s as v,a as g,c as x}from"./p-48fb9a71.js";import{c as y,d as k}from"./p-41991c90.js";import{c as w}from"./p-24f78b05.js";import{C as z}from"./p-8dd480dc.js";import{u as I,c as C,d as j,s as D}from"./p-087f7b65.js";import"./p-a2ccabc4.js";import"./p-9981817e.js";const _=class{constructor(e){t(this,e),this.calciteInternalInputTextFocus=i(this,"calciteInternalInputTextFocus",7),this.calciteInternalInputTextBlur=i(this,"calciteInternalInputTextBlur",7),this.calciteInputTextInput=i(this,"calciteInputTextInput",7),this.calciteInputTextChange=i(this,"calciteInputTextChange",7),this.previousValueOrigin="initial",this.mutationObserver=w("mutation",(()=>this.setDisabledAction())),this.userChangedValue=!1,this.keyDownHandler=t=>{this.readOnly||this.disabled||(this.isClearable&&"Escape"===t.key&&(this.clearInputTextValue(t),t.preventDefault()),"Enter"!==t.key||t.defaultPrevented||c(this)&&t.preventDefault())},this.clearInputTextValue=t=>{this.setValue({committing:!0,nativeEvent:t,origin:"user",value:""})},this.emitChangeIfUserModified=()=>{"user"===this.previousValueOrigin&&this.value!==this.previousEmittedValue&&(this.calciteInputTextChange.emit(),this.setPreviousEmittedValue(this.value))},this.inputTextBlurHandler=()=>{this.calciteInternalInputTextBlur.emit({element:this.childEl,value:this.value}),this.emitChangeIfUserModified()},this.clickHandler=t=>{const i=n(this.el,"action");t.target!==i&&this.setFocus()},this.inputTextFocusHandler=()=>{this.calciteInternalInputTextFocus.emit({element:this.childEl,value:this.value})},this.inputTextInputHandler=t=>{this.disabled||this.readOnly||this.setValue({nativeEvent:t,origin:"user",value:t.target.value})},this.inputTextKeyDownHandler=t=>{this.disabled||this.readOnly||"Enter"===t.key&&this.emitChangeIfUserModified()},this.hiddenInputChangeHandler=t=>{t.target.name===this.name&&this.setValue({value:t.target.value,origin:"direct"}),t.stopPropagation()},this.setChildElRef=t=>{this.childEl=t},this.setInputValue=t=>{this.childEl&&(this.childEl.value=t)},this.setPreviousEmittedValue=t=>{this.previousEmittedValue=t},this.setPreviousValue=t=>{this.previousValue=t},this.setValue=({committing:t=!1,nativeEvent:i,origin:e,previousValue:s,value:a})=>{this.setPreviousValue(s??this.value),this.previousValueOrigin=e,this.userChangedValue="user"===e&&a!==this.value,this.value=a,"direct"===e&&(this.setInputValue(a),this.setPreviousEmittedValue(a)),i&&(this.calciteInputTextInput.emit().defaultPrevented?this.value=this.previousValue:t&&this.emitChangeIfUserModified())},this.alignment="start",this.autofocus=!1,this.clearable=!1,this.disabled=!1,this.form=void 0,this.hidden=!1,this.icon=void 0,this.iconFlipRtl=!1,this.label=void 0,this.loading=!1,this.maxLength=void 0,this.minLength=void 0,this.name=void 0,this.placeholder=void 0,this.prefixText=void 0,this.readOnly=!1,this.required=!1,this.scale="m",this.status="idle",this.autocomplete=void 0,this.inputMode="text",this.enterKeyHint=void 0,this.pattern=void 0,this.suffixText=void 0,this.editingEnabled=!1,this.value="",this.messages=void 0,this.messageOverrides=void 0,this.effectiveLocale=void 0,this.defaultMessages=void 0,this.slottedActionElDisabledInternally=!1}disabledWatcher(){this.setDisabledAction()}onMessagesChange(){}valueWatcher(t,i){this.userChangedValue||this.setValue({origin:"direct",previousValue:i,value:t||""}),this.userChangedValue=!1}updateRequestedIcon(){this.requestedIcon=o({},this.icon,"text")}get isClearable(){return this.clearable&&this.value.length>0}effectiveLocaleChange(){I(this,this.effectiveLocale)}connectedCallback(){y(this),C(this),this.scale=r(this.el,"scale",this.scale),this.inlineEditableEl=this.el.closest("calcite-inline-editable"),this.inlineEditableEl&&(this.editingEnabled=this.inlineEditableEl.editingEnabled||!1),this.setPreviousEmittedValue(this.value),this.setPreviousValue(this.value),m(this),h(this),this.mutationObserver?.observe(this.el,{childList:!0}),this.setDisabledAction(),this.el.addEventListener("calciteInternalHiddenInputChange",this.hiddenInputChangeHandler)}disconnectedCallback(){b(this),d(this),k(this),j(this),this.mutationObserver?.disconnect(),this.el.removeEventListener("calciteInternalHiddenInputChange",this.hiddenInputChangeHandler)}async componentWillLoad(){v(this),this.requestedIcon=o({},this.icon,"text"),await D(this)}componentDidLoad(){g(this)}componentDidRender(){p(this)}async setFocus(){await x(this),this.childEl?.focus()}async selectText(){this.childEl?.select()}onLabelClick(){this.setFocus()}onFormReset(){this.setValue({origin:"reset",value:this.defaultValue})}syncHiddenFormInput(t){null!=this.minLength&&(t.minLength=this.minLength),null!=this.maxLength&&(t.maxLength=this.maxLength)}setDisabledAction(){const t=n(this.el,"action");t&&(this.disabled?(null==t.getAttribute("disabled")&&(this.slottedActionElDisabledInternally=!0),t.setAttribute("disabled","")):this.slottedActionElDisabledInternally&&(t.removeAttribute("disabled"),this.slottedActionElDisabledInternally=!1))}render(){const t=l(this.el),i=e("div",{class:"loader"},e("calcite-progress",{label:this.messages.loading,type:"indeterminate"})),a=e("button",{"aria-label":this.messages.clear,class:"clear-button",disabled:this.disabled||this.readOnly,onClick:this.clearInputTextValue,tabIndex:-1,type:"button"},e("calcite-icon",{icon:"x",scale:"l"===this.scale?"m":"s"})),n=e("calcite-icon",{class:"icon",flipRtl:this.iconFlipRtl,icon:this.requestedIcon,scale:"l"===this.scale?"m":"s"}),o=e("div",{class:"prefix"},this.prefixText),r=e("div",{class:"suffix"},this.suffixText),c=e("input",{"aria-label":f(this),autocomplete:this.autocomplete,autofocus:!!this.autofocus||null,class:{"editing-enabled":this.editingEnabled,"inline-child":!!this.inlineEditableEl},defaultValue:this.defaultValue,disabled:!!this.disabled||null,enterKeyHint:this.enterKeyHint,inputMode:this.inputMode,maxLength:this.maxLength,minLength:this.minLength,name:this.name,onBlur:this.inputTextBlurHandler,onFocus:this.inputTextFocusHandler,onInput:this.inputTextInputHandler,onKeyDown:this.inputTextKeyDownHandler,pattern:this.pattern,placeholder:this.placeholder||"",readOnly:this.readOnly,required:!!this.required||null,tabIndex:this.disabled||this.inlineEditableEl&&!this.editingEnabled?-1:null,type:"text",value:this.value,ref:this.setChildElRef});return e(s,{onClick:this.clickHandler,onKeyDown:this.keyDownHandler},e("div",{class:{wrapper:!0,[z.rtl]:"rtl"===t}},this.prefixText?o:null,e("div",{class:"element-wrapper"},c,this.isClearable?a:null,this.requestedIcon?n:null,this.loading?i:null),e("div",{class:"action-wrapper"},e("slot",{name:"action"})),this.suffixText?r:null,e(u,{component:this})))}static get assetsDirs(){return["assets"]}get el(){return a(this)}static get watchers(){return{disabled:["disabledWatcher"],messageOverrides:["onMessagesChange"],value:["valueWatcher"],icon:["updateRequestedIcon"],effectiveLocale:["effectiveLocaleChange"]}}};_.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .action-wrapper calcite-button,:host([scale=s]) .action-wrapper calcite-button button{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .action-wrapper calcite-button,:host([scale=m]) .action-wrapper calcite-button button{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;padding-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .action-wrapper calcite-button,:host([scale=l]) .action-wrapper calcite-button button{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}input{transition:var(--calcite-animation-timing), block-size 0, outline-offset 0s;-webkit-appearance:none;position:relative;margin:0px;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;border-radius:0px;background-color:var(--calcite-ui-foreground-1);font-family:inherit;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1)}:host input{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);color:var(--calcite-ui-text-1)}:host input::placeholder,:host input:-ms-input-placeholder,:host input::-ms-input-placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}:host input:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}:host input[readonly]{background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium)}:host input[readonly]:focus{color:var(--calcite-ui-text-1)}:host calcite-icon{color:var(--calcite-ui-text-3)}input{outline-color:transparent}input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([status=invalid]) input{border-color:var(--calcite-ui-danger)}:host([status=invalid]) input:focus{outline:2px solid var(--calcite-ui-danger);outline-offset:-2px}:host([scale=s]) .icon{inset-inline-start:0.5rem}:host([scale=m]) .icon{inset-inline-start:0.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center}.icon{pointer-events:none;position:absolute;z-index:1;display:block;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}.clear-button{pointer-events:initial;order:4;margin:0px;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-foreground-1);outline-color:transparent;border-inline-start-width:0px}.clear-button:hover{background-color:var(--calcite-ui-foreground-2);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:hover calcite-icon{color:var(--calcite-ui-text-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.clear-button:active{background-color:var(--calcite-ui-foreground-3)}.clear-button:active calcite-icon{color:var(--calcite-ui-text-1)}.clear-button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.clear-button:disabled{opacity:var(--calcite-ui-opacity-disabled)}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);font-weight:var(--calcite-font-weight-medium);line-height:1;color:var(--calcite-ui-text-2)}.prefix{order:2;border-inline-end-width:0px}.suffix{order:5;border-inline-start-width:0px}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-ui-border-1)}.inline-child{background-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.inline-child .editing-enabled{background-color:inherit}.inline-child:not(.editing-enabled){display:flex;cursor:pointer;border-color:transparent;padding-inline-start:0}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";export{_ as calcite_input_text}