/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
function n(n){for(let e=n;e;e=t(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=t(n);e;e=t(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if("contents"!==n.display){if("static"!==n.position||"none"!==n.filter)return e;if("BODY"===e.tagName)return e}}return null}function t(n){return n.assignedSlot?n.assignedSlot:n.parentNode instanceof ShadowRoot?n.parentNode.host:n.parentNode}export{n as offsetParent}