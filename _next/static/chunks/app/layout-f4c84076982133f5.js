(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{1218:function(e,t,s){Promise.resolve().then(s.t.bind(s,231,23)),Promise.resolve().then(s.t.bind(s,5322,23)),Promise.resolve().then(s.t.bind(s,6475,23)),Promise.resolve().then(s.t.bind(s,7443,23)),Promise.resolve().then(s.t.bind(s,3054,23)),Promise.resolve().then(s.bind(s,9645)),Promise.resolve().then(s.t.bind(s,4203,23)),Promise.resolve().then(s.bind(s,3270)),Promise.resolve().then(s.bind(s,7786))},9645:function(e,t,s){"use strict";s.d(t,{default:function(){return l}});var n=s(7437),r=s(3969),i=s(6463);function l(){return(0,i.useServerInsertedHTML)(()=>(0,n.jsx)("style",{dangerouslySetInnerHTML:{__html:(0,r.$Z)()},id:"sandpack"})),null}},3270:function(e,t,s){"use strict";s.d(t,{NavBar:function(){return j}});var n=s(7437),r=s(4839),i=s(6648),l=s(7138),o=s(6463),a={src:"/_next/static/media/avatar-small.c400757d.jpg",height:72,width:72,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABQEBAAAAAAAAAAAAAAAAAAAAA//aAAwDAQACEAMQAAAAigG//8QAHRAAAQMFAQAAAAAAAAAAAAAAAQIDBAAGExRRc//aAAgBAQABPwAWy7rFpEbLKQkOHnnX/8QAGxEAAgEFAAAAAAAAAAAAAAAAAQIAAwQhIjH/2gAIAQIBAT8AoXDqhwDsez//xAAbEQEAAQUBAAAAAAAAAAAAAAABAwACBBEhIv/aAAgBAwEBPwCXHjvRdnkONf/Z",blurWidth:8,blurHeight:8},c=s(7949),u=s(7466),d=s(1534),h=s(2265),A=s(5414),m=s.n(A);function g(e){let{className:t}=e;return(0,n.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",className:t,children:(0,n.jsxs)("g",{className:m().spinner,children:[(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",opacity:".14"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(30 12 12)",opacity:".29"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(60 12 12)",opacity:".43"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(90 12 12)",opacity:".57"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(120 12 12)",opacity:".71"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(150 12 12)",opacity:".86"}),(0,n.jsx)("rect",{x:"11",y:"1",width:"2",height:"5",transform:"rotate(180 12 12)"})]})})}var f=s(2154),p=s.n(f);function v(e){let{className:t}=e,[s,i]=h.useState({type:"idle"}),[o,a]=h.useState(""),[A,m]=h.useState(null),[f,v]=h.useState(!1),[_,w]=h.useState(null),y=h.useRef(null);return h.useEffect(()=>{let e=new AbortController;return(async()=>{i({type:"loading"});try{let t=await fetch("/data.json",{signal:e.signal}),s=await t.json(),n=await (0,c.U)({schema:{id:"string",title:"string",description:"string",content:"string"},plugins:[{name:"highlight",afterInsert:d.Ui}]});s.forEach(e=>{(0,u.$T)(n,e)}),i({type:"success",db:n})}catch(e){console.error(e),i({type:"error",error:e})}})(),()=>{e.abort("Component unmounted")}},[]),h.useEffect(()=>{let e=!1,t=async()=>{var t,n;if(""===o.trim()){m(null),w(null),v(!1);return}let r="success"===s.type?s.db:null;if(!r)return;let i=await (0,d.bv)(r,{term:o});e||(m(i),w(null!==(n=null===(t=i.hits[0])||void 0===t?void 0:t.id)&&void 0!==n?n:null),v(!0))};return"success"===s.type&&t(),()=>{e=!0}},[o,s]),h.useEffect(()=>{if(f){var e;null===(e=document.getElementById("search-results"))||void 0===e||e.focus()}},[f]),h.useEffect(()=>{if(_){let e=document.getElementById("search-result-".concat(_));e&&e.scrollIntoView({block:"nearest"})}},[_]),h.useEffect(()=>{let e=e=>{var t;(null===(t=y.current)||void 0===t?void 0:t.contains(e.target))||v(!1)},t=e=>{let t="MacIntel"===navigator.platform?e.metaKey:e.ctrlKey;if("KeyK"===e.code&&t){var s;e.preventDefault(),null===(s=document.getElementById("search-input"))||void 0===s||s.focus()}};return document.addEventListener("click",e),document.addEventListener("keydown",t),()=>{document.removeEventListener("click",e),document.removeEventListener("keydown",t)}},[]),(0,n.jsxs)("form",{ref:y,onSubmit:e=>{if(e.preventDefault(),_){var t;null===(t=document.getElementById("search-result-".concat(_)))||void 0===t||t.click()}},className:(0,r.Z)(p().container,t),children:[(0,n.jsx)("input",{id:"search-input","aria-owns":"search-results",autoCapitalize:"none",autoComplete:"off","aria-autocomplete":"list",className:p().input,name:"q",type:"search",placeholder:"Type to search",value:o,onChange:e=>a(e.target.value),onKeyUp:e=>{switch(e.code){case"ArrowUp":case"ArrowDown":if(e.preventDefault(),null==A?void 0:A.hits.length){var t;let s=A.hits.findIndex(e=>e.id===_),n=null===(t=A.hits[s+("ArrowUp"===e.key?-1:1)])||void 0===t?void 0:t.id;n&&w(n)}}},onKeyDown:e=>{switch(e.code){case"Tab":v(!1);break;case"Escape":var t;e.preventDefault(),v(!1),null===(t=document.getElementById("search-input"))||void 0===t||t.blur()}}}),"loading"===s.type&&(0,n.jsx)(g,{className:p().loading}),(0,n.jsx)("div",{className:(0,r.Z)(p().results,f&&p().visible),children:"success"===s.type&&(null==A?void 0:A.hits.length)?(0,n.jsx)("ul",{id:"search-results",role:"listbox",children:A.hits.map(e=>{let t,{id:s,document:r,positions:i}=e;t=i.description&&o.toLowerCase() in i.description?x(r.description,o,i.description):x(r.content,o,i.content);let c=x(r.title,o,i.title);return(0,n.jsx)("li",{role:"option",tabIndex:-1,"aria-selected":_===s?"true":"false",className:_===s?p().selected:"",children:(0,n.jsxs)(l.default,{id:"search-result-".concat(s),tabIndex:-1,href:"/posts/".concat(r.id),onClick:()=>{var e;a(""),v(!1),null===(e=document.getElementById("search-input"))||void 0===e||e.blur()},onMouseOver:()=>w(s),children:[(0,n.jsx)("h3",{children:c}),(0,n.jsx)("p",{children:t})]})},s)})}):(0,n.jsx)("p",{className:p().blank,"aria-live":"polite",role:"status",children:"error"===s.type?"An error ocurred":"No results found"})})]})}let x=(e,t,s)=>{let r=null==s?void 0:s[t.toLowerCase()];if(null==r||!r[0])return e.slice(0,90).trim();let i=r[0].length>90?0:Math.round((90-r[0].length)/2),l=Math.max(r[0].start-i,0),o=e.slice(l,l+r[0].length+2*i).slice(0,90),a=r.reduce((e,t,s)=>{let{start:r,length:i}=t;return e.text[r-e.offset]&&(e.highlighted.push(e.text.slice(0,r-e.offset),(0,n.jsx)("mark",{children:e.text.slice(r-e.offset,r-e.offset+i)},s)),e.text=e.text.slice(r-e.offset+i),e.offset=r-e.offset+i),e},{text:o,offset:l,highlighted:[]}),c=a.highlighted.concat(a.text);return r[0].start-i>0&&c.unshift("…"),c};var _=s(7786),w=s(4581),y=s.n(w);function j(){let e=(0,o.usePathname)();return(0,n.jsxs)("nav",{className:y().container,children:[(0,n.jsx)("div",{className:y().left,children:"/"===e?(0,n.jsx)(l.default,{href:"/about",className:(0,r.Z)(y().logo,y().item),children:(0,n.jsx)(i.default,{src:a,alt:"About"})}):(0,n.jsx)(l.default,{href:"/",className:(0,r.Z)(y().item,y().back),"aria-label":"Posts",children:(0,n.jsx)("svg",{role:"img",className:y().icon,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M19 12H5M5 12L12 19M5 12L12 5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})}),(0,n.jsx)("div",{className:y().searchbar,children:(0,n.jsx)(v,{})}),(0,n.jsxs)("div",{className:y().right,children:[(0,n.jsx)(l.default,{href:"/rss.xml",className:y().item,children:(0,n.jsxs)("svg",{className:y().icon,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("path",{d:"M4 11a9 9 0 0 1 9 9"}),(0,n.jsx)("path",{d:"M4 4a16 16 0 0 1 16 16"}),(0,n.jsx)("circle",{cx:"5",cy:"19",r:"1"})]})}),(0,n.jsx)(_.O,{className:y().item})]})]})}},7786:function(e,t,s){"use strict";s.d(t,{O:function(){return c},script:function(){return d}});var n=s(7437),r=s(4839),i=s(2265),l=s(3113),o=s.n(l);let a="selected-theme";function c(e){let{className:t}=e;return(0,i.useEffect)(()=>{let e=e=>{if(localStorage.getItem(a))return;let t=e.matches?"dark":"light";document.documentElement.dataset.theme=t},t=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",e),()=>{t.removeEventListener("change",e)}},[]),(0,n.jsx)("button",{type:"button",title:"Toggle theme",className:(0,r.Z)(o().button,t),onClick:()=>{let e="dark"===u()?"light":"dark";localStorage.setItem(a,e),document.documentElement.dataset.theme=e},children:(0,n.jsxs)("span",{className:o().icons,children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:o().sun,children:(0,n.jsx)("path",{fill:"currentColor",d:"M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"})}),(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",className:o().moon,children:(0,n.jsx)("path",{fill:"currentColor",d:"M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"})})]})})}function u(){return localStorage.getItem("selected-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}let d="\n  const theme = (".concat(u.toString(),")();\n\n  document.documentElement.dataset.theme = theme;\n")},3054:function(){},4203:function(e){e.exports={container:"styles_container__0CKa2"}},4581:function(e){e.exports={container:"styles_container__iTIYP",left:"styles_left__mlJEF",right:"styles_right__gKk12",item:"styles_item__TNvI5",logo:"styles_logo__uvzCP",back:"styles_back__bRzHW",icon:"styles_icon__kjLYW",searchbar:"styles_searchbar__wzM8p"}},2154:function(e){e.exports={container:"styles_container__JKesx",input:"styles_input__VI_UE",loading:"styles_loading__ivHGf",results:"styles_results__7tWQr",selected:"styles_selected__JjB5H",blank:"styles_blank__WgT77",visible:"styles_visible__PrA2s"}},5414:function(e){e.exports={container:"styles_container__wJ1Av",input:"styles_input__UAeiE",spinner:"styles_spinner__SP8A0",spin:"styles_spin__FqrTT"}},3113:function(e){e.exports={button:"styles_button__wGUhj",icons:"styles_icons__92_2E",moon:"styles_moon__HPv9o",sun:"styles_sun__rTG7N"}}},function(e){e.O(0,[958,401,344,173,459,231,630,971,23,744],function(){return e(e.s=1218)}),_N_E=e.O()}]);