/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.1.1-next.2
 */
const t=(t,a,e)=>Math.max(a,Math.min(t,e)),a=new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/),e=t=>{const e=(""+t).match(a);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0};export{t as c,e as d}