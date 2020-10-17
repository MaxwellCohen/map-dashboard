(this["webpackJsonpmap-dashboard"]=this["webpackJsonpmap-dashboard"]||[]).push([[0],{195:function(e,t,n){e.exports=n(398)},398:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(16),c=n.n(i),l=n(10),o=n(50),u=n(14);n(212),n(213);var s=function(){var e=Object(a.useState)(null),t=Object(l.a)(e,2),n=t[0],i=t[1],c=function(e){var t=Object(a.useRef)([]);return{onDragStarted:function(e){t.current=e.columnApi.getColumnState().map((function(e){return e.colId}))},onDragStopped:function(n){var a=n.columnApi.getColumnState().map((function(e){return e.colId}));t.current.every((function(e,t){return e===a[t]}))||e(n)}}}((function(e){})),s=c.onDragStarted,d=c.onDragStopped,f=Object(a.useState)(null),m=Object(l.a)(f,2),p=m[0],v=m[1],b=Object(u.c)((function(e){return e.data})),g=b.filteredData,h=b.titles;return r.a.createElement("div",{className:"ag-theme-alpine",style:{height:400,width:"100%",marginRight:""}},r.a.createElement(o.AgGridReact,{onGridReady:function(e){i(e.api),v(e.columnApi)},onRowDataChanged:function(){if(n){var e=[];p.getAllColumns().forEach((function(t){e.push(t.colId)})),p.autoSizeColumns(e,!1)}},onDragStarted:s,onDragStopped:d,defaultColDef:{initialWidth:100,sortable:!0,resizable:!0},columnDefs:h.map((function(e){return{headerName:e,field:e}})),rowData:g}))},d=n(95),f=n.n(d),m=n(169),p=n.n(m),v=n(170),b=n.n(v),g=n(21),h=function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var a=t[n].split("=");if(decodeURIComponent(a[0])===e){var r=decodeURIComponent(a[1]);return(r.includes("|#|")||r.includes(","))&&(r=r.split("|#|").map((function(e){return e.split(",")}))),r}}},O=function(e,t){Array.isArray(t)&&(t=t.join("|#|"));var n=new URLSearchParams(window.location.search);n.set(e,t),window.history.replaceState(null,null,"?"+n.toString())},y=function(e){return O("t",e),{type:"SET_TITLE",payload:{text:e}}},j=function(e){return O("mi",e),{type:"SET_COLOR_AXIS_MIN",payload:{min:e}}},E=function(e){return O("ma",e),{type:"SET_COLOR_AXIS_MAX",payload:{max:e}}},w=function(e){return e=e.sort((function(e,t){return+e[0]>+t[0]?1:-1})),O("st",e),{type:"SET_COLOR_AXIS_STOPS",payload:{stops:Object(g.a)(e)}}},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=(e||[]).map((function(e){return e[1]}));return{type:"SET_MAP_DATA",payload:{series:{data:Object(g.a)(e),name:t},colorAxis:{min:Math.min.apply(Math,Object(g.a)(n)),max:Math.max.apply(Math,Object(g.a)(n))}}}},A=n(180);n(214)(f.a),b()(f.a),"undefined"!==typeof window&&(window.proj4=window.proj4||A.a);var D=function(){var e=Object(u.c)((function(e){return e.data})),t=e.mapData,n=e.displayField,i=Object(u.c)((function(e){return e.options})),c=Object(u.b)();return Object(a.useEffect)((function(){0!==t.length?c(x(t,n)):c(x())}),[t,n,c]),r.a.createElement(r.a.Fragment,null,i?r.a.createElement(p.a,{highcharts:f.a,options:i,constructorType:"mapChart"}):null)},S=function(){return r.a.createElement("div",{style:{width:"50%",padding:"10px",border:"1px solid #c4c4c4"}},r.a.createElement("div",{style:{width:"600",height:"400px"}},r.a.createElement(D,null)))},C=n(432),k=n(451),_=n(453),F=n(435),T=n(447),R=n(22),L=Object(C.a)((function(e){return{button:{display:"block"},formControl:{minWidth:120,width:"100%"}}}));function I(e){var t=e.values,n=e.onChange,i=e.label,c=e.value,o=L(),u=Object(a.useState)(c),s=Object(l.a)(u,2),d=s[0],f=s[1],m=Object(a.useState)(!1),p=Object(l.a)(m,2),v=p[0],b=p[1];Object(a.useEffect)((function(){d!==c&&f(c)}),[c,d]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(F.a,{className:o.formControl},r.a.createElement(k.a,{id:"demo-controlled-open-select-label"},i),r.a.createElement(T.a,{labelId:"demo-controlled-open-select-label",id:"demo-controlled-open-select",open:v,onClose:function(){b(!1)},onOpen:function(){b(!0)},value:d,style:{width:"100%"},onChange:function(e){f(e.target.value),n(e.target.value)}},r.a.createElement(_.a,{value:""},r.a.createElement("em",null,"None")),t.map((function(e){return r.a.createElement(_.a,{value:e,key:e},Object(R.startCase)(e))})))))}var N=function(e){return{type:"LOAD_DATA_SAGA",payload:{url:e}}},P=function(e,t){return O("df",e),O("a",t),{type:"SET_DISPLAY_FIELD",payload:{displayField:e,aggregationAction:t}}},z=function(e){return O("f",e),{type:"ADD_FILTERS",payload:{filteringFuncitons:e}}},M=function(e){return O("s",e),{type:"SET_STATE_AND_GROUP",payload:{stateKey:e}}},V=n(171),B=n(172),U=function(){function e(t,n){var a=this;Object(V.a)(this,e),this.arr=t,this.key=n,this.numberData=t.map((function(e){return parseFloat(e[a.key])})).filter((function(e){return!isNaN(e)}))}return Object(B.a)(e,[{key:"average",value:function(){if(this.count())return this.sum()/this.count()}},{key:"count",value:function(){return this.arr.length}},{key:"countOfNumbers",value:function(){return this.numberData.length}},{key:"max",value:function(){return void 0!==this._max||(this._max=Math.max.apply(Math,Object(g.a)(this.numberData))),this._max}},{key:"min",value:function(){return void 0!==this._min||(this._min=Math.min.apply(Math,Object(g.a)(this.numberData))),this._min}},{key:"sum",value:function(){return void 0!==this._sum||(this._sum=this.numberData.reduce((function(e,t){return e+t}),0)),this._sum}}]),e}(),G=Object.getOwnPropertyNames(U.prototype).filter((function(e){return"constructor"!==e})).map((function(e){return Object(R.startCase)(e)})),K=function(){var e=Object(u.c)((function(e){return e.data})),t=e.titles,n=e.stateKey,i=e.displayField,c=e.aggregationAction,l=Object(u.b)();Object(a.useEffect)((function(){var e=h("s"),t=h("df"),a=h("a");e!==n&&l(M(n)),(t&&t!==i||a&&a!==c)&&l(P(t,a))}),[t,n,i,c,l]);return r.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",flex:1}},(null===t||void 0===t?void 0:t.length)?r.a.createElement("div",{style:{width:"30%"}},r.a.createElement(I,{value:n,values:t,onChange:function(e){l(M(e))},label:"State Field"})):null,n?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{width:"30%"}},r.a.createElement(I,{value:i,values:t,onChange:function(e){l(P(e,c))},label:"Display Field"})),r.a.createElement("div",{style:{width:"30%"}},r.a.createElement(I,{value:c,values:G,onChange:function(e){l(P(i,e))},label:"Aggregation"}))):null)},W=n(444),X=n(173),$=n(174),H=n(175),Y=n(181),q=n(12),J=n(454),Q=Object(C.a)((function(e){return{container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200}}}));function Z(e){var t=Q();return r.a.createElement(r.a.Fragment,null,r.a.createElement(J.a,Object.assign({labelid:"date-picker-"+e.label,type:"date",className:t.textField,InputLabelProps:{shrink:!0},InputProps:{inputProps:Object(q.a)({},e)}},e)))}var ee=n(440),te=function(e,t){return e.map((function(e){return new Date(e[t])})).filter((function(e){return!isNaN(e.getTime())}))},ne=function(e){return Object(Y.a)(e,"yyyy-MM-dd")},ae=function(e){var t=e.dataField,n=Object(l.a)(e.filterValues,2),i=n[0],c=void 0===i?"":i,o=n[1],s=void 0===o?"":o,d=e.onDataFieldChange,f=e.onFilterValueChange,m=Object(u.c)((function(e){return e.data})).rawData,p=Object(a.useState)(""),v=Object(l.a)(p,2),b=v[0],g=v[1],h=Object(a.useState)(""),O=Object(l.a)(h,2),y=O[0],j=O[1],E=Object(a.useCallback)((function(e,t){f([e,t])}),[f]);if(Object(a.useEffect)((function(){try{var e=function(e,t){var n=te(e,t);return ne(Object($.a)(n))}(m,t),n=function(e,t){var n=te(e,t);return ne(Object(ee.a)(Object(H.a)(n),1))}(m,t);g(e),j(n),c&&s||E(e,n)}catch(a){g(""),j("")}}),[t,g,j,d,m,E,c,s]),!t)return null;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Z,{label:"From",min:b,max:s,value:c,onChange:function(e){var t=e.target.value;E(t,s)}}),r.a.createElement(Z,{label:"To",min:c,max:y,value:s,onChange:function(e){var t=e.target.value;E(c,t)}}))};ae.defaultProps={filterValues:[]};var re=ae,ie=function(e){var t=Object(l.a)(e.filterValues,1)[0],n=void 0===t?"":t,i=e.onFilterValueChange,c=Object(a.useState)(n),o=Object(l.a)(c,2),u=o[0],s=o[1];Object(a.useEffect)((function(){s(n)}),[n]);return r.a.createElement(Z,{label:"value",value:u,onChange:function(e){var t;(t=e.target.value)!==n&&(s(n),i([t]))}})};function ce(e){return r.a.createElement(J.a,Object.assign({style:{width:"100%",paddingBottom:"10px"}},e))}var le=function(e){var t=Object(l.a)(e.filterValues,1)[0],n=void 0===t?"":t,i=e.onFilterValueChange,c=Object(a.useState)(n),o=Object(l.a)(c,2),u=o[0],s=o[1];Object(a.useEffect)((function(){s(n)}),[n]);return r.a.createElement(ce,{label:"value",value:u,onChange:function(e){var t;(t=e.target.value)!==n&&(s(n),i([t]))}})},oe=n(176),ue=n.n(oe),se=n(441),de=n(450),fe=n(442),me=n(443),pe=Object(R.memoize)((function(e){var t="string",n=parseFloat(e),a=new Date(e);return n.toString()===e.toString()?(t="number",e=n):isNaN(a.valueOf())||(t="date",e=a),[t,e]})),ve=function(e,t,n,a,r){return function(i){if(!e)return function(){return!0};var c=pe(e),o=Object(l.a)(c,2),u=o[0],s=o[1],d=function(e,t){switch(e){case"string":return""+t;case"date":return new Date(t);case"number":return parseFloat(t);default:return t}}(u,i[t]);switch(u){case"number":return n(d,s);case"date":return a(d,s);default:return r(d,s)}}},be=function(e,t){var n=Object(R.memoize)((function(e,t){return e===t})),a=Object(R.memoize)((function(e,t){return Object(de.a)(new Date(e),t)})),r=Object(R.memoize)((function(e,t){return e===t}));return ve(t,e,n,a,r)},ge=function(e,t){var n=Object(R.memoize)((function(e,t){return e>=t})),a=Object(R.memoize)((function(e,t){return Object(fe.a)(new Date(e),t)})),r=Object(R.memoize)((function(e,t){return e>=t}));return ve(t,e,n,a,r)},he=function(e,t){var n=Object(R.memoize)((function(e,t){return e<=t})),a=Object(R.memoize)((function(e,t){return Object(me.a)(new Date(e),t)})),r=Object(R.memoize)((function(e,t){return e<=t}));return ve(t,e,n,a,r)},Oe={equals:be,greater:ge,less:he,dayOf:be,dateAfter:ge,dateBefore:he,dateBetween:function(e,t,n){return t=new Date(t),n=new Date(n),function(a){var r=new Date(a[e]);return!isNaN(r.getTime())&&Object(se.a)(r,{start:t,end:n})}}},ye=function(e){var t=Oe[e];if(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];return t.apply(void 0,a)}return null},je=Object.keys(Oe),Ee=function(e){var t=e.filterSettings,n=e.onFilterChange,i=e.onDelete,c=Object(u.c)((function(e){return e.data})).titles,o=Object(a.useState)(""),s=Object(l.a)(o,2),d=s[0],f=s[1],m=Object(a.useState)(""),p=Object(l.a)(m,2),v=p[0],b=p[1],h=Object(a.useState)(""),O=Object(l.a)(h,2),y=O[0],j=O[1];Object(a.useEffect)((function(){var e=Object(X.a)(t),n=e[0],a=void 0===n?"":n,r=e[1],i=void 0===r?"":r,c=e.slice(2);f(a),b(i),j(c)}),[t]);return r.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignContent:"flex-start",flex:1,paddingBottom:10}},r.a.createElement("div",{style:{display:"flex",flexDirection:"row",flex:1,marginRight:8}},r.a.createElement("div",null,r.a.createElement(I,{value:d,values:je,onChange:function(e){f(e)},label:"Type"})),r.a.createElement("div",null,r.a.createElement(I,{value:v,values:c,onChange:function(e){b(e)},label:"Field"}))),r.a.createElement("div",{style:{display:"flex",flexDirection:"row",flex:2,flexGrow:2}},function(e,t,n,a,i){if(!e)return null;switch(t){case"dateBetween":return r.a.createElement(re,{dataField:e,filterValues:n,onDataFieldChange:a,onFilterValueChange:i});case"equals":case"greater":case"less":return r.a.createElement("div",{style:{margin:"0px 8px 0 15px ",flex:1}},r.a.createElement(le,{filterValues:n,onFilterValueChange:i}));case"dayOf":case"dateAfter":case"dateBefore":return r.a.createElement("div",{style:{margin:"0px 8px 0 15px ",flex:1}},r.a.createElement(ie,{filterValues:n,onFilterValueChange:i}));default:return null}}(v,d,y,b,(function(e){e.toString()!==y.toString()&&(j(e),n([d,v].concat(Object(g.a)(e))))}))),r.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"flex-end"}},r.a.createElement(W.a,{onClick:function(){return i()},style:{marginBottom:"-8px"}},r.a.createElement(ue.a,{style:{padding:0}}))))},we=function(){var e=Object(u.c)((function(e){return e.data})),t=e.titles,n=e.filteringFuncitons,i=Object(a.useState)(n),c=Object(l.a)(i,2),o=c[0],s=c[1];console.log(o);var d=Object(u.b)();Object(a.useEffect)((function(){s(n)}),[n]),Object(a.useEffect)((function(){var e=h("f")||[];e.length>0&&e.toString()!==n.toString()&&d(z(e)),s(e)}),[t,d,n]);return r.a.createElement("div",{style:{display:"flex",flexDirection:"column",flex:1}},r.a.createElement("div",{style:{alignSelf:"flex-end",flex:1}},r.a.createElement(W.a,{onClick:function(){s((function(e){return[].concat(Object(g.a)(e),[[]])}))}},"add filter")),o.map((function(e,t){return r.a.createElement(Ee,{key:t,filterSettings:e,onFilterChange:function(e){return function(e,t){var n=Object(g.a)(o);n[e]=t,d(z(n))}(t,e)},onDelete:function(){return function(e){var t=Object(g.a)(o);t.splice(e,1),d(z(t))}(t)}})})))},xe=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){var t=e.data;return null===t||void 0===t?void 0:t.url})),n=Object(a.useState)(t),i=Object(l.a)(n,2),c=i[0],o=i[1];Object(a.useEffect)((function(){o(t)}),[t]),Object(a.useEffect)((function(){var t=h("url");t&&e(N(t))}),[e]);return r.a.createElement("div",{style:{width:"100%"}},r.a.createElement(ce,{label:"CSV Url",value:c,onChange:function(e){return o(e.target.value)},onBlur:function(n){var a;(a=n.target.value)!==t&&e(N(a))}}))},Ae=n(448),De=n(449),Se=n(446),Ce=n(445),ke=8,_e=46,Fe=function(e){return"undefined"===typeof(e=e||window.event).which?e.keyCode:e.which},Te=function(e){(function(e){return[37,39].indexOf(e.keyCode)>-1})(e)||function(e){return[_e,ke].indexOf(e.keyCode)>-1}(e)?e.stopPropagation():function(e){var t=Fe(e);return 13===t||9===t}(e)||function(e){var t=Fe(e),n=e.key?e.key:String.fromCharCode(t);return function(e){return!!/[0-9]*\.?[0-9]+/.test(e)}(e.target.value+n)}(e)||e.preventDefault&&e.preventDefault()},Re=Object(a.forwardRef)((function(e,t){var n=function(){var t,n=!0;return e.keyPress===ke||e.keyPress===_e?t="":e.charPress?(t=e.charPress,n=!1):(t=e.value,113===e.keyPress&&(n=!1)),{value:t,highlightAllOnFocus:n}}(),i=Object(a.useState)(n.value),c=Object(l.a)(i,2),o=c[0],u=c[1],s=Object(a.useState)(n.highlightAllOnFocus),d=Object(l.a)(s,2),f=d[0],m=d[1],p=Object(a.useRef)(null),v=e.charPress&&"1234567890.".indexOf(e.charPress)<0;return Object(a.useEffect)((function(){return window.addEventListener("keydown",Te),function(){window.removeEventListener("keydown",Te)}}),[]),Object(a.useImperativeHandle)(t,(function(){return{afterGuiAttached:function(){var e=p.current;if(e.focus(),f)e.select(),m(!1);else{var t=e.value?e.value.length:0;t>0&&e.setSelectionRange(t,t)}},getValue:function(){return o},isCancelBeforeStart:function(){return v},isCancelAfterEnd:function(){return o>1e6}}})),r.a.createElement("input",{ref:p,value:o,onChange:function(e){return u(e.target.value)},style:{width:"95%"}})})),Le=n(177),Ie=Object(a.forwardRef)((function(e,t){var n=Object(a.useState)(e.value),i=Object(l.a)(n,2),c=i[0],o=i[1],u=Object(a.useRef)(null);return Object(a.useImperativeHandle)(t,(function(){return{getValue:function(){return c},isPopup:function(){return!0}}})),r.a.createElement("div",{ref:u,style:{padding:"10px"}},r.a.createElement(Le.SketchPicker,{color:c,onChangeComplete:function(e){var t=e.hex;t&&o(t)}}))}));function Ne(e){return[e.stop,e.color]}var Pe=function(e){var t=[];return e.api.forEachNode((function(e){return t.push(e.data)})),t.map(Ne)},ze=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){var t=e.data;return null===t||void 0===t?void 0:t.url})),n=Object(u.c)((function(e){return e.options.title.text})),i=Object(u.c)((function(e){return e.options.colorAxis.min})),c=Object(u.c)((function(e){return e.options.colorAxis.max})),s=Object(u.c)((function(e){return e.options.colorAxis.stops.map((function(e,t){var n=Object(l.a)(e,2),a=n[0],r=n[1];return{stop:a,color:r,_id:t+a+r}}))})),d=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.options.colorAxis.stops.map((function(e,t){var n=Object(l.a)(e,2),a=n[0],r=n[1];return{stop:a,color:r,_id:t+a+r}}))}));return[function(t){var n=Pe(t);e(w(n))},function(){var n=[].concat(Object(g.a)(t.map(Ne)),[[0,"#000"]]);e(w(n))},function(t){t.api.applyTransaction({remove:[t.data]});var n=Pe(t);e(w(n))},function(t){e(y(t))},function(t){e(j(t))},function(t){e(E(t))}]}(),f=Object(l.a)(d,6),m=f[0],p=f[1],v=f[2],b=f[3],O=f[4],x=f[5];Object(a.useEffect)((function(){var n=h("mi");n&&n!==i&&t&&e(j(n))}),[i,t,e]),Object(a.useEffect)((function(){var n=h("ma");n&&n!==c&&t&&e(E(n))}),[c,t,e]),Object(a.useEffect)((function(){var a=h("t");a&&a!==n&&t&&e(y(a))}),[n,t,e]),Object(a.useEffect)((function(){var n=h("st"),a=s.map(Ne);n&&n.toString()!==a.toString()&&t&&e(w(n))}),[s,t,e]);return r.a.createElement("div",{style:{display:"flex",flexDirection:"column",width:"100%"}},r.a.createElement(ce,{label:"title",value:n,onChange:function(e){return b(e.target.value)}}),r.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row"}},r.a.createElement(ce,{label:"Color Axis Min",value:i,onChange:function(e){return O(e.target.value)}}),r.a.createElement(ce,{label:"Color Axis Max",value:c,onChange:function(e){return x(e.target.value)}}),r.a.createElement(W.a,{style:{width:"33%"},onClick:p},"Add stop")),r.a.createElement("div",{style:{width:"100%"}},r.a.createElement("div",{className:"ag-theme-alpine",style:{height:300,width:"100%"}},r.a.createElement(o.AgGridReact,{defaultColDef:{flex:1,minWidth:100,filter:!0,editable:!0},onGridReady:function(e){},onCellValueChanged:m,singleClickEdit:!0,frameworkComponents:{numericEditor:Re,colorEditor:Ie,deleteButton:function(){return r.a.createElement(W.a,{style:{width:"100%"}},"Delete")}},immutableData:!0,getRowNodeId:function(e){return e._id},rowData:s},r.a.createElement(o.AgGridColumn,{field:"stop",sortable:!0,editable:!0,cellEditor:"numericEditor"}),r.a.createElement(o.AgGridColumn,{flex:2,field:"color",editable:!0,cellEditor:"colorEditor",cellStyle:function(e){return{backgroundColor:null===e||void 0===e?void 0:e.value,color:"white",textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",letterSpacing:"2px"}}}),r.a.createElement(o.AgGridColumn,{headerName:"Delete",cellRenderer:"deleteButton",onCellClicked:v,editable:!1})))))},Me=Object(C.a)((function(e){return{root:{width:"100%"},heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular}}})),Ve=function(){var e=Me();return r.a.createElement(Ae.a,null,r.a.createElement(De.a,{"aria-controls":"panel1a-content",id:"panel1a-header"},r.a.createElement(Ce.a,{className:e.heading},"Data Source")),r.a.createElement(Se.a,null,r.a.createElement(xe,null)))},Be=function(){var e=Me();return r.a.createElement(Ae.a,null,r.a.createElement(De.a,{"aria-controls":"panel4a-content",id:"panel3a-header"},r.a.createElement(Ce.a,{className:e.heading},"Chart Settings")),r.a.createElement(Se.a,null,r.a.createElement(ze,null)))},Ue=function(){var e=Me();return r.a.createElement(Ae.a,{defaultExpanded:!0},r.a.createElement(De.a,{"aria-controls":"panel2a-content",id:"panel3a-header"},r.a.createElement(Ce.a,{className:e.heading},"Filters")),r.a.createElement(Se.a,null,r.a.createElement(we,null)))},Ge=function(){var e=Me();return r.a.createElement(Ae.a,{defaultExpanded:!0},r.a.createElement(De.a,{"aria-controls":"panel3a-content",id:"panel3a-header"},r.a.createElement(Ce.a,{className:e.heading},"Aggregation Settings")),r.a.createElement(Se.a,null,r.a.createElement(K,null)))},Ke=function(){var e=Object(u.c)((function(e){return e.data})),t=e.loading,n=e.titles;return r.a.createElement("div",{style:{width:"50%",padding:"10px",border:"1px solid #c4c4c4",overflow:"scroll"}},r.a.createElement(Ve,null),t?"loading...":null,!t&&n.length?r.a.createElement(Be,null):null,n.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(Ue,null),r.a.createElement(Ge,null)):null)},We=function(){return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h1",null,"US State Data Mapping Tool")),r.a.createElement("div",{style:{display:"flex",padding:"10px",justifyContent:"space-between",height:"422px"}},r.a.createElement(Ke,null),r.a.createElement(S,null)),r.a.createElement("div",{style:{flex:1,padding:"10px"}},r.a.createElement(s,null)))},Xe=n(40);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var $e={al:"al",ak:"ak",az:"az",ar:"ar",ca:"ca",co:"co",ct:"ct",de:"de",fl:"fl",ga:"ga",hi:"hi",id:"id",il:"il",in:"in",ia:"ia",ks:"ks",ky:"ky",la:"la",me:"me",md:"md",ma:"ma",mi:"mi",mn:"mn",ms:"ms",mo:"mo",mt:"mt",ne:"ne",nv:"nv",nh:"nh",nj:"nj",nm:"nm",ny:"ny",nc:"nc",nd:"nd",oh:"oh",ok:"ok",or:"or",pa:"pa",ri:"ri",sc:"sc",sd:"sd",tn:"tn",tx:"tx",ut:"ut",vt:"vt",va:"va",wa:"wa",wv:"wv",wi:"wi",wy:"wy",alabama:"al",alaska:"ak",arizona:"az",arkansas:"ar",california:"ca",colorado:"co",connecticut:"ct",delaware:"de",florida:"fl",georgia:"ga",hawaii:"hi",idaho:"id",illinois:"il",indiana:"in",iowa:"ia",kansas:"ks",kentucky:"ky",louisiana:"la",maine:"me",maryland:"md",massachusetts:"ma",michigan:"mi",minnesota:"mn",mississippi:"ms",missouri:"mo",montana:"mt",nebraska:"ne",nevada:"nv",newhampshire:"nh",newjersey:"nj",newmexico:"nm",newyork:"ny",northcarolina:"nc",northdakota:"nd",ohio:"oh",oklahoma:"ok",oregon:"or",pennsylvania:"pa",rhodeisland:"ri",southcarolina:"sc",southdakota:"sd",tennessee:"tn",texas:"tx",utah:"ut",vermont:"vt",virginia:"va",washington:"wa",westvirginia:"wv",wisconsin:"wi",wyoming:"wy",ala:"al",ariz:"az",ark:"ar",calif:"ca",colo:"co",conn:"ct",del:"de",fla:"fl",ill:"il",ind:"in",kans:"ks",mass:"ma",mich:"mi",minn:"mn",miss:"ms",mont:"mt",neb:"ne",nebr:"ne",nev:"nv",nmex:"nm",ndak:"nd",okla:"ok",ore:"or",oreg:"or",sdak:"sd",tenn:"tn",tex:"tx",wash:"wa",wva:"wv",wis:"wi",wisc:"wi",wyo:"wy"},He=function(e,t){if(!e)return[];var n=t.reduce((function(t,n){if(!n[e])return t;var a=Ye(n[e]);return a?(t[a]||(t[a]=[a,[]]),t[a][1].push(n),t):t}),{});return Object.values(n)},Ye=function(e){if("string"!==typeof e)return null;var t=$e[e.toLowerCase().replace(/[^a-z]/gim,"")];return t?"us-"+t:null},qe=function(e,t){if(0===t.length)return e;var n=t.map((function(e){return ye.apply(void 0,Object(g.a)(e))})).filter(Boolean);return e.filter((function(e){return n.every((function(t){return t(e)}))}))},Je=function(e,t,n){return n&&t?(n=Object(R.camelCase)(n),e.map((function(e){var a=Object(l.a)(e,2),r=a[0],i=a[1],c=new U(i,t);return[r,c[n](),c]}))):[]},Qe=function(e,t){return t&&Array.isArray(e)?(t=Object(R.camelCase)(t),e.map((function(e){var n=Object(l.a)(e,3),a=n[0],r=(n[1],n[2]);return[a,r[t](),r]}))):[]},Ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=e.slice(0,e.indexOf("\n")).split(t).map((function(e){return e.replace(/^"(.+(?="$))"$/,"$1")})),a=e.slice(e.indexOf("\n")+1).split("\n");return[n,a.map((function(e){var a=e.split(t);return n.reduce((function(e,t,n){return a[n]&&(e[t]=a[n].replace(/^"(.+(?="$))"$/,"$1")),e}),{})}))]},et={url:"",titles:[],rawData:[],filteredData:[],stateKey:"",groupData:[],displayField:"",aggregationAction:"",filteringFuncitons:[],mapData:[],loading:!1},tt={chart:{map:n(178)},title:{text:""},mapNavigation:{enabled:!0},colorAxis:{min:0,max:1,stops:[[0,"#00FF00"],[.5,"#FFF"],[1,"#C40401"]]},series:[{name:"Separators",type:"mapline",color:"silver",nullColor:"silver",showInLegend:!1,enableMouseTracking:!1}]},nt=n(182),at=n(69),rt=n.n(at),it=n(179),ct=n.n(it),lt=function(e){return function(e){var t;try{t=new URL(e)}catch(n){return!1}return"http:"===t.protocol||"https:"===t.protocol}(e)?ct.a.get("https://map-dashboard-cors.herokuapp.com/".concat(e),{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Access-Control-Allow-Headers"}}):Promise.reject("invalid url")};var ot=n(42),ut=rt.a.mark(dt),st=rt.a.mark(ft);function dt(e){var t,n,a,r,i,c,o,u;return rt.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,Object(ot.c)({type:"REQUEST_DATA"});case 3:return t=e.payload.url,O("url",t),s.next=7,Object(ot.b)(lt,t);case 7:return n=s.sent,a=n.data,s.next=11,Object(ot.b)(Ze,a);case 11:return r=s.sent,i=Object(l.a)(r,2),c=i[0],o=i[1],u=c.find((function(e){return Ye((o[0]||{})[e])}))||"",s.next=18,Object(ot.c)({type:"LOAD_DATA_SUCCESS",payload:{url:t,titles:c,rawData:o,filteredData:o,groupData:He(u,o),mapData:[],stateKey:u}});case 18:s.next=24;break;case 20:return s.prev=20,s.t0=s.catch(0),s.next=24,Object(ot.c)({type:"LOAD_DATA_FAILURE",message:s.t0.message});case 24:case"end":return s.stop()}}),ut,null,[[0,20]])}function ft(){return rt.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ot.a)([Object(ot.d)("LOAD_DATA_SAGA",dt)]);case 2:case"end":return e.stop()}}),st)}var mt=ft,pt=Object(nt.a)(),vt=Object(Xe.e)(Object(Xe.c)({data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:et,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REQUEST_DATA":return Object(q.a)(Object(q.a)({},et),{},{loading:!0});case"LOAD_DATA_SUCCESS":return Object(q.a)(Object(q.a)({},et),{},{loading:!1},t.payload);case"LOAD_DATA_FAILURE":return Object(q.a)(Object(q.a)({},et),{},{loading:!1});case"SET_STATE_AND_GROUP":return Object(q.a)(Object(q.a)({},e),{},{stateKey:t.payload.stateKey,groupData:He(t.payload.stateKey,e.filteredData),mapData:[]});case"SET_DISPLAY_FIELD":var n=e.displayField&&e.aggregationAction&&t.payload.displayField===e.displayField;return Object(q.a)(Object(q.a)({},e),{},{displayField:t.payload.displayField,aggregationAction:t.payload.aggregationAction,mapData:n?Qe(e.mapData,t.payload.aggregationAction):Je(e.groupData,t.payload.displayField,t.payload.aggregationAction)});case"ADD_FILTERS":var a=t.payload.filteringFuncitons,r=qe(e.rawData,a),i=He(e.stateKey,r);return Object(q.a)(Object(q.a)({},e),{},{filteringFuncitons:a,filteredData:r,groupData:i,mapData:Je(i,e.displayField,e.aggregationAction)});case"APPLY_FILTERS":return Object(q.a)(Object(q.a)({},e),{},{mapData:t.payload.mapData});default:return e}},options:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TITLE":return Object(q.a)(Object(q.a)({},e),{},{title:t.payload});case"SET_COLOR_AXIS_MAX":case"SET_COLOR_AXIS_MIN":return Object(q.a)(Object(q.a)({},e),{},{colorAxis:Object(q.a)(Object(q.a)({},e.colorAxis),t.payload)});case"SET_COLOR_AXIS_STOPS":return Object(q.a)(Object(q.a)({},e),{},{colorAxis:Object(q.a)(Object(q.a)({},e.colorAxis),{},{stops:t.payload.stops})});case"SET_MAP_DATA":return Object(q.a)(Object(q.a)({},e),{},{colorAxis:Object(q.a)(Object(q.a)({},e.colorAxis),t.payload.colorAxis),series:[Object(q.a)({},e.series[0]),Object(q.a)({dataLabels:{enabled:!0,format:"{point.name}"}},t.payload.series)]});default:return e}}}),Object(Xe.a)(pt));pt.run(mt),c.a.render(r.a.createElement(u.a,{store:vt},r.a.createElement(We,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[195,1,2]]]);
//# sourceMappingURL=main.4ff81a8f.chunk.js.map