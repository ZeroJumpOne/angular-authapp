import{C as i,D as r,E as p,F as h,G as n,H as y,J as g,K as v,M as S,Q as C,R as x,W as j,Y as u,_ as b,l as m,n as a,o as f,p as s,v as d}from"./chunk-K5XMRWQB.js";var M=(()=>{let t=class t{constructor(){this.authService=a(b),this.router=a(j),this.user=S(()=>this.authService.currentUser())}onLogout(){console.log("logout"),this.authService.logout()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["app-dashboard-layout"]],decls:12,vars:3,consts:[[3,"click"]],template:function(o,l){o&1&&(i(0,"h1"),n(1,"Dashboard"),r(),p(2,"hr"),i(3,"h3"),n(4,"User"),r(),i(5,"pre"),n(6),g(7,"json"),r(),p(8,"br"),i(9,"div")(10,"button",0),h("click",function(){return l.onLogout()}),n(11," Cerrar Sesi\xF3n "),r()()),o&2&&(d(6),y(" ",v(7,1,l.user())," "))},dependencies:[C]});let e=t;return e})();var F=[{path:"",component:M}],E=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=s({type:t}),t.\u0275inj=m({imports:[u.forChild(F),u]});let e=t;return e})();var G=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=s({type:t}),t.\u0275inj=m({imports:[x,E]});let e=t;return e})();export{G as DashboardModule};
