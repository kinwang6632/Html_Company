/*
jQWidgets v4.5.1 (2017-April)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(a){"use strict";a.jqx.jqxWidget("jqxDockingLayout","jqxLayout",{}),a.extend(a.jqx._jqxDockingLayout.prototype,{defineInstance:function(){var b={events:["float","dock"]};return this.base&&(this.base.dockingLayout=this),this===a.jqx._jqxDockingLayout.prototype?b:(a.extend(!0,this,b),b)},createInstance:function(){var b=this;if(!b.base.host.csWindow)throw new Error("jqxDockingLayout: Missing reference to csWindow.js.");b._oldIE=a.jqx.browser.msie&&a.jqx.browser.version<9,b._addClasses(),b.base._initiallyHidden!==!0&&(b._createOverlay(),b._createEdgeOverlays())},loadLayout:function(b){if(void 0!==b&&a.isEmptyObject(b)===!1){for(var c=this.base,d=c.element.id,e=c._find(document.body,"."+d+"FloatGroup"),f=0;f<e.length;f++){var g=a(e[f]);g.off(),g.csWindow("destroy")}c.loadLayout(b)}},destroy:function(){for(var b=this,c=b.base,d=c.element.id,e=c._find(document.body,"."+d+"FloatGroup"),f=0;f<e.length;f++){var g=a(e[f]);g.off(),g.csWindow("destroy")}b._removeHandlers(),c.destroy()},addFloatGroup:function(a,b,c,d,e,f,g){var h=this.base,i={type:"floatGroup",width:a,height:b,position:c,items:[],programmaticallyAdded:!0},j={type:d,title:e,content:f,initContent:g};i.items.push(j),h.layout.push(i),h.render()},_raiseEvent:function(b,c){void 0===c&&(c={owner:null});var d=this.events[b];c.owner=this;var e=new a.Event(d);e.owner=this,e.args=c,e.preventDefault&&e.preventDefault();var f=this.base.host.trigger(e);return f},_addClasses:function(){var a=this.base;a.host.addClass(a.toThemeProperty("jqx-docking-layout"))},_removeHandlers:function(){var b=this,c=b.base,d=c.element.id;b.removeHandler(a(document),"mousemove.jqxDockingLayout"+d),b.removeHandler(c.host,"mouseleave.jqxDockingLayout"+d),c._touchDevice&&(b.removeHandler(a(document),"touchmove.jqxDockingLayout"+d),b.removeHandler(a(document),"touchend.jqxDockingLayout"+d))},_removeByDragHandler:function(b,c,d,e,f){void 0===e&&(e=b.args.draggedIndex),void 0===f&&(f=!0);var g=this,h=g.base,i=c.items,j=i[e],k=h._find(c.widget,".jqx-ribbon-content-section")[e],l=h._detachChildNodes(k);d.hasClass("jqx-ribbon")||(d=a(h._find(d,".jqx-ribbon")[0])),g.base._suppressResizeHandler=!0,g._createFloatGroup(b,j.title,l,"documentGroup",c,j),g.base._closeDocumentPanel(e,i,c,d,f),g.base._suppressResizeHandler=!1},_floatTabbedGroup:function(b,c,d){for(var e,f,g=this,h=g.base,i=[],j=a(h._find(c,".jqx-ribbon")[0]),k=h._find(j,".jqx-ribbon-content-section"),l=0;l<b.items.length;l++){var m=b.items[l],n=h._detachChildNodes(k[l]);m.selected&&(e=m.title,f=l),i.push(n)}g._createFloatGroup(d,e,i,"tabbedGroup",b,null,f),g.base._close(b),d&&(d.target.style.cursor="")},_addTabbedGroupHandlers:function(b,c){function d(a){j===!0&&g._clickedToResize!==!0&&(f._floatTabbedGroup(b,c,a),j=!1)}var e,f=this,g=f.base,h=g.element.id,i=g._find(c,".jqx-layout-window-header")[0],j=!1,k=g._touchDevice?["touchstart","touchend"]:["mousedown","mouseup"];f.addHandler(i,k[0]+".jqxDockingLayout"+h,function(a){if(b.allowDrag!==!1&&(j=!0,a.target.style.cursor="move",g._touchDevice)){var c=a.originalEvent.touches[0];e=document.elementFromPoint(c.pageX,c.pageY)}}),f.addHandler(i,k[1]+".jqxDockingLayout"+h,function(a){j=!1,a.target.style.cursor=""}),g._touchDevice?f.addHandler(a(document),"touchmove.jqxDockingLayout"+h,function(a){g._clickedToResize===!0&&a.preventDefault();var b=a.originalEvent.touches[0];e!==document.elementFromPoint(b.pageX,b.pageY)&&d({pageX:b.pageX,pageY:b.pageY,target:e})}):f.addHandler(i,"mouseleave.jqxDockingLayout"+h,function(a){d({pageX:a.pageX,pageY:a.pageY,target:a.target})})},_floatAutoHideGroup:function(a,b,c,d){var e=this,f=e.base._detachChildNodes(c);e._createFloatGroup(d,b,f,"autoHideGroup",a,a),e.base._close(a)},_addAutoHideGroupHandlers:function(b,c,d,e){function f(a){k===!0&&(h._floatAutoHideGroup(b,d,e,a),k=!1,a.target.style.cursor="")}var g,h=this,i=h.base,j=i.element.id,k=!1,l=i._touchDevice?["touchstart","touchend"]:["mousedown","mouseup"];h.addHandler(c,l[0]+".jqxDockingLayout"+j,function(a){if(b.parent.allowDrag!==!1&&(k=!0,a.target.style.cursor="move",i._touchDevice)){var c=a.originalEvent.touches[0];g=document.elementFromPoint(c.pageX,c.pageY)}}),h.addHandler(c,l[1]+".jqxDockingLayout"+j,function(a){k=!1,a.target.style.cursor=""}),i._touchDevice?h.addHandler(a(document),"touchmove.jqxDockingLayout"+j,function(a){i._clickedToResize===!0&&a.preventDefault();var b=a.originalEvent.touches[0];g!==document.elementFromPoint(b.pageX,b.pageY)&&f({pageX:b.pageX,pageY:b.pageY,target:g})}):h.addHandler(c,"mouseleave.jqxDockingLayout"+j,function(a){f({pageX:a.pageX,pageY:a.pageY,target:a.target})})},_createFloatGroup:function(b,c,d,e,f,g,h){var i,j,k,l,m,n,o=this,p=o.base,q=document.createElement("div");if(q.className=p.toThemeProperty("jqx-docking-layout-group-floating")+" "+p.element.id+"FloatGroup",q.innerHTML="<div></div><div></div>",document.body.appendChild(q),q=a(q),"documentGroup"===e)b&&(i=b.args.x,j=b.args.y),k=f.widget.width(),l=f.widget.height(),m=d;else if("tabbedGroup"===e){b&&(i=b.pageX,j=b.pageY),k=f.widget.width(),l=f.widget.height(),m="",n=document.createElement("div");var r=document.createElement("div"),s=document.createElement("ul");s.className="jqx-layout-ribbon-header jqx-layout-ribbon-header-"+(o.rtl?"rtl":"ltr");for(var t=0;t<f.items.length;t++){var u=f.items[t],v=document.createElement("div"),w=document.createElement("li");w.innerHTML=u.title,s.appendChild(w);for(var x=0;x<d[t].length;x++)d[t][x].appendTo(v);r.appendChild(v)}n.appendChild(s),n.appendChild(r),n=a(n),m=n}else"autoHideGroup"===e&&(b&&(i=b.pageX,j=b.pageY),k=a(p._find(f.parent.widget,".jqx-ribbon-content")[0]).width(),l=f.parent.widget.height(),m=d);if(!i&&!j){var y=p.host.offset();i=(p.host.width()-k)/2+y.left+100,j=(p.host.height()-l)/2+y.top+10}q.on("moved close",function(a){o._hideOverlays();var b=q.current;"moved"===a.type?(b.position.x=a.args.x,b.position.y=a.args.y,b._overlayGroup&&o._updateOverlayGroup(b._overlayGroup),o._clearTextSelection(),o._windowCreate=!1,o._hideOverlays()):(p._raiseEvent("4",{element:q,floatGroup:q.current}),b._overlayGroup&&(b._overlayGroup.removed=!0,o._updateOverlayGroups()),b.removed=!0,p._updateLayout(p.layout))}),q.on("resized",function(b){var c=q.current,d=a(this).offset();c.width=b.args.width,c.height=b.args.height,c.position.x=d.left,c.position.y=d.top,c._overlayGroup&&o._updateOverlayGroup(c._overlayGroup)}),q.csWindow({theme:p.theme,title:c,content:m,width:k,maxWidth:null,height:l,maxHeight:null,position:{x:i-100,y:j-10},closeButtonAction:"close",rtl:p.rtl,initContent:function(){var a,d=this._header,k=p._touchDevice?"touchstart":"mousedown";a="autoHideGroup"===e?f.parent:f,b&&(o._draggedWindow={fromGroup:a,fromPanel:g,title:c,element:q},d.trigger("mousedown",[i,j]),o._windowDragged=!0,o._windowCreate=!0,o._interval(),p.resizable&&(p._overlay[0].style.display="block"),o._showEdgeOverlays()),d.on(k,function(){o._windowDragged=!0,q.current._overlayGroup&&(q.current._overlayGroup.self=!0),o._interval(),p.resizable&&(p._overlay[0].style.display="block"),o._draggedWindow={fromGroup:a,fromPanel:g,title:c,element:q},o._showEdgeOverlays()}),d.on("mouseup",function(){o._hideOverlays(),o._windowCreate=!1}),"tabbedGroup"===e&&(n.jqxRibbon({theme:p.theme,width:"100%",height:"100%",position:"bottom",selectedIndex:h,selectionMode:"click",animationType:"none",rtl:p.rtl,reorder:!0,_suppressReorder:!1,_removeByDrag:!0}),n.on("select",function(a){if(!a.owner.widgetName||"jqxRibbon"===a.owner.widgetName){var b=q.current.items[0].items[a.args.selectedIndex];q.csWindow("setTitle",b.title),b.selected=!0}}),n.on("unselect",function(a){a.owner.widgetName&&"jqxRibbon"!==a.owner.widgetName||(q.current.items[0].items[a.args.unselectedIndex].selected=!1)}),n.on("reorder",function(a){p._swapPanelsInLayout(q.current.items[0].items,a.args.newIndex,a.args.oldIndex)}),n.on("_removeByDrag",function(a){o._removeByDragHandler(a,q.current.items[0],n),1===q.current.items[0].items.length&&n.jqxRibbon({_removeByDrag:!1})}))}});var z,A,B={type:"floatGroup",parent:{type:"host"},widget:q,position:{x:i-100,y:j-10},index:p.layout.length,width:k,height:l};if(q.current=B,g)B.items=[],p._copyItem(g,B.items),z=B.items,A=B;else{B.items=[{type:"tabbedGroup",items:[],parent:B,widget:n}],z=B.items[0].items;for(var C=0;C<f.items.length;C++)p._copyItem(f.items[C],z);A=B.items[0]}for(var D=0;D<z.length;D++)z[D].parent=A;p.layout.push(B),o._raiseEvent("0",{item:B}),o._trackFloatGroups()},_interval:function(){var a=this;if(a._oldIE===!0){var b=a._overlayWidth,c=a._overlayHeight;a._oldIEInterval=setInterval(function(){a._checkPosition(b,c),a._windowCreate&&a._draggedWindow.element.csWindow("move",a._x-50,a._y-10)},1e3)}},_createOverlay:function(){function b(b,c,d,f){e._dropOverlay.style.display="block",e._dropOverlay.style.width=b+"px",e._dropOverlay.style.height=c+"px",a(e._dropOverlay).offset({left:d,top:f})}function c(c){if(c=e._closest(c,"jqx-docking-layout-overlay-square"),i=c,!a(f._find(c,".jqx-docking-layout-overlay-inner-square")[0]).hasClass("jqx-fill-state-disabled")){var d=e._dropToGroup.element.width(),g=e._dropToGroup.element.height(),h=e._dropToGroup.element.offset();c.hasClass("jqx-docking-layout-overlay-square-top")?b(d,g/2,h.left,h.top):c.hasClass("jqx-docking-layout-overlay-square-left")?b(d/2,g,h.left,h.top):c.hasClass("jqx-docking-layout-overlay-square-center")&&!e._overlayCenter.hasClass("jqx-docking-layout-square-disabled")?b(d,g,h.left,h.top):c.hasClass("jqx-docking-layout-overlay-square-right")?b(d/2,g,h.left+d/2,h.top):c.hasClass("jqx-docking-layout-overlay-square-bottom")?b(d,g/2,h.left,h.top+g/2):f._touchDevice&&(e._dropOverlay.style.display="none",i=!1)}}function d(b){var c=e._dropToGroup.settings;if(a(f._find(b,".jqx-docking-layout-overlay-inner-square")[0]).hasClass("jqx-fill-state-disabled"))return void e._hideOverlays();if(b.hasClass("jqx-docking-layout-overlay-square-top"))e._dropHandler(0,"vertical","height","top");else if(b.hasClass("jqx-docking-layout-overlay-square-left"))e._dropHandler(0,"horizontal","width","left");else if(b.hasClass("jqx-docking-layout-overlay-square-center")){var d,g,h=e._getDraggedWindowInformation(),i=h.title,j=h.content;if("documentGroup"===c.type?(d=c.widget,g="documentPanel"):"tabbedGroup"===c.type&&(d="floatGroup"===c.parent.type?c.widget:a(f._find(c.widget,".jqx-ribbon")[0]),g="layoutPanel"),"layoutGroup"===c.type)e._dropToEmptyLayoutGroup(h);else for(var k=0;k<i.length;k++){d.jqxRibbon({_suppressReorder:!0}),d.jqxRibbon("addAt",f._find(d,".jqx-ribbon-content-section").length,{title:i[k],content:j[k]},!0);var l=c.items.length,m={type:g,title:i[k],parent:c,index:l,detachedContent:h.content[k],docked:!0};c.items.push(m),f._addRightClickHandler(a(f._find(d,".jqx-ribbon-item")[l]),{current:m}),d.jqxRibbon({_suppressReorder:!1})}"floatGroup"===c.parent.type&&c.widget.jqxRibbon({_removeByDrag:!0}),e._clearTextSelection(),e._raiseEvent("1",{position:"center",item:c})}else b.hasClass("jqx-docking-layout-overlay-square-right")?e._dropHandler(1,"horizontal","width","right"):b.hasClass("jqx-docking-layout-overlay-square-bottom")&&e._dropHandler(1,"vertical","height","bottom");e._removeFloatGroupObject(e._draggedWindow.element.current),e._draggedWindow.element.remove(),e._hideOverlays()}var e=this,f=e.base,g=f.element.id;e._overlay=document.createElement("div"),e._overlay.className=f.toThemeProperty("jqx-docking-layout-overlay"),e._overlay.innerHTML='<div class="jqx-docking-layout-overlay-section"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-top")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+f.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-top")+'"></div></div></div></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div></div><div class="jqx-docking-layout-overlay-section"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-left")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+f.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-left")+'"></div></div></div></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-center")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+f.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-inner-square-content jqx-docking-layout-overlay-highlight")+'"></div></div></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-right")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+f.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-right")+'"></div></div></div></div></div><div class="jqx-docking-layout-overlay-section"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-widget-content jqx-docking-layout-overlay-square-bottom")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square")+'"><div class="'+f.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header")+'"></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-inner-square-content")+'"><div class="'+f.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-highlight jqx-docking-layout-overlay-highlight-bottom")+'"></div></div></div></div><div class="'+f.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-invisible")+'"></div></div>',e._overlay=a(e._overlay);var h=f._find(e._overlay,".jqx-docking-layout-overlay-square-center")[0];e._overlayCenter=a(h.firstChild),e._dropOverlay=document.createElement("div"),e._dropOverlay.className=e.toThemeProperty("jqx-docking-layout-drop-overlay"),e._dropOverlayHelper=a(e._dropOverlay),f._ie7?a("body").append(e._overlay,e._dropOverlay):(f.element.appendChild(e._overlay[0]),f.element.appendChild(e._dropOverlay)),e._overlayWidth=e._overlay[0].offsetWidth,e._overlayHeight=e._overlay[0].offsetHeight,e._overlay[0].style.display="none",e._addOverlayHandlers(),e._squares=[f._find(e._overlay,".jqx-docking-layout-overlay-square-top")[0],f._find(e._overlay,".jqx-docking-layout-overlay-square-left")[0],h,f._find(e._overlay,".jqx-docking-layout-overlay-square-right")[0],f._find(e._overlay,".jqx-docking-layout-overlay-square-bottom")[0]],e._sansCenter=[a(f._find(a(e._squares[0]),".jqx-docking-layout-overlay-inner-square")[0]),a(f._find(a(e._squares[1]),".jqx-docking-layout-overlay-inner-square")[0]),a(f._find(a(e._squares[3]),".jqx-docking-layout-overlay-inner-square")[0]),a(f._find(a(e._squares[4]),".jqx-docking-layout-overlay-inner-square")[0])];var i=!1;f._touchDevice?(e.addHandler(a(document),"touchmove.jqxDockingLayout"+g,function(b){if(e._windowDragged){b.preventDefault();var d=b.originalEvent.touches[0],f=a(document.elementFromPoint(d.pageX,d.pageY));c(f)}}),e.addHandler(a(document),"touchend.jqxDockingLayout"+g,function(){i!==!1&&(d(i),i=!1)})):a.each(e._squares,function(){e.addHandler(this,"mouseenter.jqxDockingLayout"+g,function(){c(a(this))}),e.addHandler(this,"mouseleave.jqxDockingLayout"+g,function(){e._dropOverlay.style.display="none"}),e.addHandler(this,"mouseup.jqxDockingLayout"+g,function(){d(a(this))})})},_addOverlayHandlers:function(){var b=this,c=b._overlayWidth,d=b._overlayHeight;b.base._touchDevice?b.addHandler(a(document),"touchmove.jqxDockingLayout"+b.base.element.id,function(a){var e=a.originalEvent.touches[0];b._x=e.pageX,b._y=e.pageY,b._windowDragged&&!b._oldIE&&(b._checkPosition(c,d),b._windowCreate&&b._draggedWindow.element.csWindow("move",e.pageX-50,e.pageY-10))}):b.addHandler(a(document),"mousemove.jqxDockingLayout"+b.base.element.id,function(a){b._x=a.pageX,b._y=a.pageY,b._windowDragged&&!b._oldIE&&(b._checkPosition(c,d),b._windowCreate&&b._draggedWindow.element.csWindow("move",a.pageX-50,a.pageY-10))})},_checkPosition:function(a,b){for(var c=this,d=c.base,e=c._x,f=c._y,g=0;g<d._overlayGroups.length;g++){var h=d._overlayGroups[g];if(!h.self){var i=h.width,j=h.height,k=h.offset,l=k.left,m=k.top;if(e>=l&&e<=l+i&&f>=m&&f<=m+j){if(("documentGroup"===h.settings.type&&"documentGroup"===c._draggedWindow.fromGroup.type||"tabbedGroup"===h.settings.type&&("tabbedGroup"===c._draggedWindow.fromGroup.type||"autoHideGroup"===c._draggedWindow.fromGroup.type)||"layoutGroup"===h.settings.type)&&h.settings.allowDrop!==!1)c._overlayCenter.removeClass(d.toThemeProperty("jqx-fill-state-disabled"));else if(c._overlayCenter.addClass(d.toThemeProperty("jqx-fill-state-disabled")),"floatGroup"===h.settings.parent.type)return;for(var n=0;n<c._sansCenter.length;n++)"floatGroup"===h.settings.parent.type?c._sansCenter[n].addClass(d.toThemeProperty("jqx-fill-state-disabled")):c._sansCenter[n].removeClass(d.toThemeProperty("jqx-fill-state-disabled"));return c._overlay[0].style.display="block",c._overlay.offset({left:parseInt(l+i/2-a/2,10),top:parseInt(m+j/2-b/2,10)}),void(c._dropToGroup=h)}}}c._overlay[0].style.display="none"},_dropHandler:function(b,c,d,e){var f,g,h=this,i=h.base,j=h._dropToGroup.settings,k=j.parent,l=h._getDraggedWindowInformation(),m=l.title,n=l.content,o=l.groupType,p=l.itemType,q=[];if(k.orientation===c){f=j.index+b,g={type:o,parent:k},g[d]=h._draggedWindow.element[d]();for(var r=0;r<m.length;r++)q.push({type:p,title:m[r],parent:g,prevent:!0,selected:h._getFloatGroupItemSelection(r),detachedContent:n[r],docked:!0});g.items=q,h._setOptimalDimension(d,g,j),k.items.splice(f,0,g)}else{var s,t;"width"===d?(s="height",t="minHeight"):(s="width",t="minWidth");var u={type:"layoutGroup",orientation:c,parent:j.parent,index:j.index};u[s]=j[s],j[t]&&(u[t]=j[t]),j.parent.items.splice(j.index,1),j.parent.items.splice(j.index,0,u),j.parent=u,g={type:o,parent:u};for(var v=0;v<m.length;v++)q.push({type:p,title:m[v],parent:g,prevent:!0,selected:h._getFloatGroupItemSelection(v),detachedContent:n[v],docked:!0});g.items=q,delete j[s],j[d]="50%",g[d]="50%",u.items=[j],u.items.splice(0+b,0,g)}i.render();for(var w=i._find(g.widget,".jqx-ribbon-content-section"),x=0;x<w.length;x++)for(var y=a(w[x]),z=n[x],A=0;A<z.length;A++)n[x][A].appendTo(y);h._clearTextSelection(),i._raiseEvent("1",{item:j}),h._raiseEvent("1",{position:e,item:g})},_setOptimalDimension:function(a,b,c){var d,e=this,f="width"===a?"minWidth":"minHeight",g=c[f]||e.base["minGroup"+a.charAt(0).toUpperCase()+a.slice(1)],h=c.parent.widget[a]();d=parseFloat(c[a])-g/h*100;var i=b[a]/h*100;if(d<i){b[a]=parseFloat(c[a])/2+"%",b[f]=parseInt(parseFloat(b[a])/100*h,10),c[a]=parseFloat(c[a])-parseFloat(b[a])+"%";var j=parseInt(parseFloat(c[a])/100*h,10);j<g&&(c[f]=j)}else b[a]=i+"%",c[a]=parseFloat(c[a])-i+"%"},_dropToEmptyLayoutGroup:function(a){var b=this,c=b._dropToGroup.settings,d=a.groupType,e={type:d,items:[],parent:c},f=a.content;"horizontal"===c.orientation?e.width="100%":"vertical"===c.orientation&&(e.height="100%");for(var g=0;g<a.title.length;g++){var h={type:a.itemType,title:a.title[g],parent:e,prevent:!0,selected:b._getFloatGroupItemSelection(g),detachedContent:f[g],docked:!0};e.items.push(h)}c.items.push(e),b.base.render();for(var i=b.base._find(e.widget,".jqx-ribbon-content-section"),j=0;j<i.length;j++)for(var k=0;k<f[j].length;k++)f[j][k].appendTo(i[j])},_getFloatGroupItemSelection:function(a){var b,c=this;return b=!!c._draggedWindow.fromPanel||c._draggedWindow.element.current.items[0].items[a].selected},_createEdgeOverlays:function(){function b(b){var e,f,g="left"===b||"right"===b?"horizontal":"vertical",h='<div class="'+d.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-mini-window-edge-"+g)+'"><div class="'+d.toThemeProperty("jqx-widget-header jqx-docking-layout-overlay-inner-square-header jqx-docking-layout-overlay-inner-square-header-"+g)+'"></div><div class="'+d.toThemeProperty("jqx-widget-content jqx-fill-state-pressed jqx-docking-layout-overlay-inner-square-content jqx-docking-layout-overlay-inner-square-content-"+g)+'"></div></div>',i='<div class="'+d.toThemeProperty("jqx-docking-layout-overlay-square-edge-arrow-container jqx-docking-layout-overlay-square-edge-arrow-container-"+g)+'"><div class="'+d.toThemeProperty("jqx-fill-state-pressed jqx-docking-layout-overlay-square-edge-arrow jqx-docking-layout-overlay-square-edge-arrow-"+b)+'"></div></div>';return f="left"===b||"top"===b?h+i:i+h,e=document.createElement("div"),e.className=d.toThemeProperty("jqx-widget-content jqx-docking-layout-overlay-square jqx-docking-layout-overlay-square-edge"),e.innerHTML='<div class="'+d.toThemeProperty("jqx-docking-layout-overlay-inner-square-edge")+'">'+f+"</div>",d._ie7?document.body.appendChild(e):d.element.appendChild(e),c._edgeOverlays.push(e),a(e)}var c=this,d=c.base;c._edgeOverlays=[],c._leftOverlay=b("left"),c._rightOverlay=b("right"),c._topOverlay=b("top"),c._bottomOverlay=b("bottom"),c._addEdgeOverlaysHandlers()},_addEdgeOverlaysHandlers:function(){function b(b,c,d,e){f._dropOverlay.style.display="block",f._dropOverlay.style.width=b,f._dropOverlay.style.height=c,a(f._dropOverlay).offset({left:d,top:e})}function c(c){switch(e=g.host.offset(),c=f._closest(a(c),"jqx-docking-layout-overlay-square-edge")[0],i=c,c){case f._leftOverlay[0]:b("100px",g.host.height()+"px",e.left,e.top);break;case f._rightOverlay[0]:b("100px",g.host.height()+"px",e.left+g.host.width()-100,e.top);break;case f._topOverlay[0]:b(g.host.width()+"px","100px",e.left,e.top);break;case f._bottomOverlay[0]:b(g.host.width()+"px","100px",e.left,e.top+g.host.height()-100);break;default:g._touchDevice&&(i=!1)}}function d(a){switch(a){case f._leftOverlay[0]:f._dropToEdge("left",0,"horizontal","width");break;case f._rightOverlay[0]:f._dropToEdge("right",g.layout[0].items.length-1,"horizontal","width");break;case f._topOverlay[0]:f._dropToEdge("top",0,"vertical","height");break;case f._bottomOverlay[0]:f._dropToEdge("bottom",g.layout[0].items.length-1,"vertical","height")}}var e,f=this,g=f.base,h=g.element.id,i=!1;g._touchDevice?(f.addHandler(a(document),"touchmove.jqxDockingLayout"+h,function(b){if(f._windowDragged){b.preventDefault();var d=b.originalEvent.touches[0],e=a(document.elementFromPoint(d.pageX,d.pageY));c(e)}}),f.addHandler(a(document),"touchend.jqxDockingLayout"+h,function(){i!==!1&&(d(i),i=!1)})):a.each(f._edgeOverlays,function(){f.addHandler(this,"mouseenter.jqxDockingLayout"+h,function(){c(this)}),f.addHandler(this,"mouseleave.jqxDockingLayout"+h,function(){f._dropOverlay.style.display="none"}),f.addHandler(this,"mouseup.jqxDockingLayout"+h,function(){d(this)})})},_dropToEdge:function(a,b,c,d){var e,f,g=this,h=g.base,i=h.layout[0],j=g._getDraggedWindowInformation(),k=j.title,l=j.content,m=j.groupType,n=j.itemType,o=[];if(g._removeFloatGroupObject(g._draggedWindow.element.current),i.orientation===c){e={type:m,parent:i},e[d]=g._draggedWindow.element[d]();for(var p=0;p<k.length;p++)o.push({type:n,title:k[p],parent:e,prevent:!0,selected:g._getFloatGroupItemSelection(p),detachedContent:l[p],docked:!0});e.items=o,f=i.items[b],g._setOptimalDimension(d,e,f),"left"===a||"top"===a?i.items.splice(b,0,e):i.items.push(e)}else{var q,r;"width"===d?(q="height",r="minHeight"):(q="width",r="minWidth");var s={type:"layoutGroup",orientation:c,parent:i.parent,index:i.index};e={type:m,parent:s};for(var t=0;t<k.length;t++)o.push({type:n,title:k[t],parent:e,prevent:!0,selected:g._getFloatGroupItemSelection(t),detachedContent:l[t],docked:!0});e.items=o,delete i[q],delete e[q],e[d]="50%",i[d]="50%",i.parent=s,"left"===a||"top"===a?s.items=[e,i]:s.items=[i,e],h.layout[0]=s,f=i}h.render();for(var u=h._find(e.widget,".jqx-ribbon-content-section"),v=0;v<u.length;v++)for(var w=0;w<l[v].length;w++)l[v][w].appendTo(u[v]);g._clearTextSelection(),h._raiseEvent("1",{item:f}),g._raiseEvent("1",{position:a+"-edge",item:e}),g._draggedWindow.element.remove(),g._hideOverlays()},_showEdgeOverlays:function(){function a(b){if(b.items&&0!==b.items.length){var c=b.orientation,d=b.items[0],e=b.items[b.items.length-1];"horizontal"===c?("autoHideGroup"===d.type?g=g&&!1:"layoutGroup"===d.type&&a(d),"autoHideGroup"===e.type?h=h&&!1:"layoutGroup"===e.type&&a(e)):"vertical"===c&&("autoHideGroup"===d.type?i=i&&!1:"layoutGroup"===d.type&&a(d),"autoHideGroup"===e.type?j=j&&!1:"layoutGroup"===e.type&&a(e))}}var b=this,c=b.base,d=c.host.width(),e=c.host.height(),f=c.host.offset(),g=!0,h=!0,i=!0,j=!0;a(c.layout[0]),g&&(b._leftOverlay[0].style.display="block"),h&&(b._rightOverlay[0].style.display="block"),i&&(b._topOverlay[0].style.display="block"),j&&(b._bottomOverlay[0].style.display="block"),b._leftOverlay.offset({left:f.left+5,top:f.top+e/2-20}),b._rightOverlay.offset({left:f.left+d-40,top:f.top+e/2-20}),b._topOverlay.offset({left:f.left+d/2-20,top:f.top+5}),b._bottomOverlay.offset({left:f.left+d/2-20,top:f.top+e-40})},_hideOverlays:function(){var a=this,b=a.base;a._windowDragged=!1,a._oldIE===!0&&clearInterval(a._oldIEInterval),b.resizable&&setTimeout(function(){a.base._overlay[0].style.display="none"},0),a._overlay[0].style.display="none";for(var c=0;c<a._edgeOverlays.length;c++)a._edgeOverlays[c].style.display="none";a._dropOverlay.style.display="none"},_getDraggedWindowInformation:function(){var a,b,c=this,d=c.base,e=[],f=[];if(c._draggedWindow.fromPanel)e.push(c._draggedWindow.title),f.push(d._detachChildNodes(d._find(c._draggedWindow.element,".jqx-window-content")[0]));else for(var g=d._find(c._draggedWindow.element,".jqx-ribbon-content-section"),h=0;h<c._draggedWindow.element.current.items[0].items.length;h++){var i=c._draggedWindow.element.current.items[0].items[h];e.push(i.title),f.push(d._detachChildNodes(g[h]))}return"documentGroup"===c._draggedWindow.fromGroup.type?(a="documentGroup",b="documentPanel"):(a="tabbedGroup",b="layoutPanel"),{title:e,content:f,groupType:a,itemType:b}},_removeFloatGroupObject:function(a){var b=this.base;a.removed=!0,b._updateLayout(b.layout)},_trackFloatGroups:function(){for(var a=this,b=a.base,c=1;c<b.layout.length;c++){var d=b.layout[c];if("tabbedGroup"===d.items[0].type){var e=d.items[0].widget,f={element:e,width:e.width(),height:e.height(),offset:e.offset(),settings:d.items[0]};d._overlayGroup=f,b._overlayGroups.push(f)}}},_updateOverlayGroup:function(a){if(a){var b=a.element;a.width=b.width(),a.height=b.height(),a.offset=b.offset(),a.self=!1}},_updateOverlayGroups:function(){for(var a=this.base._overlayGroups,b=a.length-1;b>=0;b--){var c=a[b];c.removed===!0&&a.splice(b,1)}},_clearTextSelection:function(){try{document.selection?document.selection.empty():window.getSelection&&(window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges())}catch(a){}},_closest:function(b,c){if(b.hasClass(c))return b;for(var d=a(b[0].parentNode);null!==d[0]&&"#document"!==d[0].nodeName;){if(d.hasClass(c))return d;d=a(d[0].parentNode)}}})}(jqxBaseFramework);
