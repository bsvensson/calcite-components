/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{r as t,c as i,h as a,H as e,g as s}from"./p-6012429e.js";import{d as n,a as r,i as o,b as c,g as l,c as h,e as p,f as d}from"./p-a5126c51.js";import{t as m}from"./p-4eb627ad.js";import{f as u,c as f,d as g,u as v,r as y,a as b,F as w}from"./p-d2f244df.js";import{s as x,c as k,d as D,H as C}from"./p-3785eef6.js";import{u as I}from"./p-fe096fb9.js";import{n as z}from"./p-9981817e.js";import{c as P,d as A,g as j}from"./p-fac36707.js";import{c as _,s as O,a as R}from"./p-48fb9a71.js";import{n as E,c as S,d as H}from"./p-41991c90.js";import{c as F,d as L}from"./p-cc9b81e9.js";import"./p-a2ccabc4.js";import"./p-8dd480dc.js";import"./p-488815fe.js";import"./p-24f78b05.js";const Y=class{constructor(a){t(this,a),this.calciteInputDatePickerChange=i(this,"calciteInputDatePickerChange",6),this.calciteInputDatePickerBeforeClose=i(this,"calciteInputDatePickerBeforeClose",6),this.calciteInputDatePickerClose=i(this,"calciteInputDatePickerClose",6),this.calciteInputDatePickerBeforeOpen=i(this,"calciteInputDatePickerBeforeOpen",6),this.calciteInputDatePickerOpen=i(this,"calciteInputDatePickerOpen",6),this.calciteInternalInputInputHandler=t=>{const i=t.target,a=i.value,e=this.parseNumerals(a),s=this.formatNumerals(e);i.value=s;const{year:c}=n(a,this.localeData);if(c&&c.length<4)return;const l=r(a,this.localeData);o(l,this.min,this.max)&&(this.datePickerActiveDate=l)},this.calciteInternalInputBlurHandler=()=>{this.commitValue()},this.userChangedValue=!1,this.openTransitionProp="opacity",this.valueAsDateChangedExternally=!1,this.setFilteredPlacements=()=>{const{el:t,flipPlacements:i}=this;this.filteredFlipPlacements=i?u(i,t):null},this.setTransitionEl=t=>{this.transitionEl=t,F(this)},this.setStartInput=t=>{this.startInput=t},this.setEndInput=t=>{this.endInput=t},this.deactivate=()=>{this.open=!1},this.keyDownHandler=t=>{const{defaultPrevented:i,key:a}=t;"Enter"!==a||i?"Escape"!==a||i||(this.open=!1,t.preventDefault()):(this.commitValue(),this.shouldFocusRangeEnd()?this.endInput?.setFocus():this.shouldFocusRangeStart()&&this.startInput?.setFocus(),x(this)&&t.preventDefault())},this.startInputFocus=()=>{this.readOnly||(this.open=!0),this.focusedInput="start"},this.endInputFocus=()=>{this.readOnly||(this.open=!0),this.focusedInput="end"},this.setFloatingEl=t=>{t&&(this.floatingEl=t,f(this,this.referenceEl,this.floatingEl))},this.setStartWrapper=t=>{this.startWrapper=t,this.setReferenceEl()},this.setEndWrapper=t=>{this.endWrapper=t,this.setReferenceEl()},this.handleDateChange=t=>{this.range||(t.stopPropagation(),this.setValue(t.target.valueAsDate),this.localizeInputValues())},this.handleDateRangeChange=t=>{this.range&&(t.stopPropagation(),this.setRangeValue(t.target.valueAsDate),this.localizeInputValues(),this.shouldFocusRangeEnd()?this.endInput?.setFocus():this.shouldFocusRangeStart()&&this.startInput?.setFocus())},this.setInputValue=(t,i="start")=>{const a=this[`${i}Input`];a&&(a.value=t)},this.setRangeValue=t=>{if(!this.range)return;const{value:i}=this,a=Array.isArray(i),e=Array.isArray(t),s=e?c(e?t[0]:null):"",n=e?c(e?t[1]:null):"",r=s||n?[s,n]:"";if(r===i)return;this.userChangedValue=!0,this.value=r,this.valueAsDate=r?l(r):void 0;const o=this.calciteInputDatePickerChange.emit();o&&o.defaultPrevented&&(this.value=i,a?(this.setInputValue(i[0],"start"),this.setInputValue(i[1],"end")):(this.value=i,this.setInputValue(i)))},this.setValue=t=>{if(this.range)return;const i=this.value,a=c(t);a!==i&&(this.userChangedValue=!0,this.valueAsDate=a?h(a):void 0,this.value=a||"",this.calciteInputDatePickerChange.emit().defaultPrevented&&(this.value=i,this.setInputValue(i)))},this.commonDateSeparators=[".","-","/"],this.formatNumerals=t=>t?t.split("").map((t=>this.commonDateSeparators?.includes(t)?this.localeData?.separator:z?.includes(t)?E?.numberFormatter?.format(Number(t)):t)).join(""):"",this.parseNumerals=t=>t?t.split("").map((t=>z.includes(t)?E.delocalize(t):t)).join(""):"",this.disabled=!1,this.form=void 0,this.readOnly=!1,this.value="",this.flipPlacements=void 0,this.headingLevel=void 0,this.valueAsDate=void 0,this.minAsDate=void 0,this.maxAsDate=void 0,this.min=void 0,this.max=void 0,this.open=!1,this.name=void 0,this.numberingSystem=void 0,this.scale="m",this.placement=g,this.range=!1,this.required=!1,this.overlayPositioning="absolute",this.proximitySelectionDisabled=!1,this.layout="horizontal",this.messageOverrides=void 0,this.datePickerActiveDate=void 0,this.effectiveLocale="",this.focusedInput="start",this.globalAttributes={},this.localeData=void 0}handleDisabledAndReadOnlyChange(t){t||(this.open=!1)}valueWatcher(t){if(!this.userChangedValue){let i;i=Array.isArray(t)?l(t):t?h(t):void 0,this.valueAsDateChangedExternally||i===this.valueAsDate||(this.valueAsDate=i),this.localizeInputValues()}this.userChangedValue=!1}valueAsDateWatcher(t){this.datePickerActiveDate=t;const i=this.range&&Array.isArray(t)?[c(t[0]),c(t[1])]:c(t);this.value!==i&&(this.valueAsDateChangedExternally=!0,this.value=i,this.valueAsDateChangedExternally=!1)}flipPlacementsHandler(){this.setFilteredPlacements(),this.reposition(!0)}onMinChanged(t){t&&(this.minAsDate=h(t))}onMaxChanged(t){t&&(this.maxAsDate=h(t))}openHandler(t){if(this.disabled||this.readOnly)return t||v(this.floatingEl),void(this.open=!1);t?this.reposition(!0):v(this.floatingEl)}overlayPositioningHandler(){this.reposition(!0)}calciteDaySelectHandler(){this.shouldFocusRangeStart()||this.shouldFocusRangeEnd()||(this.open=!1)}async setFocus(){await _(this),this.el.focus()}async reposition(t=!1){const{floatingEl:i,referenceEl:a,placement:e,overlayPositioning:s,filteredFlipPlacements:n}=this;return y(this,{floatingEl:i,referenceEl:a,overlayPositioning:s,placement:e,flipPlacements:n,type:"menu"},t)}connectedCallback(){S(this);const{open:t}=this;if(t&&this.openHandler(t),Array.isArray(this.value))this.valueAsDate=l(this.value);else if(this.value)try{this.valueAsDate=h(this.value)}catch(t){this.warnAboutInvalidValue(this.value),this.value=""}else this.range&&this.valueAsDate&&this.setRangeValue(this.valueAsDate);this.min&&(this.minAsDate=h(this.min)),this.max&&(this.maxAsDate=h(this.max)),P(this),k(this),F(this),this.setFilteredPlacements(),this.reposition(!0),E.numberFormatOptions={numberingSystem:this.numberingSystem,locale:this.effectiveLocale,useGrouping:!1}}async componentWillLoad(){O(this),await this.loadLocaleData(),this.onMinChanged(this.min),this.onMaxChanged(this.max)}componentDidLoad(){R(this),this.localizeInputValues(),this.reposition(!0)}disconnectedCallback(){A(this),D(this),b(this,this.referenceEl,this.floatingEl),L(this),H(this)}componentDidRender(){I(this)}render(){const{disabled:t,effectiveLocale:i,numberingSystem:s,readOnly:n}=this;return E.numberFormatOptions={numberingSystem:s,locale:i,useGrouping:!1},a(e,{onBlur:this.deactivate,onKeyDown:this.keyDownHandler,role:"application"},this.localeData&&a("div",{"aria-expanded":m(this.open),class:"input-container",role:"application"},a("div",{class:"input-wrapper",ref:this.setStartWrapper},a("calcite-input",{class:"input "+("vertical"===this.layout&&this.range?"no-bottom-border":""),disabled:t,icon:"calendar",label:j(this),"number-button-type":"none",numberingSystem:s,onCalciteInputInput:this.calciteInternalInputInputHandler,onCalciteInternalInputBlur:this.calciteInternalInputBlurHandler,onCalciteInternalInputFocus:this.startInputFocus,placeholder:this.localeData?.placeholder,readOnly:n,scale:this.scale,type:"text",ref:this.setStartInput})),a("div",{"aria-hidden":m(!this.open),class:{"menu-container":!0,"menu-container--active":this.open},ref:this.setFloatingEl},a("div",{class:{"calendar-picker-wrapper":!0,"calendar-picker-wrapper--end":"end"===this.focusedInput,[w.animation]:!0,[w.animationActive]:this.open},ref:this.setTransitionEl},a("calcite-date-picker",{activeDate:this.datePickerActiveDate,activeRange:this.focusedInput,headingLevel:this.headingLevel,max:this.max,maxAsDate:this.maxAsDate,messageOverrides:this.messageOverrides,min:this.min,minAsDate:this.minAsDate,numberingSystem:s,onCalciteDatePickerChange:this.handleDateChange,onCalciteDatePickerRangeChange:this.handleDateRangeChange,proximitySelectionDisabled:this.proximitySelectionDisabled,range:this.range,scale:this.scale,tabIndex:0,valueAsDate:this.valueAsDate}))),this.range&&"horizontal"===this.layout&&a("div",{class:"horizontal-arrow-container"},a("calcite-icon",{flipRtl:!0,icon:"arrow-right",scale:"l"===this.scale?"m":"s"})),this.range&&"vertical"===this.layout&&"s"!==this.scale&&a("div",{class:"vertical-arrow-container"},a("calcite-icon",{icon:"arrow-down",scale:"l"===this.scale?"m":"s"})),this.range&&a("div",{class:"input-wrapper",ref:this.setEndWrapper},a("calcite-input",{class:{input:!0,"border-top-color-one":"vertical"===this.layout&&this.range},disabled:t,icon:"calendar","number-button-type":"none",numberingSystem:s,onCalciteInputInput:this.calciteInternalInputInputHandler,onCalciteInternalInputBlur:this.calciteInternalInputBlurHandler,onCalciteInternalInputFocus:this.endInputFocus,placeholder:this.localeData?.placeholder,readOnly:n,scale:this.scale,type:"text",ref:this.setEndInput}))),a(C,{component:this}))}setReferenceEl(){const{focusedInput:t,layout:i,endWrapper:a,startWrapper:e}=this;this.referenceEl="end"===t||"vertical"===i?a||e:e||a,f(this,this.referenceEl,this.floatingEl)}onLabelClick(){this.setFocus()}onBeforeOpen(){this.calciteInputDatePickerBeforeOpen.emit()}onOpen(){this.calciteInputDatePickerOpen.emit()}onBeforeClose(){this.calciteInputDatePickerBeforeClose.emit()}onClose(){this.calciteInputDatePickerClose.emit()}commitValue(){const{focusedInput:t,value:i}=this,a=r(this[`${t}Input`].value,this.localeData),e=c(a),s=Array.isArray(i);if(this.range)if(s){if(e===i["start"===t?0:1])return;a?(this.setRangeValue(["start"===t?a:h(i[0]),"end"===t?a:h(i[1])]),this.localizeInputValues()):this.setRangeValue(["end"===t&&h(i[0]),"start"===t&&h(i[1])])}else a&&(this.setRangeValue(["start"===t?a:h(i[0]),"end"===t?a:h(i[1])]),this.localizeInputValues());else{if(e===i)return;this.setValue(a),this.localizeInputValues()}}async loadLocaleData(){E.numberFormatOptions={numberingSystem:this.numberingSystem,locale:this.effectiveLocale,useGrouping:!1},this.localeData=await p(this.effectiveLocale),this.localizeInputValues()}shouldFocusRangeStart(){return!(!this.value[1]||this.value[0]||"end"!==this.focusedInput||!this.startInput)}shouldFocusRangeEnd(){return!(!this.value[0]||this.value[1]||"start"!==this.focusedInput||!this.endInput)}localizeInputValues(){const t=d(this.range?Array.isArray(this.valueAsDate)&&this.valueAsDate[0]||void 0:this.valueAsDate,this.minAsDate,this.maxAsDate),i=this.range?d(Array.isArray(this.valueAsDate)&&this.valueAsDate[1]||void 0,this.minAsDate,this.maxAsDate):null,a=t&&this.formatNumerals(t.toLocaleDateString(this.effectiveLocale)),e=i&&this.formatNumerals(i.toLocaleDateString(this.effectiveLocale));a&&this.setInputValue(a,"start"),this.range&&e&&this.setInputValue(e,"end")}warnAboutInvalidValue(t){console.warn(`The specified value "${t}" does not conform to the required format, "YYYY-MM-DD".`)}static get delegatesFocus(){return!0}get el(){return s(this)}static get watchers(){return{disabled:["handleDisabledAndReadOnlyChange"],readOnly:["handleDisabledAndReadOnlyChange"],value:["valueWatcher"],valueAsDate:["valueAsDateWatcher"],flipPlacements:["flipPlacementsHandler"],min:["onMinChanged"],max:["onMaxChanged"],open:["openHandler"],overlayPositioning:["overlayPositioningHandler"],layout:["setReferenceEl"],focusedInput:["setReferenceEl"],effectiveLocale:["loadLocaleData"]}}};Y.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.calendar-picker-wrapper{position:static;inline-size:100%;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-picker-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:1;margin-inline:1px;background-color:var(--calcite-ui-foreground-1);padding-inline:0.625rem;inset-inline-start:0}:host([scale=s][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:216px}:host([scale=m][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:286px}:host([scale=l][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:398px}.menu-container{--calcite-floating-ui-z-index:600;display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([open]) .menu-container{visibility:visible}.menu-container--active{visibility:visible}.input .calcite-input__wrapper{margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";export{Y as calcite_input_date_picker}