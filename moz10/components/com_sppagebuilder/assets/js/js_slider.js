"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function _defineProperty(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}!function(t,i,e,s){var n="jsSlider";function a(i,e){this.element=i,this._name=n,this.item=null,this.delta=1,this.isAnimating=!1,this.isDragging=!1,this.timer=0,this._timeoutId1=0,this._timeoutId2=0,this._dotControllerTimeId=0,this._lastViewPort=0,this.captionAnimationProperty={direction:"left",from:"100%",to:"0",type:"slide",duration:800,after:0,origin:"50% 50% 0",timing_function:"cubic-bezier(0, 0.46, 0, 0.63)"},this.coordinate={x:0,y:0},this.prevCoordinate={x:0,y:0,diff:0,dragPointer:-1},this._defaults=t.fn.jsSlider.defaults,this.options=t.extend({},this._defaults,e),2!==this.options.nav_text.length&&(console.warn("navtext must be need two control element!"),this.options.nav_text=["<",">"]),this.init()}t.extend(a.prototype,{init:function(){this.buildCache(),this.createHtmlDom(),this.applyBasicStyle(),this.items>1&&this.bindEvents(),this.triggerOnStart(),this.options.autoplay&&this.startLoop()},triggerOnStart:function(){if(this.updateCaption(),this.options.indicator&&this.animateIndicator("start"),this.options.dot_indicator&&this.options.dots){var t=this.$dotContainer.find("li.active");this.animateDotIndicator(t,"start")}},destroy:function(){this.unbindEvents(),this.$element.removeData()},buildCache:function(){this.$element=t(this.element)},unbindEvents:function(){this.$element.off("."+this._name)},createHtmlDom:function(){if(this.createOuterStage(),0===this.$element.find(".sp-item.active").length&&this.$element.find(".sp-item:first-child").addClass("active"),this.item=this.$element.find(".sp-item.active"),this.options.nav&&this.createNavigationController(),this.options.dots&&this.createDotsController(),this.options.indicator&&this.createIndicator(),this.options.show_number&&this.createSliderNumber(),2===this.$element.find(".sp-item").length){var t=this.$element.find(".sp-item").clone();t.removeClass("active"),this.$outerStage.append(t)}},createOuterStage:function(){this.outerStage=e.createElement("div"),this.outerStage.setAttribute("class","sp-slider-outer-stage");var i=t(this.outerStage);this.$element.find(".sp-item").each(function(t,e){i.append(e)}),this.$element.append(i),this.$outerStage=i},createNavigationController:function(){var i=e.createElement("div");i.setAttribute("class","sp-nav-control"),this.$element.append(i),this.nextBtn=e.createElement("span"),this.nextBtn.setAttribute("class","next-control nav-control"),this.prevBtn=e.createElement("span"),this.prevBtn.setAttribute("class","prev-control nav-control"),i.append(this.nextBtn),i.append(this.prevBtn),this.nextBtn.innerHTML=this.options.nav_text[1],this.prevBtn.innerHTML=this.options.nav_text[0],this.$nextBtn=t(this.nextBtn),this.$prevBtn=t(this.prevBtn)},createDotsController:function(){var i=e.createElement("div");i.setAttribute("class","sp-dots"),this.$element.append(i);var s=this,n=e.createElement("ul");this.$element.find(".sp-item").each(function(i,a){var o=e.createElement("li");if(o.setAttribute("class","sp-dot-"+i),s.options.dot_indicator){var r=e.createElement("span");r.setAttribute("class","dot-indicator"),o.append(r)}t(a).hasClass("active")&&o.classList.add("active"),n.append(o)}),i.append(n),this.$element.append(i),this.$dotContainer=t(n)},createIndicator:function(){var i=this,s="circle"===this.options.indicator_type?"circles-indicator":"line-indicator",n=function(){var n=e.createElement("div");n.setAttribute("class","sp-indicator-container"),i.$element.append(n),i.indicator=e.createElement("div"),i.indicator.setAttribute("class","sp-indicator "+s),t(n).append(i.indicator),i.$indicator=t(i.indicator)};""===this.options.indicator_class?"circle"===this.options.indicator_type||n():this.$element.find(this.options.indicator_class).length>0?(this.$indicator=this.$element.find(this.options.indicator_class),this.$indicator.addClass(s)):n()},createSliderNumber:function(){var i=this,s=function(){var s=e.createElement("div");s.setAttribute("class","sp-slider_number"),i.$element.append(s),i.$slider_number=t(s)};""===this.options.slider_number_class?s():this.$element.find(this.options.slider_number_class).length>0?this.$slider_number=this.$element.find(this.options.slider_number_class):s(),this.$slider_number.append('<span class="sp-slider_current_number"> </span>')},updateSliderNumber:function(){!0===this.options.show_number&&this.$slider_number.find(".sp-slider_current_number").html(("0"+(this.item.index()+1)).slice(-2))},applyBasicStyle:function(){this.outerWidth=this.$outerStage.outerWidth();var i=0,e=this.options.speed,s=this.options.animations,n=this;this.$element.find(".sp-item").each(function(){if(i++,t(this).css({"-webkit-transition-duration":e+"ms"}),"fade"===s&&(t(this).css({opacity:0}),t(this).hasClass("active")&&t(this).css({opacity:1})),"zoomOut"===s&&(t(this).hasClass("active")||t(this).css({"-webkit-transform":"scale3D(.8,.8,.8)"})),"clip"===s&&(t(this).hasClass("active")?t(this).css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(0,0,0)",clip:"rect(auto, "+n.outerWidth+"px, auto, 0px)",zIndex:2,opacity:1}):t(this).css({"-webkit-transition-duration":n.options.speed+"ms","-webkit-transform":"translate3D(0,0,0)",clip:"rect(auto, 0, auto, 0px)",opacity:0,zIndex:1})),"bubble"===s)if(t(this).hasClass("active"))t(this).css({"-webkit-transition-duration":"0s","-webkit-transform":"scale3D(1,1,1)","clip-path":"circle(100% at 50% 50%)",zIndex:2,visibility:"visible",opacity:1});else{var a=Math.floor(50*Math.random())+20,o=Math.floor(40*Math.random())+20;t(this).css({"-webkit-transition-duration":"0s","-webkit-transform":"scale3D(0,0,0)","clip-path":"circle("+n.options.bubble_size+" at "+a+"% "+o+"%)",opacity:0,visibility:"visible",zIndex:1})}}),"3D"!==s&&"3d"!==s||(this.$element.addClass("on-3d-active"),this.add3DHook()),"clip"===s&&this.$element.addClass("sp-clip-slider"),"bubble"===s&&this.$element.addClass("sp-bubble-slider"),"stack"===s&&this.$element.addClass("sp-stack-slider"),"slide"===s&&this.$element.addClass("sp-basic-slider"),"fade"===s&&this.$element.addClass("sp-fade-slider"),this.items=i,this.updateResponsiveView(),this.updateSliderNumber()},add3DHook:function(){var t=this.options.rotate,i=this.$element.find(".sp-item.active");i.css({zIndex:3,"-webkit-transition-duration":"0s","-webkit-transform":"translate3d(0, 0, -200px)"}),i.next(".sp-item").addClass("next-3d").css({zIndex:2,opacity:1,visibility:"visible","-webkit-transition-duration":"0s","-webkit-transform":"translate3d(100%, 0,-400px) rotate3d(0,-1,0,"+t+"deg)"}),this.$element.find(".sp-item:last-child").addClass("prev-3d").css({zIndex:2,opacity:1,visibility:"visible","-webkit-transition-duration":"0s","-webkit-transform":"translate3d(-100%, 0,-400px) rotate3d(0,-1,0,"+-t+"deg)"})},startLoop:function(){var t=this;this.timer=setInterval(function(){!1===t.isAnimating&&t.Next()},this.options.interval)},stopLoop:function(){clearInterval(this.timer),this.timer=0},Next:function(){this.isAnimating=!0,-1===this.delta&&(this.delta=1);var t="",i="";"3D"!==this.options.animations&&((t=this.$element.find(".sp-item.active")).addClass("prev-item"),i=t.next(".sp-item").length?t.next(".sp-item").addClass("active next-item"):this.$element.find(".sp-item:first-child").addClass("active next-item")),"3d"!==this.options.animations&&"3D"!==this.options.animations||(t=this.$element.find(".sp-item.active"),i=this.$element.find(".next-3d")),this.item=i,this.updateSliderNumber(),this.updateDotsController(),"3D"!==this.options.animations&&this.updateItemStyle(t,i),"3D"===this.options.animations&&this.update3DItemStyle(t,i)},Prev:function(){this.isAnimating=!0,1===this.delta&&(this.delta=-1);var t="",i="";"3D"!==this.options.animations&&((i=this.$element.find(".sp-item.active")).addClass("prev-item"),t=i.prev(".sp-item").length?i.prev(".sp-item").addClass("active next-item"):this.$element.find(".sp-item:last-child").addClass("active next-item")),"3d"!==this.options.animations&&"3D"!==this.options.animations||(i=this.$element.find(".sp-item.active"),t=this.$element.find(".prev-3d")),this.item=t,this.updateSliderNumber(),this.updateDotsController(),"3D"!==this.options.animations&&this.updateItemStyle(i,t),"3D"===this.options.animations&&this.update3DItemStyle(i,t)},slideFromPosition:function(t,i){var e=this;this.isAnimating=!0;var s="",n="";if("3D"!==this.options.animations&&(s=this.$element.find(".sp-item.active").addClass("prev-item"),n=this.$element.find(".sp-item:nth-child("+t+")").addClass("active next-item")),"3D"===this.options.animations){var a=function(){if(1===i){s=e.$element.find(".sp-item.active"),n=e.$element.find(".next-3d");var a=s.index(),o=Math.abs(a-t);if(2===o)return e.Next(),{v:void 0};for(var r=function(t){setTimeout(function(){1!==t&&(s=e.$element.find(".sp-item.active"),n=e.$element.find(".next-3d")),e.update3DItemStyle(s,n,300)},300*t)},d=1;d<o;d++)r(d)}if(-1===i){s=e.$element.find(".sp-item.active"),n=e.$element.find(".prev-3d");var l=s.index()+1,c=Math.abs(l-(t-1));if(2===c)return e.Prev(),{v:void 0};var m=function(t){setTimeout(function(){1!==t&&(s=e.$element.find(".sp-item.active"),n=e.$element.find(".prev-3d")),e.update3DItemStyle(s,n,300)},300*t)};for(d=1;d<c;d++)m(d)}}();if("object"===(void 0===a?"undefined":_typeof(a)))return a.v}this.item=n,this.updateSliderNumber(),this.delta=i,"3D"!==this.options.animations&&this.updateItemStyle(s,n)},updateDotsController:function(){var t=this;if(this.options.dots){var i=this.$dotContainer.find("li.active"),e="";i.removeClass("active"),1===this.delta&&(e=i.next("li").length?i.next("li").addClass("active"):this.$dotContainer.find("li:first-child").addClass("active")),-1===this.delta&&(e=i.prev("li").length?i.prev("li").addClass("active"):this.$dotContainer.find("li:last-child").addClass("active")),this.options.dot_indicator&&(this.animateDotIndicator(i,"stop"),this._dotControllerTimeId>0&&(clearTimeout(this._dotControllerTimeId),this._dotControllerTimeId=0),this._dotControllerTimeId=setTimeout(function(){t.animateDotIndicator(e,"start")},this.options.speed)),e.css({"-webkit-transition":"all 0.5s linear 0s"})}},updateDotsFromPosition:function(t){var i=this,e=this.$dotContainer.find("li.active").removeClass("active"),s=this.$dotContainer.find("li:nth-child("+t+")").addClass("active");this.options.dot_indicator&&(this.animateDotIndicator(e,"stop"),this._dotControllerTimeId>0&&(clearTimeout(this._dotControllerTimeId),this._dotControllerTimeId=0),this._dotControllerTimeId=setTimeout(function(){i.animateDotIndicator(s,"start")},this.options.speed)),s.css({"-webkit-transition":"all 0.5s linear 0s"})},animateDotIndicator:function(t,i){if("stop"===i&&t.find(".dot-indicator").removeClass("active").css({"-webkit-transition-duration":"0s"}),"start"===i){var e=Math.abs(this.options.interval-this.options.speed);t.find(".dot-indicator").addClass("active").css({"-webkit-transition-duration":e+"ms"})}},animateIndicator:function(t){if(this.options.indicator){var i=Math.abs(this.options.interval-this.options.speed);"line"===this.options.indicator_type&&("start"===t&&this.$indicator.css({"-webkit-transition-duration":i+"ms",width:"100%"}),"stop"===t&&this.$indicator.css({"-webkit-transition-duration":"0s",width:"0"})),"circle"===this.options.indicator_type&&"stop"===t&&this.$indicator.removeClass("start")}},update3DItemStyle:function(t,i){var e=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=null===s?this.options.speed:s,a=this.options.rotate;if(this.animateIndicator("stop"),-1===this.delta){this.$element.find(".next-3d").removeClass("next-3d").css({opacity:0,visibility:"hidden"});(i.prev(".sp-item").length>0?i.prev(".sp-item"):this.$element.find(".sp-item:last-child")).addClass("prev-3d").css({opacity:1,zIndex:1,visibility:"visible","-webkit-transition-duration":"0s","-webkit-transform":"translate3d(-100%, 0,-400px) rotate3d(0,-1,0,"+-a+"deg)"}),i.addClass("active").removeClass("prev-3d").css({zIndex:3,opacity:1,visibility:"visible","-webkit-transition-duration":n+"ms","-webkit-transform":"translate3d(0, 0,-200px) rotate3d(0,0,0,0deg)"}),t.addClass("next-3d").removeClass("active").css({zIndex:1,opacity:1,visibility:"visible","-webkit-transition-duration":n+"ms","-webkit-transform":"translate3d(100%, 0,-400px) rotate3d(0,-1,0,"+a+"deg)"})}if(1===this.delta){this.$element.find(".prev-3d").removeClass("prev-3d").css({opacity:0,visibility:"hidden"});(i.next(".sp-item").length>0?i.next(".sp-item"):this.$element.find(".sp-item:first-child")).addClass("next-3d").css({opacity:1,visibility:"visible","-webkit-transition-duration":"0s","-webkit-transform":"translate3d(100%, 0,-400px) rotate3d(0,-1,0,"+a+"deg)"}),i.addClass("active").removeClass("next-3d").css({zIndex:3,opacity:1,visibility:"visible","-webkit-transition-duration":n+"ms","-webkit-transform":"translate3d(0, 0,-200px) rotate3d(0,0,0,0deg)"}),t.addClass("prev-3d").removeClass("active").css({zIndex:1,opacity:1,visibility:"visible","-webkit-transition-duration":n+"ms","-webkit-transform":"translate3d(-100%, 0,-400px) rotate3d(0,-1,0,"+-a+"deg)"})}this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){e.isAnimating=!1,e.animateIndicator("start")},n),this.options.autoplay&&0===this.timer&&this.startLoop(),this.updateCaption()},updateItemStyle:function(t,i){var e=this;if(this.animateIndicator("stop"),"fade"===this.options.animations&&(t.removeClass("active"),i.css({opacity:1}),this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){t.css({opacity:0}),i.removeClass("next-item"),t.removeClass("prev-item"),e.animateIndicator("start")},this.options.speed),this.isAnimating=!1),"slide"===this.options.animations){var s=-1===this.prevCoordinate.dragPointer?0:this.prevCoordinate.dragPointer,n=-1===this.delta?"-"+(100-s):100-s,a=-1===this.delta?100:-100;i.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+n+"%,0,0)"}),this._timeoutId1&&(clearTimeout(this._timeoutId1),this._timeoutId1=0),this._timeoutId1=setTimeout(function(){i.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform":"translate3D(0,0,0)"}),t.css({"-webkit-transition-duration":e.options.speed+1500+"ms","-webkit-transform":"translate3D("+a+"%,0,0)"})},50),this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){e.isAnimating=!1,t.removeClass("active"),e.$element.find(".next-item").removeClass("next-item"),e.$element.find(".prev-item").removeClass("prev-item"),t.css(_defineProperty({"-webkit-transition-duration":"1s","-webkit-transform":"translateX(100%)"},"-webkit-transform","translate3D(100%,0,0)")),e.animateIndicator("start")},this.options.speed+100)}if("zoomOut"===this.options.animations||"zoomIn"===this.options.animations){var o=this.options.animations;"zoomIn"===o&&(this.delta=-1*this.delta),this._timeoutId1&&(clearTimeout(this._timeoutId1),this._timeoutId1=0),-1===this.delta&&(i.css({"-webkit-transition-duration":"0s","-webkit-transform":"scale3d(1.4,1.4,1.4)",opacity:0}),this._timeoutId1=setTimeout(function(){t.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d(0.8,0.8,0.8) ",opacity:0,zIndex:2}),i.css({"-webkit-transition-duration":e.options.speed+"ms",opacity:1,"-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d(1,1,1)",zIndex:1})},100)),1===this.delta&&(i.css({"-webkit-transition-duration":"0s","-webkit-transform":"scale3d(0.8,0.8,0.8)"}),this._timeoutId1=setTimeout(function(){t.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d(1.4,1.4,1.4) ",opacity:0,zIndex:1}),i.css({"-webkit-transition-duration":e.options.speed-100+"ms",opacity:1,"-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d(1,1,1)",zIndex:2})},100)),this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){t.removeClass("active"),i.removeClass("next-item"),t.removeClass("prev-item"),e.isAnimating=!1,e.animateIndicator("start")},this.options.speed+100)}if("stack"===this.options.animations){this._timeoutId1&&(clearTimeout(this._timeoutId1),this._timeoutId1=0);var r=-1===this.prevCoordinate.dragPointer?0:this.prevCoordinate.dragPointer;if(1===this.delta){var d=100-r,l={tx:d+"%",ty:0,tz:0,sx:1,sy:1,sz:1},c={tx:0,ty:0,tz:0,sx:1,sy:1,sz:1};!0===this.options.vertical_mode&&(l=Object.assign({},l,{tx:0,ty:d+"%",sx:1.2,sy:1.2,sz:1.2}),c=Object.assign({},c,{tx:0,ty:"-"+d+"%",sx:1.2,sy:1.2,sz:1.2})),i.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+l.tx+","+l.ty+","+l.tz+") scale3D("+l.sx+","+l.sy+","+l.sz+")"}),this._timeoutId1=setTimeout(function(){i.css({"-webkit-transition-duration":e.options.speed+"ms",opacity:1,"-webkit-transform":"translate3D(0,0,0) scale3d(1,1,1)",zIndex:2}),t.css({"-webkit-transition-duration":e.options.speed+200+"ms","-webkit-transform":"perspective(1000px) translate3D("+c.tx+","+c.ty+","+c.tz+") scale3d("+c.sx+","+c.sy+","+c.sz+")",opacity:.5,zIndex:1})},50)}if(-1===this.delta){var m=r-100,h={tx:m+"%",ty:0,tz:0,sx:1,sy:1,sz:1},p={tx:0,ty:0,tz:0,sx:1,sy:1,sz:1};this.options.vertical_mode&&(h=Object.assign({},h,{tx:0,ty:m+"%",sx:1,sy:1,sz:1}),p=Object.assign({},p,{tx:0,ty:-m+"%",sx:1.2,sy:1.2,sz:1.2})),i.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+h.tx+","+h.ty+","+h.tz+") scale3D("+h.sx+","+h.sy+","+h.sz+")"}),this._timeoutId1=setTimeout(function(){i.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform":"translate3D(0,0,0) ",opacity:1,zIndex:2}),t.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform":"translate3D("+p.tx+","+p.ty+","+p.tz+") scale3d("+p.sx+","+p.sy+","+p.sz+")",opacity:.5,zIndex:1})},50)}this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){t.removeClass("active"),i.removeClass("next-item"),t.removeClass("prev-item"),e.isAnimating=!1,e.animateIndicator("start")},this.options.speed+100)}if("clip"===this.options.animations){var u=-1===this.prevCoordinate.dragPointer?0:this.prevCoordinate.dragPointer,f=0,v=5;if(-1!==this.prevCoordinate.dragPointer){f=(f=.001*u)>1?1:Math.abs(f);var b=v-Math.abs(u*(v/800));v=b>v?v:b<0?0:b}this._timeoutId1&&(clearTimeout(this._timeoutId1),this._timeoutId1=0),1===this.delta&&(i.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+v+"%,0,0)",clip:"rect(auto, "+this.outerWidth+"px, auto, 0px)",zIndex:2,opacity:f}),this._timeoutId1=setTimeout(function(){t.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform":"translate3D(0,0,0)",clip:"rect(auto, 0px, auto,  0px)",opacity:1,zIndex:3}),i.css({"-webkit-transition-duration":e.options.speed+"ms",opacity:1,"-webkit-transform":"translate3D(0,0,0)"})},100)),-1===this.delta&&(i.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(-"+v+"%,0,0)",clip:"rect(auto, "+this.outerWidth+"px, auto, 0px)",zIndex:2,opacity:f}),this._timeoutId1=setTimeout(function(){t.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform":"translate3D(0,0,0)",clip:"rect(auto, "+e.outerWidth+"px, auto, "+e.outerWidth+"px)",opacity:1,zIndex:3}),i.css({"-webkit-transition-duration":e.options.speed+"ms",opacity:1,"-webkit-transform":"translate3D(0,0,0)"})},100)),t.removeClass("active"),this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){i.removeClass("next-item"),t.removeClass("prev-item"),e.isAnimating=!1,e.animateIndicator("start")},this.options.speed)}if("bubble"===this.options.animations){t.css({zIndex:1}),1===this.delta&&i.css({"-webkit-transition-duration":".25s","-webkit-transform":"scale3D(1,1,1)","-webkit-transition-timing-function":"cubic-bezier(1, 0.26, 0.18, 1.22)",zIndex:2,opacity:1}),-1===this.delta&&i.css({"-webkit-transition-duration":".25s","-webkit-transform":"scale3D(1,1,1)","-webkit-transition-timing-function":"cubic-bezier(1, 0.26, 0.18, 1.22)",zIndex:2,opacity:1}),this._timeoutId1=setTimeout(function(){i.css({"-webkit-transition-duration":e.options.speed+"ms","-webkit-transform":"scale3D(1,1,1)","-webkit-transition-timing-function":"linear",opacity:1,"clip-path":"circle(100% at 50% 50%)"})},500),this._timeoutId2&&(clearTimeout(this._timeoutId2),this._timeoutId2=0),this._timeoutId2=setTimeout(function(){var s=Math.floor(50*Math.random())+20,n=Math.floor(40*Math.random())+20;t.css({"-webkit-transition-duration":"0s","-webkit-transform":"scale3D(0,0,0)","clip-path":"circle("+e.options.bubble_size+" at "+s+"% "+n+"%)",opacity:1,visibility:"visible",zIndex:1}),t.removeClass("active"),i.removeClass("next-item"),t.removeClass("prev-item"),e.isAnimating=!1,e.animateIndicator("start")},this.options.speed+500)}this.options.autoplay&&0===this.timer&&this.startLoop(),this.updateCaption()},hideOtherItemCaptions:function(){var i=this,e=function(e){var s=t(e).find('[data-layer="true"]');s.length>0&&s.each(function(e,s){var n=i.options.speed;t(s).css({transition:"opacity "+n+"ms linear",opacity:0}),setTimeout(function(){t(s).css({visibility:"hidden"})},i.options.speed)})};this.item.next(".sp-item").length>0&&this.item.nextAll(".sp-item").each(function(t,i){e(i)});this.item.prev(".sp-item").length>0&&this.item.prevAll(".sp-item").each(function(t,i){e(i)})},updateCaption:function(){var i=this.item.find('[data-layer="true"]');if(this.hideOtherItemCaptions(),i.length>0){var e=this,s=this.captionAnimation();i.each(function(i){t(this).css({visibility:"visible"});var n=t(this).attr("data-animation");if(void 0!==n){var a=Object.assign({},e.captionAnimationProperty);void 0!==n&&(n=JSON.parse(n)),(n=Object.assign(a,n)).after=parseInt(n.after),"width"===n.type&&s.width(t(this),n),"text-animate"===n.type&&s.text(t(this),n),"slide"===n.type&&s.slider(t(this),n),"zoom"===n.type&&s.zoom(t(this),n),"rotate"===n.type&&s.rotate(t(this),n),"flip"===n.type&&s.flip(t(this),n)}})}},captionAnimation:function(){var i={text:function(i,e){var s="0px",n="0px";if("top"===e.direction&&(n="-500px"),"bottom"===e.direction&&(n="500px"),"left"===e.direction&&(s="-500px"),"right"===e.direction&&(s="500px"),i.css({visibility:"visible",opacity:1}),i.hasClass("sp-letter-trimed"))self=this,i.find("span").each(function(){t(this).css({transform:"translateY("+n+") translateX("+s+")",display:"inline-block",opacity:0})});else{var a=i.text().trim().split("");i.empty(),t.each(a,function(t,e){if(" "!==e){var a='<span class="sp-txt'+t+'" style="transform: translateY('+n+") translateX("+s+'); display:inline-block; opacity:0">'+e+"</span>";i.append(a)}else i.append("&nbsp;")}),i.addClass("sp-letter-trimed")}setTimeout(function(){var s=i.find("span");s.each(function(i,n){var a=this,o=(i+1)*(e.duration/s.length)+500;setTimeout(function(){t(a).css({opacity:1,"-webkit-transition-property":"opacity transform",transform:"translateY(0px) translateX(0)","-webkit-transition-duration":e.duration+"ms","-webkit-transition-timing-function":e.timing_function})},o)})},e.after)},width:function(t,i){t.css({width:i.from,"-webkit-transition-duration":"0s",overflow:"hidden"}),setTimeout(function(){t.css({width:i.to,"-webkit-transition-duration":i.duration+"ms","-webkit-transition-timing-function":i.timing_function,"-webkit-transition-property":"width transform"})},i.after)},slider:function(t,i){"left"===i.direction&&(t.css({opacity:"0","-webkit-transform":"translateX(-"+i.from+")","-webkit-transition-duration":"0s"}),this.sliderVertical(t,i)),"right"===i.direction&&(t.css({opacity:"0","-webkit-transform":"translateX("+i.from+")","-webkit-transition-duration":"0s"}),this.sliderVertical(t,i)),"top"===i.direction&&(t.css({opacity:"0","-webkit-transform":"translateY("+i.from+")","-webkit-transition-duration":"0s"}),this.sliderHorizontal(t,i)),"bottom"===i.direction&&(t.css({opacity:"0","-webkit-transform":"translateY("+i.from+")","-webkit-transition-duration":"0s"}),this.sliderHorizontal(t,i))},sliderVertical:function(t,i){setTimeout(function(){t.css({opacity:"1","-webkit-transition-duration":i.duration+"ms","-webkit-transition-timing-function":i.timing_function,"-webkit-transition-property":"opacity, transform, height, width","-webkit-transition-origin":"50% 50% 0","-webkit-transform":"translateX("+i.to+")"})},i.after)},sliderHorizontal:function(t,i){setTimeout(function(){t.css({opacity:"1","-webkit-transition-duration":i.duration+"ms","-webkit-transition-timing-function":i.timing_function,"-webkit-transition-property":"opacity, transform, height, width","-webkit-transition-origin":"50% 50% 0","-webkit-transform":"translateY("+i.to+")"})},i.after)},zoom:function(t,i){"zoomIn"===i.direction&&(t.css({"-webkit-transform":"scale("+i.from+")","-webkit-transition-duration":"0s"}),this.zooming(t,i)),"zoomOut"===i.direction&&(t.css({"-webkit-transform":"scale("+i.from+")","-webkit-transition-duration":"0s"}),this.zooming(t,i))},zooming:function(t,i){setTimeout(function(){t.css({"-webkit-transition-duration":i.duration+"ms","-webkit-transition-timing-function":i.timing_function,"-webkit-transition-property":"transform, scale","-webkit-transition-origin":"50% 50% 0","-webkit-transform":"scale("+i.to+")"})},i.after)},rotate:function(t,i){t.css({"-webkit-transform":"rotate("+i.from+")","-webkit-transition-duration":"0s",opacity:0}),this.rotating(t,i)},rotating:function(t,i){setTimeout(function(){t.css({"-webkit-transition-duration":i.duration+"ms","-webkit-transition-timing-function":i.timing_function,"-webkit-transition-property":"transform,rotate","-webkit-transition-origin":i.origin,"-webkit-transform":"rotate("+i.to+")",opacity:1})},i.after)},flip:function(t,i){var e=0,s=0,n=180;"x"===i.direction&&(e=1),"y"===i.direction&&(s=1,n*=-1),"x"!==i.direction&&"y"!==i.direction&&(e=1),t.css({"-webkit-transform":"perspective(400px) rotate3d("+e+", "+s+", 0, "+n+"deg)","-webkit-transition-duration":"0s","backface-visibility":"hidden",opacity:1}),this.fliping(t,i)},fliping:function(t,i){setTimeout(function(){t.css({"-webkit-transition-duration":i.duration+"ms","-webkit-transition-timing-function":i.timing_function,"-webkit-transition-property":"transform,rotate,opacity","-webkit-transition-origin":i.origin,"-webkit-transform":"perspective(400px) rotate3d(0, 0, 0, 0deg)",opacity:1})},i.after)}};return i},dragoverActionToNextItem:function(t){if("fade"===this.options.animations){if(this.item.next(".sp-item").length)this.item.next(".sp-item").addClass("next-item").css({opacity:t});else this.$element.find(".sp-item:first-child").addClass("next-item").css({opacity:t});this.item.addClass("prev-item").css({opacity:1-t})}if("slide"===this.options.animations||"stack"===this.options.animations){this.$element.find(".dragenable").css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(0,0,0)"}).removeClass("dragenable next-item");var i=t>100?100:t;this.item.addClass("prev-item");var e="";e=this.item.next(".sp-item").length?this.item.next(".sp-item"):this.$element.find(".sp-item:first-child");var s={"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(-"+i+"%,0,0)"},n={x:100-i+"%",y:0,z:0};this.options.vertical_mode&&(n=Object.assign({},n,{x:0,y:100-i+"%"}));var a={"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+n.x+","+n.y+","+n.z+")"};"stack"===this.options.animations&&(a.opacity=1,a.zIndex=3),"slide"===this.options.animations&&this.item.css(s),e.addClass("dragenable next-item").css(a)}if("zoomIn"===this.options.animations||"zoomOut"===this.options.animations){var o=this.options.animations,r=.1*t;"zoomOut"===o&&(r=(r+=1)>2?2:r),"zoomIn"===o&&(r=(r=1-r)<0?0:r),this.item.addClass("prev-item");(this.item.next(".sp-item").length?this.item.next(".sp-item"):this.$element.find(".sp-item:first-child")).addClass("dragenable next-item").css({"-webkit-transition-duration":"0s","-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d(1,1,1)",opacity:1,zIndex:1}),this.item.css({"-webkit-transition-duration":"0s","-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d("+r+","+r+","+r+")",opacity:1-.1*t,zIndex:2})}if("clip"===this.options.animations){var d=.001*t;d=d>1?1:d;var l=t>this.outerWidth?this.outerWidth:t,c=15,m=c-Math.abs(l*(c/1e3));c=m>c?c:m<0?0:m,this.item.addClass("prev-item");var h="";h=this.item.next(".sp-item").length?this.item.next(".sp-item"):this.$element.find(".sp-item:first-child"),this.item.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(0,0,0)",clip:"rect(auto, "+(this.outerWidth-l)+"px, auto, 0px)",opacity:1,zIndex:3}),h.addClass("next-item").css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+c+"%,0,0)",clip:"rect(auto, "+this.outerWidth+"px, auto, 0px)",zIndex:2,opacity:d})}},dragoverActionToPrevItem:function(t){if("fade"===this.options.animations){if(this.item.prev(".sp-item").length)this.item.prev(".sp-item").addClass("next-item").css({opacity:t});else this.$element.find(".sp-item:last-child").addClass("next-item").css({opacity:t});this.item.addClass("prev-item").css({opacity:1-t})}if("slide"===this.options.animations||"stack"===this.options.animations){this.$element.find(".dragenable").css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(0,0,0)"}).removeClass("dragenable next-item");var i=t>100?100:t,e="";this.item.addClass("prev-item"),e=this.item.prev(".sp-item").length?this.item.prev(".sp-item"):this.$element.find(".sp-item:last-child");var s={x:i-100+"%",y:0,z:0};this.options.vertical_mode&&(s=Object.assign({},s,{x:0,y:i-100+"%"}));var n={"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+s.x+","+s.y+","+s.z+")"},a={"-webkit-transition-duration":"0s","-webkit-transform":"translate3D("+i+"%,0,0)"};"stack"===this.options.animations&&(n.opacity=1,n.zIndex=3),"slide"===this.options.animations&&this.item.css(a),e.addClass("dragenable next-item").css(n)}if("zoomIn"===this.options.animations||"zoomOut"===this.options.animations){var o=this.options.animations,r=.25*t;"zoomOut"===o&&(r=(r+=1)>2?2:r),"zoomIn"===o&&(r=(r=1-r)<.2?.2:r),this.item.addClass("prev-item");(this.item.prev(".sp-item").length?this.item.prev(".sp-item"):this.$element.find(".sp-item:last-child")).addClass("dragenable next-item").css({"-webkit-transition-duration":"0s","-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d(1,1,1)",opacity:1,zIndex:1}),this.item.css({"-webkit-transition-duration":"0s","-webkit-transform-origin":"50% 50% 50%","-webkit-transform":"scale3d("+r+","+r+","+r+")",opacity:1-.1*t,zIndex:2})}if("clip"===this.options.animations){var d=.001*t;d=d>1?1:Math.abs(d);var l=t>this.outerWidth?this.outerWidth:t;l=Math.abs(l);var c=5,m=c-Math.abs(l*(c/1e3));c=m>c?c:m<0?0:m,this.item.addClass("prev-item");var h="";h=this.item.prev(".sp-item").length?this.item.prev(".sp-item"):this.$element.find(".sp-item:last-child"),this.item.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(0,0,0)",clip:"rect(auto, "+this.outerWidth+"px, auto, "+l+"px)",opacity:1,zIndex:3}),h.addClass("next-item").css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3D(-"+c+"%,0,0)",clip:"rect(auto, "+this.outerWidth+"px, auto, 0px)",zIndex:2,opacity:d})}},resetCoordiante:function(){var t=this.prevCoordinate.diff;"fade"===this.options.animations&&(t>0&&(this.item.next(".sp-item").length?this.item.next(".sp-item").css({opacity:0}):this.$element.find(".sp-item:first-child").css({opacity:0})),t<0&&(this.item.prev(".sp-item").length?this.item.prev(".sp-item").css({opacity:0}):this.$element.find(".sp-item:last-child").css({opacity:0})),this.item.css({opacity:1})),this.$element.find(".dragenable").removeClass("dragenable"),this.prevCoordinate={x:0,y:0,diff:0,dragPointer:-1},this.coordinate={x:0,y:0},this.options.autoplay&&0===this.timer&&this.startLoop()},backToStage:function(){var t=this,i=this.options.animations;if("zoomIn"!==i&&"zoomOut"!==i||this.item.css({"-webkit-transition-duration":this.options.speed+"ms","-webkit-transform":"scale3d(1,1,1)",opacity:1}),"slide"===i||"stack"===i){var e=this.$element.find(".next-item"),s=this.prevCoordinate.diff,n={x:"100%",y:0,z:0};this.options.vertical_mode&&(n=Object.assign({},n,{x:0,y:"100%"})),s>0&&e.css({"-webkit-transition-duration":this.options.speed+"ms","-webkit-transform":"translate3d("+n.x+","+n.y+","+n.z+")"}),s<0&&e.css({"-webkit-transition-duration":this.options.speed+"ms","-webkit-transform":"translate3d(-"+n.x+",-"+n.y+","+n.z+")"}),setTimeout(function(){e.removeClass("next-item"),t.item.removeClass("prev-item")},this.options.speed),this.item.css({"-webkit-transition-duration":this.options.speed+"ms","-webkit-transform":"translate3d(0,0,0)"})}},bindEvents:function(){var e=this;e.options.nav&&(e.$nextBtn.on("click."+e._name,function(t){!1===e.isAnimating&&(e.options.autoplay&&e.stopLoop(),e.Next(),e.checkCallBackMethod.call(e))}),e.$prevBtn.on("click."+e._name,function(t){!1===e.isAnimating&&(e.Prev(),e.options.autoplay&&e.stopLoop(),e.checkCallBackMethod.call(e))})),e.options.dots&&e.$dotContainer.find("li").each(function(i){t(this).on("click."+e._name,function(s){if(t(this).hasClass("active")||!0===e.isAnimating)return!1;e.options.autoplay&&e.stopLoop();var n=t(this).parent().find("li.active"),a=e.$dotContainer.find("li").index(n)>i?-1:1;e.slideFromPosition(i+1,a),e.updateDotsFromPosition(i+1),e.checkCallBackMethod.call(e)})}),e.$outerStage.on("mousedown."+e._name,t.proxy(e.onDragStart,e)),e.$outerStage.on("mouseup."+e._name+" touchend."+e._name,t.proxy(e.onDragEnd,e)),e.$outerStage.on("touchstart."+e._name,t.proxy(e.onDragStart,e)),e.$outerStage.on("touchcancel."+e._name,t.proxy(e.onDragEnd,e)),t(i).focus(function(){e.options.autoplay&&0===e.timer&&e.startLoop()}),t(i).blur(function(){e.options.autoplay&&e.stopLoop(),e.destroy()}),t(i).on("resize."+e._name,t.proxy(e.windowResize,e))},resize:function(t){console.log("event: ",t)},windowResize:function(t){void 0!==t&&this.updateResponsiveView()},parseResponsiveViewPort:function(){if(void 0!==this.options.responsive){for(var t=this.options.responsive,e=null,s=i.innerWidth,n=0;n<t.length;n++)if(s>t[n].viewport){e=t[n];break}return null===e&&(e=t[t.length-1]),e}},updateResponsiveView:function(){var t=i.innerHeight;if(void 0!==this.options.responsive){var e=this.parseResponsiveViewPort();if("full"===e.height){if(this._lastViewPort===t)return;this._lastViewPort=t,this.$outerStage.css({height:t+"px"})}else{if(this._lastViewPort===e.height)return;this._lastViewPort=e.height,this.$outerStage.css({height:e.height})}}else this.$outerStage.css({height:t+"px"})},getPosition:function(t){var e={x:null,y:null};return(t=(t=t.originalEvent||t||i.event).touches&&t.touches.length?t.touches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t).pageX?(e.x=t.pageX,e.y=t.pageY):(e.x=t.clientX,e.y=t.clientY),e},onDragStart:function(i){if(3===i.which||2===i.which)return!1;var s=this,n=s.getPosition(i);s.coordinate.x=n.x,s.coordinate.y=n.y,t(e).one("mousemove."+s._name+" touchmove."+s._name,t.proxy(function(i){t(e).on("mousemove."+s._name+" touchmove."+s._name,t.proxy(s.onDragMove,s)),i.preventDefault()},this)),s.isDragging=!0},onDragMove:function(t){var i=this;if(!1!==i.isDragging){i.options.autoplay&&i.stopLoop();var e=i.getPosition(t),s=i.coordinate,n=i.prevCoordinate,a=i.options.vertical_mode;if(n.x!==e.x&&!1===a||n.y!==e.y&&!0===a){var o=a?s.y-e.y:s.x-e.x,r=0;r="slide"===i.options.animations||"stack"===i.options.animations?(.099*Math.abs(o)).toFixed(0):"clip"===i.options.animations?o:(.005*Math.abs(o)).toFixed(2),i.prevCoordinate={x:e.x,y:e.y,diff:o,dragPointer:r},o>0&&i.dragoverActionToNextItem(r),o<0&&i.dragoverActionToPrevItem(r)}t.preventDefault()}},onDragEnd:function(t){var i=this;if(i.isDragging){var e=i.prevCoordinate.diff;Math.abs(e)>100?(e>0&&i.Next(),e<0&&i.Prev()):i.backToStage(),i.isDragging=!1}i.resetCoordiante()},checkCallBackMethod:function(){this.callback()},callback:function(){var t=this.options.onChange;if("function"==typeof t){var i=this.$element.find(".sp-item").length,e={item:this.item,items:i,element:this.$element};t.call(this.element,e)}}}),t.fn.jsSlider=function(i){return this.each(function(){t.data(this,n)||t.data(this,n,new a(this,i))}),this},t.fn.jsSlider.defaults={animations:"clip",rotate:10,autoplay:!1,bubble_size:"40px",indicator:!0,indicator_type:"line",indicator_class:"",speed:800,interval:4500,onChange:null,vertical_mode:!1,dots:!0,dot_indicator:!0,show_number:!1,slider_number_class:"",nav:!0,nav_text:["<",">"]}}(jQuery,window,document),function(t){t(document).on("ready",function(){t(".sppb-addon-sp-slider").each(function(i){var e=t(this),s=e.data("height"),n=e.data("height-sm"),a=e.data("height-xs"),o=e.data("slider-animation"),r=e.data("slide-vertically"),d=e.data("3d-rotate"),l=e.data("autoplay"),c=e.data("interval"),m=e.data("timer"),h=e.data("speed"),p=e.data("dot-control"),u=e.data("arrow-control"),f=e.data("indecator"),v=e.data("arrow-content"),b=e.data("slide-count"),w="",y="";"icon_only"===v?(w='<i class="fa fa-angle-left"></i>',y='<i class="fa fa-angle-right"></i>'):"long_arrow"===v?(w='<i class="fa fa-long-arrow-left"></i>',y='<i class="fa fa-long-arrow-right"></i>'):"icon_with_text"===v?(w='<i class="fa fa-long-arrow-left"></i> Prev',y='Next <i class="fa fa-long-arrow-right"></i>'):(w="Prev",y="Next"),e.jsSlider({autoplay:l,animations:o,rotate:d,vertical_mode:r,interval:c,indicator:m,speed:h,dots:p,dot_indicator:f,nav:u,nav_text:[w,y],show_number:b,responsive:[{viewport:1170,height:s},{viewport:600,height:n},{viewport:480,height:"480px"},{viewport:320,height:a}]})});new MutationObserver(function(i){i.forEach(function(i){var e=i.addedNodes;null!==e&&t(e).each(function(){t(this).find(".sppb-addon-sp-slider").each(function(){var i=t(this),e=i.data("height"),s=i.data("height-sm"),n=i.data("height-xs"),a=i.data("slider-animation"),o=i.data("slide-vertically"),r=i.data("3d-rotate"),d=i.data("autoplay"),l=i.data("interval"),c=i.data("timer"),m=i.data("speed"),h=i.data("dot-control"),p=i.data("arrow-control"),u=i.data("indecator"),f=i.data("arrow-content"),v=i.data("slide-count"),b="",w="";"icon_only"===f?(b='<i class="fa fa-angle-left"></i>',w='<i class="fa fa-angle-right"></i>'):"long_arrow"===f?(b='<i class="fa fa-long-arrow-left"></i>',w='<i class="fa fa-long-arrow-right"></i>'):"icon_with_text"===f?(b='<i class="fa fa-long-arrow-left"></i> Prev',w='Next <i class="fa fa-long-arrow-right"></i>'):(b="Prev",w="Next"),i.jsSlider({autoplay:d,animations:a,vertical_mode:o,rotate:r,interval:l,indicator:c,speed:m,dots:h,dot_indicator:u,nav:p,nav_text:[b,w],show_number:v,responsive:[{viewport:1170,height:e},{viewport:600,height:s},{viewport:480,height:"480px"},{viewport:320,height:n}]})})})})}).observe(document.body,{childList:!0,subtree:!0})})}(jQuery);