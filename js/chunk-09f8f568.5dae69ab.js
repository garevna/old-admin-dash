(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09f8f568"],{"40dc":function(t,e,i){"use strict";i("a9e3"),i("b680"),i("c7cd");var o=i("5530"),r=(i("8b0d"),i("71d9")),n=i("f977"),c=i("3a66"),s=i("277e"),l=i("d10f"),a=i("f2e7"),d=i("80d2"),h=i("58df"),u=Object(h["a"])(r["a"],s["a"],l["a"],a["a"],Object(c["a"])("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"]));e["a"]=u.extend({name:"v-app-bar",directives:{Scroll:n["b"]},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return s["a"].options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(o["a"])(Object(o["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},computedContentHeight:function(){if(!this.shrinkOnScroll)return r["a"].options.computed.computedContentHeight.call(this);var t=this.computedOriginalHeight,e=this.dense?48:56,i=t,o=i-e,n=o/this.computedScrollThreshold,c=this.currentScroll*n;return Math.max(e,i-c)},computedFontSize:function(){if(this.isProminent){var t=this.dense?96:128,e=t-this.computedContentHeight,i=.00347;return Number((1.5-e*i).toFixed(2))}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll){var t=Math.max((this.computedScrollThreshold-this.currentScroll)/this.computedScrollThreshold,0);return Number(parseFloat(t).toFixed(2))}},computedOriginalHeight:function(){var t=r["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:r["a"].options.computed.isCollapsed.call(this)},isProminent:function(){return r["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(o["a"])(Object(o["a"])({},r["a"].options.computed.styles.call(this)),{},{fontSize:Object(d["f"])(this.computedFontSize,"rem"),marginTop:Object(d["f"])(this.computedMarginTop),transform:"translateY(".concat(Object(d["f"])(this.computedTransform),")"),left:Object(d["f"])(this.computedLeft),right:Object(d["f"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=r["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render:function(t){var e=r["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}})},"4b85":function(t,e,i){},"8b0d":function(t,e,i){},9457:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-app-bar",{attrs:{app:"","elevate-on-scroll":""}},[i("v-toolbar",{staticClass:"transparent",attrs:{flat:""}},[i("v-toolbar-title",[t._v(" "+t._s(t.title)+" ")]),i("v-spacer"),i("Menu",{attrs:{options:t.menuOptions,goto:t.goto},on:{"update:goto":function(e){t.goto=e}}})],1)],1),i("v-container",["services"===t.goto?i("Services"):t._e(),"orders"===t.goto?i("ServiceOrders"):t._e()],1)],1)},r=[],n=(i("7db0"),i("d3b7"),{name:"Other",props:[],components:{Menu:function(){return Promise.all([i.e("chunk-c701815e"),i.e("chunk-ae161484")]).then(i.bind(null,"fb62"))},Services:function(){return i.e("chunk-b9e83010").then(i.bind(null,"c1c7"))},ServiceOrders:function(){return Promise.all([i.e("chunk-637a29e2"),i.e("chunk-07d86b82"),i.e("chunk-b691f0be"),i.e("chunk-37a19e83")]).then(i.bind(null,"0a91"))}},data:function(){return{menuOptions:[{text:"Services",value:"services"},{text:"Service Orders",value:"orders"},{text:"Buildings API",value:"buildings"},{text:"Pits API",value:"wells"}],goto:"sevices"}},computed:{selectedMenuItem:function(){var t=this;return this.menuOptions.find((function(e){return e.value===t.goto}))},title:function(){return this.selectedMenuItem?this.selectedMenuItem.text:""}},watch:{goto:{immediate:!0,handler:function(t){"buildings"===t&&window.open("https://garevna.github.io/dgtek-buildings-api/")}}},methods:{}}),c=n,s=i("2877"),l=i("6544"),a=i.n(l),d=i("40dc"),h=i("a523"),u=i("2fa4"),p=i("71d9"),f=i("2a7f"),m=Object(s["a"])(c,o,r,!1,null,null,null);e["default"]=m.exports;a()(m,{VAppBar:d["a"],VContainer:h["a"],VSpacer:u["a"],VToolbar:p["a"],VToolbarTitle:f["a"]})},a523:function(t,e,i){"use strict";i("99af"),i("4de4"),i("b64b"),i("2ca0"),i("20f6"),i("4b85"),i("a15b"),i("498a");var o=i("2b0e");function r(t){return o["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,i){var o=i.props,r=i.data,n=i.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var c=r.attrs;if(c){r.attrs={};var s=Object.keys(c).filter((function(t){if("slot"===t)return!1;var e=c[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return o.id&&(r.domProps=r.domProps||{},r.domProps.id=o.id),e(o.tag,r,n)}})}var n=i("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,o=e.props,r=e.data,c=e.children,s=r.attrs;return s&&(r.attrs={},i=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),o.id&&(r.domProps=r.domProps||{},r.domProps.id=o.id),t(o.tag,Object(n["a"])(r,{staticClass:"container",class:Array({"container--fluid":o.fluid}).concat(i||[])}),c)}})}}]);
//# sourceMappingURL=chunk-09f8f568.5dae69ab.js.map