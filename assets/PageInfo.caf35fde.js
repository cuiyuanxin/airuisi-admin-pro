import{t as B,_ as S,d as E,i as b,r as D,o as k,a as I,b as R,c as a,e as H,f as h,g as P,h as A,u as L,j as N,k as U,l as M,w as n,m as x,n as T,p as d,B as V,q as $,s as j}from"./index.9aae3ca0.js";import{c as z,t as O,s as q,S as m,a as W,L as Y,D as G,_ as J}from"./Statistic.cf830267.js";function K(e,t,r){e=B(e),t=O(t);var u=t?q(e):0;return t&&u<t?z(t-u,r)+e:e}var Q=[["Y",1e3*60*60*24*365],["M",1e3*60*60*24*30],["D",1e3*60*60*24],["H",1e3*60*60],["m",1e3*60],["s",1e3],["S",1]];function X(e,t){var r=e,u=/\[[^\]]*]/g,i=(t.match(u)||[]).map(function(l){return l.slice(1,-1)}),s=t.replace(u,"[]"),c=Q.reduce(function(l,p){var g=S(p,2),F=g[0],f=g[1];if(l.indexOf(F)!==-1){var o=Math.floor(r/f);return r-=o*f,l.replace(new RegExp("".concat(F,"+"),"g"),function(v){var w=v.length;return K(o.toString(),w,"0")})}return l},s),_=0;return c.replace(u,function(){var l=i[_];return _+=1,l})}function Z(e,t){var r=t.format,u=r===void 0?"":r,i=new Date(e).getTime(),s=Date.now(),c=Math.max(i-s,0);return X(c,u)}var tt=1e3/30;function C(e){return new Date(e).getTime()}var et=function(){return h(h({},W()),{value:[Number,String,Object],format:String,onFinish:Function,onChange:Function})},nt=E({name:"AStatisticCountdown",props:b(et(),{format:"HH:mm:ss"}),setup:function(t,r){var u=r.emit,i=r.slots,s=D(),c=D(),_=function(){var o=t.value,v=C(o);v>=Date.now()?l():p()},l=function(){if(!s.value){var o=C(t.value);s.value=setInterval(function(){c.value.$forceUpdate(),o>Date.now()&&u("change",o-Date.now()),_()},tt)}},p=function(){var o=t.value;if(s.value){clearInterval(s.value),s.value=void 0;var v=C(o);v<Date.now()&&u("finish")}},g=function(o){var v=o.value,w=o.config,y=t.format;return Z(v,h(h({},w),{format:y}))},F=function(o){return o};return k(function(){_()}),I(function(){_()}),R(function(){p()}),function(){var f=t.value;return a(m,H({ref:c},h(h({},P(t,["onFinish","onChange"])),{value:f,valueRender:F,formatter:g})),i)}}});m.Countdown=nt;m.install=function(e){return e.component(m.name,m),e.component(m.Countdown.name,m.Countdown),e};m.Countdown;const at=d("\u5F20\u4E09"),ot=T("a",null,"421421",-1),ut=d("2017-01-10"),rt=d("2017-10-10"),it=d("\u4E2D\u56FD\u6D59\u6C5F\u7701\u676D\u5DDE\u5E02\u897F\u6E56\u533A\u53E4\u7FE0\u8DEF"),st=d("\u64CD\u4F5C"),ct=d("\u64CD\u4F5C"),lt=d("\u4E3B\u64CD\u4F5C"),_t={style:{height:"120vh"}},ft=d("Back Home"),mt=E({__name:"PageInfo",setup(e){const t=L();return(r,u)=>{const i=G,s=J,c=V,_=m,l=$,p=j,g=N("page-container");return U(),M(g,{title:x(t).meta.title},{content:n(()=>[a(s,{size:"small",column:2},{default:n(()=>[a(i,{label:"\u521B\u5EFA\u4EBA"},{default:n(()=>[at]),_:1}),a(i,{label:"\u8054\u7CFB\u65B9\u5F0F"},{default:n(()=>[ot]),_:1}),a(i,{label:"\u521B\u5EFA\u65F6\u95F4"},{default:n(()=>[ut]),_:1}),a(i,{label:"\u66F4\u65B0\u65F6\u95F4"},{default:n(()=>[rt]),_:1}),a(i,{label:"\u5907\u6CE8"},{default:n(()=>[it]),_:1})]),_:1})]),extra:n(()=>[a(c,{key:"3"},{default:n(()=>[st]),_:1}),a(c,{key:"2"},{default:n(()=>[ct]),_:1}),a(c,{key:"1",type:"primary"},{default:n(()=>[lt]),_:1})]),extraContent:n(()=>[a(l,null,{default:n(()=>[a(_,{title:"Feedback",value:1128},{prefix:n(()=>[a(x(Y))]),_:1}),a(_,{title:"Unmerged",value:93,suffix:"/ 100"})]),_:1})]),default:n(()=>[T("div",_t,[a(p,{status:"404",style:{height:"100%",background:"#fff"},title:"Hello World","sub-title":"Sorry, you are not authorized to access this page."},{extra:n(()=>[a(c,{type:"primary"},{default:n(()=>[ft]),_:1})]),_:1})])]),_:1},8,["title"])}}});var pt=A(mt,[["__file","/home/runner/work/airuisi-admin-pro/airuisi-admin-pro/src/views/admins/PageInfo.vue"]]);export{pt as default};
