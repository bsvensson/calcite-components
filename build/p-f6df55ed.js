/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
import{f as t}from"./p-6012429e.js";import{c as o}from"./p-24f78b05.js";const n=new Set;let s;const c={childList:!0};function f(t){s||(s=o("mutation",r)),s.observe(t.el,c)}function i(t){n.delete(t.el),r(s.takeRecords()),s.disconnect();for(const[t]of n.entries())s.observe(t,c)}function r(o){o.forEach((({target:o})=>{t(o)}))}export{f as c,i as d}