(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{1218:function(e,t,s){Promise.resolve().then(s.t.bind(s,231,23)),Promise.resolve().then(s.t.bind(s,5322,23)),Promise.resolve().then(s.t.bind(s,6475,23)),Promise.resolve().then(s.t.bind(s,7443,23)),Promise.resolve().then(s.t.bind(s,3054,23)),Promise.resolve().then(s.bind(s,9645)),Promise.resolve().then(s.t.bind(s,4203,23)),Promise.resolve().then(s.bind(s,6747)),Promise.resolve().then(s.bind(s,7786))},6463:function(e,t,s){"use strict";var n=s(1169);s.o(n,"usePathname")&&s.d(t,{usePathname:function(){return n.usePathname}}),s.o(n,"useServerInsertedHTML")&&s.d(t,{useServerInsertedHTML:function(){return n.useServerInsertedHTML}})},5601:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{default:function(){return o},getImageProps:function(){return a}});let n=s(9920),r=s(497),l=s(8173),i=n._(s(1241));function a(e){let{props:t}=(0,r.getImgProps)(e,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,s]of Object.entries(t))void 0===s&&delete t[e];return{props:t}}let o=l.Image},9645:function(e,t,s){"use strict";s.d(t,{default:function(){return i}});var n=s(7437),r=s(3969),l=s(6463);function i(){return(0,l.useServerInsertedHTML)(()=>(0,n.jsx)("style",{dangerouslySetInnerHTML:{__html:(0,r.$Z)()},id:"sandpack"})),null}},6747:function(e,t,s){"use strict";s.d(t,{NavBar:function(){return b}});var n=s(7437),r=s(4839),l=s(5601),i=s.n(l),a=s(231),o=s.n(a),c=s(6463),u={src:"/_next/static/media/avatar-small.c400757d.jpg",height:72,width:72,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABQEBAAAAAAAAAAAAAAAAAAAAA//aAAwDAQACEAMQAAAAigG//8QAHRAAAQMFAQAAAAAAAAAAAAAAAQIDBAAGExRRc//aAAgBAQABPwAWy7rFpEbLKQkOHnnX/8QAGxEAAgEFAAAAAAAAAAAAAAAAAQIAAwQhIjH/2gAIAQIBAT8AoXDqhwDsez//xAAbEQEAAQUBAAAAAAAAAAAAAAABAwACBBEhIv/aAAgBAwEBPwCXHjvRdnkONf/Z",blurWidth:8,blurHeight:8},d=s(2265),h=s(5414),A=s.n(h);function m(e){let{className:t}=e;return(0,n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",className:t,children:(0,n.jsxs)("g",{className:A().spinner,children:[(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",opacity:".14"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(30 12 12)",opacity:".29"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(60 12 12)",opacity:".43"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(90 12 12)",opacity:".57"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(120 12 12)",opacity:".71"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(150 12 12)",opacity:".86"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(180 12 12)"})]})})}var f=s(2154),_=s.n(f);let g={input:"search-input",results:"search-results"};function v(e){let{className:t}=e,[l,i]=d.useState({type:"idle"}),[a,c]=d.useState(""),[u,h]=d.useState(null),[A,f]=d.useState(!1),[v,x]=d.useState(null),y=d.useRef(null);d.useEffect(()=>{let e=!1,t=async()=>{var t,n;let r="success"===l.type?l.db:null;if(""===a.trim()||!r){h(null),x(null),f(!1);return}let{searchWithHighlight:i}=await Promise.all([s.e(131),s.e(534)]).then(s.bind(s,1534)),o=await i(r,{term:a});e||(h(o),x(null!==(n=null===(t=o.hits[0])||void 0===t?void 0:t.id)&&void 0!==n?n:null),f(!0))};return"success"===l.type&&t(),()=>{e=!0}},[a,l]),d.useEffect(()=>{if(A){var e;null===(e=document.getElementById(g.results))||void 0===e||e.focus()}},[A]),d.useEffect(()=>{if(v){let e=document.getElementById("".concat(g.results,"-").concat(v));e&&e.scrollIntoView({block:"nearest"})}},[v]),d.useEffect(()=>{let e=e=>{var t;(null===(t=y.current)||void 0===t?void 0:t.contains(e.target))||f(!1)},t=e=>{let t="MacIntel"===navigator.platform?e.metaKey:e.ctrlKey;if("KeyK"===e.code&&t){var s;e.preventDefault(),null===(s=document.getElementById(g.input))||void 0===s||s.focus()}};return document.addEventListener("click",e),document.addEventListener("keydown",t),()=>{document.removeEventListener("click",e),document.removeEventListener("keydown",t)}},[]);let w=async()=>{if("idle"===l.type||"error"===l.type){i({type:"loading"});try{let e=await fetch("/data.json"),t=await e.json(),{create:n,insert:r}=await Promise.all([s.e(131),s.e(327)]).then(s.bind(s,7327)),{afterInsert:l}=await Promise.all([s.e(131),s.e(534)]).then(s.bind(s,1534)),a=await n({schema:{id:"string",title:"string",description:"string",content:"string"},plugins:[{name:"highlight",afterInsert:l}]});t.forEach(e=>{r(a,e)}),i({type:"success",db:a})}catch(e){console.error(e),i({type:"error",error:e})}}};return(0,n.jsxs)("search",{ref:y,className:(0,r.Z)(_().search,t),children:[(0,n.jsxs)("div",{className:_().wrapper,children:[(0,n.jsx)("input",{id:g.input,autoCapitalize:"none",autoComplete:"off","aria-autocomplete":"list",className:_().input,name:"q",type:"search",placeholder:"Type to search",value:a,onChange:e=>c(e.target.value),onFocus:w,onKeyDown:e=>{var t,s,n;switch(e.code){case"ArrowUp":case"ArrowDown":if(e.preventDefault(),null==u?void 0:u.hits.length){let s=u.hits.findIndex(e=>e.id===v),n=null===(t=u.hits[s+("ArrowUp"===e.key?-1:1)])||void 0===t?void 0:t.id;n&&x(n)}break;case"Enter":e.preventDefault(),v&&(null===(s=document.getElementById("".concat(g.results,"-").concat(v)))||void 0===s||s.click());break;case"Escape":e.preventDefault(),f(!1),null===(n=document.getElementById(g.input))||void 0===n||n.blur();break;case"Tab":f(!1)}}}),"loading"===l.type&&(0,n.jsx)(m,{className:_().loading})]}),(0,n.jsx)("div",{"aria-live":"polite",className:(0,r.Z)(_().results,A&&_().visible),children:"success"===l.type&&(null==u?void 0:u.hits.length)?(0,n.jsx)("ul",{id:g.results,role:"listbox",children:u.hits.map(e=>{var t;let s,{id:r,document:l,positions:i}=e;s=i.description&&(a.toLowerCase() in i.description||Object.keys(i.description).length>Object.keys(null!==(t=i.content)&&void 0!==t?t:{}).length)?p(l.description,a,i.description):p(l.content,a,i.content);let u=p(l.title,a,i.title);return(0,n.jsx)("li",{role:"option",tabIndex:-1,"aria-selected":v===r?"true":"false",className:v===r?_().selected:"",children:(0,n.jsxs)(o(),{id:"".concat(g.results,"-").concat(r),tabIndex:-1,href:"/posts/".concat(l.id),onClick:()=>{var e;c(""),f(!1),null===(e=document.getElementById(g.input))||void 0===e||e.blur()},onMouseOver:()=>x(r),children:[(0,n.jsx)("h3",{children:u}),(0,n.jsx)("p",{children:s})]})},r)})}):(0,n.jsx)("p",{className:_().blank,role:"status",children:"error"===l.type?"An error ocurred":"No results found"})})]})}let p=(e,t,s)=>{var r;let l=s?null!==(r=s[t.toLowerCase()])&&void 0!==r?r:Object.values(s)[0]:null;if(null==s||null==l||!l[0])return e.slice(0,100).trim();let i=l[0].length>100?0:Math.round((100-l[0].length)/2),a=Math.max(l[0].start-i,0),o=e.slice(a,a+l[0].length+2*i).slice(0,100),c=Object.values(s).reduce((e,t)=>[...e,...t],[]).reduce((e,t,s)=>{let{start:r,length:l}=t;return e.text[r-e.offset]&&(e.highlighted.push(e.text.slice(0,r-e.offset),(0,n.jsx)("mark",{children:e.text.slice(r-e.offset,r-e.offset+l)},s)),e.text=e.text.slice(r-e.offset+l),e.offset=r-e.offset+l),e},{text:o,offset:a,highlighted:[]}),u=c.highlighted.concat(c.text);return a>0&&u.unshift("…"),u};var x=s(7786),y=s(4581),w=s.n(y);function b(){let e=(0,c.usePathname)();return(0,n.jsxs)("nav",{className:w().container,children:[(0,n.jsx)("div",{className:w().left,children:"/"===e?(0,n.jsx)(o(),{href:"/about",className:(0,r.Z)(w().logo,w().item),children:(0,n.jsx)(i(),{src:u,alt:"About"})}):(0,n.jsx)(o(),{href:"/",className:(0,r.Z)(w().item,w().back),"aria-label":"Posts",children:(0,n.jsx)("svg",{role:"img",className:w().icon,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M19 12H5M5 12L12 19M5 12L12 5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})}),(0,n.jsx)("div",{className:w().searchbar,children:(0,n.jsx)(v,{})}),(0,n.jsxs)("div",{className:w().right,children:[(0,n.jsx)(o(),{href:"/rss.xml",title:"RSS",className:w().item,children:(0,n.jsxs)("svg",{className:w().icon,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("path",{d:"M4 11a9 9 0 0 1 9 9"}),(0,n.jsx)("path",{d:"M4 4a16 16 0 0 1 16 16"}),(0,n.jsx)("circle",{cx:"5",cy:"19",r:"1"})]})}),(0,n.jsx)(x.O,{className:w().item})]})]})}},7786:function(e,t,s){"use strict";s.d(t,{O:function(){return c},script:function(){return d}});var n=s(7437),r=s(4839),l=s(2265),i=s(3113),a=s.n(i);let o="selected-theme";function c(e){let{className:t}=e;return(0,l.useEffect)(()=>{let e=e=>{if(localStorage.getItem(o))return;let t=e.matches?"dark":"light";document.documentElement.dataset.theme=t},t=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[]),(0,n.jsx)("button",{type:"button",title:"Toggle theme",className:(0,r.Z)(a().button,t),onClick:()=>{let e="dark"===u()?"light":"dark";localStorage.setItem(o,e),document.documentElement.dataset.theme=e},children:(0,n.jsxs)("span",{className:a().icons,children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:a().sun,children:(0,n.jsx)("path",{fill:"currentColor",d:"M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"})}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:a().moon,children:(0,n.jsx)("path",{fill:"currentColor",d:"M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"})})]})})}function u(){return localStorage.getItem("selected-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}let d="\n  const theme = (".concat(u.toString(),")();\n\n  document.documentElement.dataset.theme = theme;\n")},3054:function(){},4203:function(e){e.exports={container:"styles_container__0CKa2"}},4581:function(e){e.exports={container:"styles_container__iTIYP",left:"styles_left__mlJEF",right:"styles_right__gKk12",item:"styles_item__TNvI5",logo:"styles_logo__uvzCP",back:"styles_back__bRzHW",icon:"styles_icon__kjLYW",searchbar:"styles_searchbar__wzM8p"}},2154:function(e){e.exports={search:"styles_search__w1quz",wrapper:"styles_wrapper__qUTfm",input:"styles_input__VI_UE",loading:"styles_loading__ivHGf",results:"styles_results__7tWQr",selected:"styles_selected__JjB5H",blank:"styles_blank__WgT77",visible:"styles_visible__PrA2s"}},5414:function(e){e.exports={spinner:"styles_spinner__SP8A0",spin:"styles_spin__FqrTT"}},3113:function(e){e.exports={button:"styles_button__wGUhj",icons:"styles_icons__92_2E",moon:"styles_moon__HPv9o",sun:"styles_sun__rTG7N"}},5322:function(e){e.exports={style:{fontFamily:"'__Arvo_7c3f16', '__Arvo_Fallback_7c3f16'",fontWeight:400,fontStyle:"normal"},className:"__className_7c3f16",variable:"__variable_7c3f16"}},7443:function(e){e.exports={style:{fontFamily:"'__Fira_Code_988d07', '__Fira_Code_Fallback_988d07'",fontWeight:400,fontStyle:"normal"},className:"__className_988d07",variable:"__variable_988d07"}},6475:function(e){e.exports={style:{fontFamily:"'__Lato_6c6f2f', '__Lato_Fallback_6c6f2f'",fontStyle:"normal"},className:"__className_6c6f2f",variable:"__variable_6c6f2f"}}},function(e){e.O(0,[958,401,344,173,459,231,971,23,744],function(){return e(e.s=1218)}),_N_E=e.O()}]);