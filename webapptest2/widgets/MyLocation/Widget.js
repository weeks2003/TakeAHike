// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"esri/dijit/LocateButton":function(){define("require dojo/Evented dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../config dijit/_WidgetBase dijit/a11yclick dijit/_TemplatedMixin dojo/on dojo/Deferred dojo/text!./templates/LocateButton.html dojo/i18n!../nls/jsapi dojo/dom-class dojo/dom-style dojo/dom-attr ../geometry/webMercatorUtils ../geometry/Point ../SpatialReference ../graphic ../symbols/PictureMarkerSymbol ../tasks/ProjectParameters".split(" "),function(m,u,r,h,v,l,t,
n,w,x,g,b,k,d,f,p,y,B,E,F,G,H,I){m=r("esri.dijit.LocateButton",[n,x,u],{templateString:k,options:{theme:"LocateButton",map:null,visible:!0,highlightLocation:!0,symbol:new H(m.toUrl("./images/sdk_gps_location.png"),28,28),infoTemplate:null,scale:null,useTracking:!1,clearOnTrackingStop:!1,setScale:!0,centerAt:!0,timeout:15E3,graphicsLayer:null,geolocationOptions:{maximumAge:0,timeout:15E3,enableHighAccuracy:!0}},constructor:function(a,c){a=h.mixin({},this.options,a);this.domNode=c;this._i18n=d;c=navigator.geolocation;
var e=window.hasOwnProperty("isSecureContext");e=e&&window.isSecureContext||!e&&"https:"===window.location.protocol;e&&c||(a.visible=!1);c||console.log("LocateButton::navigator.geolocation unsupported.");e||console.log("LocateButton::navigator.geolocation requires a secure origin.");this.set("map",a.map);this.set("theme",a.theme);this.set("visible",a.visible);this.set("scale",a.scale);this.set("highlightLocation",a.highlightLocation);this.set("symbol",a.symbol);this.set("infoTemplate",a.infoTemplate);
this.set("geolocationOptions",a.geolocationOptions);this.set("useTracking",a.useTracking);this.set("setScale",a.setScale);this.set("centerAt",a.centerAt);this.set("timeout",a.timeout);this.set("graphicsLayer",a.graphicsLayer);this.set("clearOnTrackingStop",a.clearOnTrackingStop);this.watch("theme",this._updateThemeWatch);this.watch("visible",this._visible);this.watch("tracking",this._locate);this.watch("useTracking",h.hitch(this,function(){this.get("tracking")&&!this.get("useTracking")&&this._stopTracking();
this._setTitle()}));this._css={container:"locateContainer",locate:"zoomLocateButton",loading:"loading",tracking:"tracking"}},postCreate:function(){this.inherited(arguments);this.own(g(this._locateNode,w,h.hitch(this,this.locate)))},startup:function(){this.inherited(arguments);this.get("map")||(this.set("visible",!1),console.log("LocateButton::map required"));if(this.get("map").loaded)this._init();else g.once(this.get("map"),"load",h.hitch(this,function(){this._init()}))},destroy:function(){this.clear();
this._graphicsEvent&&this._graphicsEvent.remove();this._removeWatchPosition();this.inherited(arguments)},clear:function(){var a=this.get("highlightGraphic"),c=this.get("graphicsLayer");a&&(c?c.remove(a):this.get("map").graphics.remove(a),this.set("highlightGraphic",null))},locate:function(){this.get("useTracking")&&this.set("tracking",!this.get("tracking"));return this._locate()},show:function(){this.set("visible",!0)},hide:function(){this.set("visible",!1)},_setTitle:function(){this.get("useTracking")?
this.get("tracking")?y.set(this._locateNode,"title",this._i18n.widgets.locateButton.locate.stopTracking):y.set(this._locateNode,"title",this._i18n.widgets.locateButton.locate.tracking):y.set(this._locateNode,"title",this._i18n.widgets.locateButton.locate.title)},_removeWatchPosition:function(){this.get("watchId")&&(navigator.geolocation.clearWatch(this.get("watchId")),this.set("watchId",null));this._removePrivateVars()},_stopTracking:function(){f.remove(this._locateNode,this._css.tracking);this._removeWatchPosition();
this.get("clearOnTrackingStop")&&this.clear();this._hideLoading()},_positionToObject:function(a){return a?{coords:h.mixin({},a.coords),timestamp:a.timestamp}:{}},_startTracking:function(){f.add(this._locateNode,this._css.tracking);this._removeWatchPosition();var a=navigator.geolocation.watchPosition(h.hitch(this,function(c){c=this._positionToObject(c);this._setPosition(c).then(h.hitch(this,function(e){this._locateEvent(e)}),h.hitch(this,function(e){e||(e=Error("LocateButton::Error setting the position."));
this._locateError(e)}))}),h.hitch(this,function(c){this.set("tracking",!1);c||(c=Error("LocateButton::Could not get tracking position."));this._locateError(c)}),this.get("geolocationOptions"));this.set("watchId",a)},_removePrivateVars:function(){this._scale=this._position=this._graphic=null},_getCurrentPosition:function(){var a=new b;this._removePrivateVars();var c=setTimeout(h.hitch(this,function(){clearTimeout(c);a.reject(Error("LocateButton::time expired for getting location."))}),this.get("timeout"));
navigator.geolocation.getCurrentPosition(h.hitch(this,function(e){e=this._positionToObject(e);clearTimeout(c);this._setPosition(e).then(h.hitch(this,function(q){a.resolve(q)}),h.hitch(this,function(q){q||(q=Error("LocateButton::Error setting map position."));a.reject(q)}))}),h.hitch(this,function(e){e||(e=Error("LocateButton::Could not get current position."));a.reject(e)}),this.get("geolocationOptions"));return a.promise},_locate:function(){var a=new b;this._showLoading();if(navigator.geolocation)this.get("useTracking")?
this.get("tracking")?(this._startTracking(),a.resolve({tracking:!0})):(this._stopTracking(),a.resolve({tracking:!1})):this._getCurrentPosition().then(h.hitch(this,function(e){this._locateEvent(e);a.resolve(e)}),h.hitch(this,function(e){e||(e=Error("LocateButton::Could not get current position."));this._locateError(e);a.reject(e)}));else{var c=Error("LocateButton::geolocation unsupported");this._locateError(c);a.reject(c)}this._setTitle();return a.promise},_projectPoint:function(a){var c=new b,e=this.get("map").spatialReference,
q=e.wkid;e.isWebMercator()?(a=B.geographicToWebMercator(a),c.resolve(a)):t.defaults.geometryService&&4326!==q?(q=new I,q.geometries=[a],q.outSR=e,t.defaults.geometryService.project(q).then(h.hitch(this,function(z){z&&z.length?c.resolve(z[0]):c.reject(Error("LocateButton::Point was not projected."))}),function(z){z||(z=Error("LocateButton::please specify a geometry service on esri/config to project."));c.reject(z)})):c.resolve(a);return c.promise},_getScale:function(a){var c=this.get("scale");return a&&
a.coords?c||a.coords.accuracy||5E4:c||5E4},_createPoint:function(a){var c;a&&a.coords&&(c=new E([a.coords.longitude,a.coords.latitude],new F({wkid:4326})));return c},_setPosition:function(a){var c=new b,e,q;this._removePrivateVars();if((this._position=a)&&a.coords){if(e=this._createPoint(a))this._graphic=q=this._createGraphic(e,a);var z=this._getScale(a);this._scale=z;e?this._projectPoint(e).then(h.hitch(this,function(A){this._graphic=q=this._createGraphic(A,a);var D={graphic:q,scale:z,position:a};
this.get("setScale")&&this.get("map").setScale(z);this.get("centerAt")?this.get("map").centerAt(A).then(h.hitch(this,function(){c.resolve(D)}),h.hitch(this,function(C){C||(C=Error("LocateButton::Could not center map."));c.reject(C)})):c.resolve(D)}),h.hitch(this,function(A){A||(A=Error("LocateButton::Error projecting point."));c.reject(A)})):(e=Error("LocateButton::Invalid point"),c.reject(e))}else e=Error("LocateButton::Invalid position"),c.reject(e);return c.promise},_createGraphic:function(a,c){if(a){c=
{position:c};var e=new G(a,this.get("symbol"),c,this.get("infoTemplate"))}return e},_locateEvent:function(a){if(a.graphic){var c=this.get("highlightGraphic"),e=this.get("graphicsLayer");c?(c.setGeometry(a.graphic.geometry),c.setAttributes(a.graphic.attributes),c.setInfoTemplate(a.graphic.infoTemplate),c.setSymbol(a.graphic.symbol)):(c=a.graphic,this.get("highlightLocation")&&(e?e.add(c):this.get("map").graphics.add(c)));this.set("highlightGraphic",c)}this._hideLoading();this.emit("locate",a)},_locateError:function(a){a=
{graphic:this._graphic,scale:this._scale,position:this._position,error:a};this._hideLoading();this.emit("locate",a)},_showLoading:function(){this.get("useTracking")||f.add(this._locateNode,this._css.loading)},_hideLoading:function(){this.get("useTracking")||f.remove(this._locateNode,this._css.loading)},_init:function(){this._visible();this._setTitle();this.get("tracking")&&this.get("useTracking")&&this._locate();this.set("loaded",!0);this.emit("load",{})},_updateThemeWatch:function(a,c,e){f.remove(this.domNode,
c);f.add(this.domNode,e)},_visible:function(){this.get("visible")?p.set(this.domNode,"display","block"):p.set(this.domNode,"display","none")}});v("extend-esri")&&h.setObject("dijit.LocateButton",m,l);return m})},"widgets/MyLocation/Compass":function(){define("dojo/_base/declare dojo/_base/lang dojo/Deferred jimu/BaseWidget dojo/on esri/symbols/PictureMarkerSymbol esri/symbols/SimpleFillSymbol esri/symbols/SimpleLineSymbol esri/graphic esri/Color esri/geometry/Circle".split(" "),function(m,u,r,h,v,
l,t,n,w,x,g){var b=null;var k=m([h],{constructor:function(d,f,p){this.id="widget-myLocation-compass-"+(new Date).getTime();this.map=f;this.folderUrl=d;this.config=p;this._debug=0;this.inherited(arguments)},show:function(d,f){if(this.map.spatialReference.isWebMercator()||4326===this.map.spatialReference)!0===this.config.useCompass&&this._showDirection(f),!0===this.config.useAccCircle&&this._showAccCircle(d,f)},_showDirection:function(d){if(d.useTracking){this._destroyDirectionHandler();var f;"ondeviceorientationabsolute"in
window?f="deviceorientationabsolute":"ondeviceorientation"in window?f="deviceorientation":DeviceOrientationEvent&&(f="deviceorientation");this._directionHandler=v(window,f,u.hitch(this,this._watchMobileLocation,d))}},_watchMobileLocation:function(d,f){if(f){if(f.webkitCompassHeading||f.alpha)var p=f.webkitCompassHeading||Math.abs(f.alpha-360);f=window.orientation||0;"undefined"!==typeof p&&d.highlightGraphic.setSymbol(new l({url:this.folderUrl+"/images/compass.png",width:36,height:36,angle:-p-f}))}},
_showAccCircle:function(d,f){this._destroyAccCircle();if((f=f.highlightGraphic)&&f._graphicsLayer){var p=f.geometry;d=d.position.coords.accuracy/this.map.getResolution();d=new g({center:p,radius:d});d=new w(d,new t(t.STYLE_SOLID,new n(n.STYLE_SOLID,new x([94,164,255,.2]),1),new x([16,119,255,.2])));f._graphicsLayer.add(d);this._accCircle=d;this._accCircleGraphicsLayer=f._graphicsLayer}},clean:function(){this._destroyDirectionHandler();this._destroyAccCircle()},destroy:function(){this.clean();this.inherited(arguments)},
_destroyDirectionHandler:function(){this._directionHandler&&(this._directionHandler.remove&&this._directionHandler.remove(),this._directionHandler=null)},_destroyAccCircle:function(){this._accCircleGraphicsLayer&&this._accCircleGraphicsLayer.remove&&this._accCircle&&(this._accCircleGraphicsLayer.remove(this._accCircle),this._accCircle=null)}});k.getInstance=function(d,f,p){null===b&&(b=new k(d,f,p));return b};k.needCompass=function(d){return!0!==d.locateButton.highlightLocation||!0!==d.locateButton.useTracking||
!0!==d.useCompass&&!0!==d.useAccCircle?!1:!0};k.checkPermission=function(){var d=new r;DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission().then(u.hitch(this,function(f){"granted"==f?d.resolve(!0):d.resolve(!1)})).catch(function(f){d.resolve(!1)}):d.resolve(!1);return d};return k})},"esri/geometry/Circle":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../kernel ./Point ./Polygon ./geodesicUtils ./webMercatorUtils ../WKIDUnitConversion ../units".split(" "),
function(m,u,r,h,v,l,t,n,w,x){m=m(l,{declaredClass:"esri.geometry.Circle",_unitToMeters:{esriCentimeters:.01,esriDecimeters:.1,esriFeet:.3048,esriInches:.0254,esriKilometers:1E3,esriMeters:1,esriMiles:1609.344,esriMillimeters:.001,esriNauticalMiles:1852,esriYards:.9144,esriDecimalDegrees:111320},constructor:function(g,b){g.center?b=g:(b=b||{},b.center=g);this.center=u.isArray(b.center)?new v(b.center[0],b.center[1]):b.center;this.radius=b.radius||1E3;this.radiusUnit=b.radiusUnit||x.METERS;this.geodesic=
!0===b.geodesic?!0:!1;this.numberOfPoints=b.numberOfPoints||60;this._init()},toJson:function(){return this.inherited(arguments)},_init:function(){this.rings=[];this._ring=0;var g=this.radius*this._unitToMeters[this.radiusUnit],b=this._srType(this.center.spatialReference);if(this.geodesic){switch(b){case "webMercator":var k=n.webMercatorToGeographic(this.center);break;case "projected":console.error("Creating a geodesic circle requires the center to be specified in web mercator or geographic coordinate system");
break;case "geographic":k=this.center}g=this._createGeodesicCircle(k,g,this.numberOfPoints,k.spatialReference);"webMercator"===b&&(g=n.geographicToWebMercator(g))}else{var d;"webMercator"===b||"projected"===b?d=g/this._convert2Meters(1,this.center.spatialReference):"geographic"===b&&(d=g/this._unitToMeters.esriDecimalDegrees);g=this._createPlanarCircle(this.center,d,this.numberOfPoints)}this.spatialReference=g.spatialReference;this.addRing(g.rings[0]);this.verifySR()},_createGeodesicCircle:function(g,
b,k,d){for(var f=0,p=Math.PI/180,y=[],B;f<2*Math.PI;)B=t._directGeodeticSolver(g.y*p,g.x*p,f,b,d),y.push([B.x,B.y]),f+=Math.PI/(k/2);y.push(y[0]);return new l(y)},_createPlanarCircle:function(g,b,k){for(var d=0,f=[],p,y;d<2*Math.PI;)p=g.x+Math.cos(d)*b,y=g.y+Math.sin(d)*b,f.push([p,y]),d+=Math.PI/(k/2);f.push(f[0]);g=new l(g.spatialReference);g.addRing(f);return g},_srType:function(g){return g.isWebMercator()?"webMercator":null!=w[g.wkid]||g.wkt&&0===g.wkt.indexOf("PROJCS")?"projected":"geographic"},
_convert2Meters:function(g,b){if(null!=w[b.wkid])b=w.values[w[b.wkid]];else{b=b.wkt;var k=b.lastIndexOf(",")+1,d=b.lastIndexOf("]]");b=parseFloat(b.substring(k,d))}return g*b}});r("extend-esri")&&u.setObject("geometry.Circle",m,h);return m})},"widgets/MyLocation/a11y/Widget":function(){define(["dojo/_base/lang","dojo/on","dojo/_base/html","dijit/a11yclick"],function(m,u,r,h){return{a11y_updateLabel:function(v){v&&r.setAttr(this.domNode,"aria-label",v)},a11y_initEvents:function(){this.own(u(this.domNode,
h,m.hitch(this,this.onLocationClick)))},a11y_disable:function(){r.setAttr(this.domNode,"aria-disabled","true");r.setAttr(this.domNode,"disabled","disabled")},a11y_enable:function(){r.removeAttr(this.domNode,"aria-disabled");r.removeAttr(this.domNode,"disabled")}}})},"widgets/MyLocation/_build-generate_module":function(){define(["dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:esri/dijit/templates/LocateButton.html":'\x3cdiv class\x3d"${theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv class\x3d"${_css.container}"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"_locateNode" role\x3d"button" class\x3d"${_css.locate}" tabindex\x3d"0"\x3e\x3cspan\x3e${_i18n.widgets.locateButton.locate.button}\x3c/span\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/MyLocation/css/style.css":'.jimu-widget-mylocation{border-radius: 5px; background-color: #555; border: 1px solid #999;}.jimu-widget-mylocation.onCenter {background-color: #000;}.jimu-widget-mylocation .place-holder {padding: 2px; width: 30px; height: 30px; background-color: #555; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; background-image: url("images/locate.png"); background-position: center center; background-repeat: no-repeat;}.jimu-widget-mylocation .place-holder.locating{background-image: url("images/loading.gif");}.jimu-widget-mylocation .place-holder.tracking{background-image: url("images/stop.png") !important; background-color: #000;}.jimu-widget-mylocation .place-holder.nohttps{background-image: url("images/locate_disabled.png") !important;}.jimu-widget-mylocation .place-holder.nohttps:hover{background-color: #555;}.jimu-widget-mylocation .place-holder.nohttps,.jimu-widget-mylocation .place-holder{background-color: #555;}.jimu-widget-mylocation.onLocate .place-holder{background-color: rgba(0,0,0,0.4);}.jimu-widget-mylocation.onCenter .place-holder{background-color: #000;}.jimu-widget-mylocation .place-holder:hover{background-color: #333;}',
"*now":function(m){m(['dojo/i18n!*preload*widgets/MyLocation/nls/Widget*["ar","bs","ca","cs","da","de","en","el","es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sk","sl","sr","sv","th","tr","zh-cn","uk","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dojo/Deferred esri/layers/GraphicsLayer jimu/BaseWidget esri/dijit/LocateButton dojo/_base/html dojo/on dojo/_base/lang jimu/utils ./Compass ./a11y/Widget jimu/dijit/Message dojo/touch".split(" "),function(m,u,r,h,v,l,t,n,w,x,g){m=m([h],{name:"MyLocation",baseClass:"jimu-widget-mylocation",moveTopOnActive:!1,_DEBUG:!1,_graphicsLayer:null,_locateAction:{locator:null,cacheLatestTracking:null},startup:function(){this.inherited(arguments);this.placehoder=l.create("div",{"class":"place-holder",
title:this.label},this.domNode);this.a11y_updateLabel(this.nls._widgetLabel);this.isNeedHttpsButNot=w.isNeedHttpsButNot();!0===this.isNeedHttpsButNot?(console.log("LocateButton::navigator.geolocation requires a secure origin."),l.addClass(this.placehoder,"nohttps"),l.setAttr(this.placehoder,"title",this.nls.httpNotSupportError),this.a11y_updateLabel(this.nls.httpNotSupportError),this.a11y_disable()):window.navigator.geolocation?(this.own(t(this.placehoder,"click",n.hitch(this,this.onLocationClickWapper))),
this.own(t(this.map,"zoom-end",n.hitch(this,this._scaleChangeHandler))),this.a11y_initEvents(),this.a11y_enable(),this._createHiddenLocator()):(l.setAttr(this.placehoder,"title",this.nls.browserError),this.a11y_updateLabel(this.nls.browserError),this.a11y_disable())},onLocationClickWapper:function(b){b&&b.stopPropagation&&b.stopPropagation();if(!0===x.needCompass(this.config))x.checkPermission().then(n.hitch(this,function(){this.onLocationClick(b)}),n.hitch(this,function(){this.onLocationClick(b)}));
else this.onLocationClick(b)},onLocationClick:function(b){l.hasClass(this.domNode,"onCenter")||l.hasClass(this.domNode,"locating")?this.geoLocate&&!0===this.geoLocate._canDestroy?(this._destroyGeoLocate(),this._tryToCleanCompass()):this._DEBUG&&console.log("\x3d\x3d\x3eblock click1"):!this.geoLocate||this.geoLocate&&!0===this.geoLocate._canDestroy?(this._destroyGeoLocate(),this._createGeoLocateAndLocate()):this._DEBUG&&console.log("\x3d\x3d\x3eblock click2")},_createGeoLocateAndLocate:function(){this._DEBUG&&
console.log("\x3d\x3d\x3e_createGeoLocateAndLocate");this.getGeoLocateInstance().then(n.hitch(this,function(){this.geoLocate.locate();l.addClass(this.placehoder,"locating")}))},getGeoLocateInstance:function(){var b=new u;this.geoLocate&&b.resolve(this.geoLocate);var k=this.config.locateButton;k.map=this.map;"undefined"===typeof this.config.locateButton.useTracking&&(k.useTracking=!0);k.centerAt=!0;k.setScale=!0;var d={maximumAge:0,timeout:15E3,enableHighAccuracy:!0};k.geolocationOptions&&(k.geolocationOptions=
n.mixin(d,k.geolocationOptions));11===w.has("ie")&&(k.geolocationOptions.maximumAge=300,k.geolocationOptions.enableHighAccuracy=!1);this._graphicsLayer||(this._graphicsLayer=new r,this.map.addLayer(this._graphicsLayer));k.graphicsLayer=this._graphicsLayer;this.geoLocate=new v(k);this.geoLocate.own(t(this.geoLocate,"load",n.hitch(this,function(){b.resolve(this.geoLocate)})));this.geoLocate.own(t(this.geoLocate,"locate",n.hitch(this,this.onLocateOrError)));this.geoLocate.startup();return b},onLocateOrError:function(b){this._publishLocationAction(b);
this.geoLocate&&setTimeout(n.hitch(this,function(){this.geoLocate._canDestroy=!0;if(b.error)this.onLocateError(b);else this.onLocate(b)}),300)},onLocate:function(b){l.removeClass(this.placehoder,"locating");this.geoLocate.useTracking&&(l.addClass(this.placehoder,"tracking"),this._locateAction.cacheLatestTracking=b);l.addClass(this.domNode,"onCenter");this.neverLocate=!1;this._tryToShowCompass(b)},onLocateError:function(b){console.error(b.error);this._tryToCleanCompass();l.removeClass(this.placehoder,
"locating");l.removeClass(this.domNode,"onCenter");l.removeClass(this.placehoder,"tracking")},_scaleChangeHandler:function(){var b=this.map.getScale();b&&this.geoLocate&&this.geoLocate.useTracking&&(this.geoLocate.scale=b)},_tryToShowCompass:function(b){!1!==x.needCompass(this.config)&&(this.compass=x.getInstance({folderUrl:this.folderUrl,map:this.map,config:this.config}),this.compass.show(b,this.geoLocate))},_tryToCleanCompass:function(){this.compass&&this.compass.clean&&this.compass.clean()},_tryToDestroyCompass:function(){this.compass&&
this.compass.destroy&&this.compass.destroy()},_destroyGeoLocate:function(){this._DEBUG&&console.log("\x3d\x3d\x3e_destroyGeoLocate");this._graphicsLayer&&this._graphicsLayer.clear();this.geoLocate&&this.geoLocate._canDestroy&&(this.geoLocate&&(this.geoLocate.clear(),this.geoLocate.destroy(),this.geoLocate=null,this._locateAction.cacheLatestTracking=null),l.removeClass(this.domNode,"onCenter"),l.removeClass(this.placehoder,"tracking"))},destroy:function(){this._tryToCleanCompass();this._tryToDestroyCompass();
this._destroyGeoLocate();this._graphicsLayer&&(this.map.removeLayer(this._graphicsLayer),this._graphicsLayer=null);this._destroyHiddenLocator();this.inherited(arguments)},_isWidgetLocatorLoaded:function(){return!(!this.geoLocate||!this.geoLocate.loaded)},_isWidgetLocatorTracking:function(){return!(!this._isWidgetLocatorLoaded()||!this.geoLocate.tracking)},_isWidgetLocatorLocating:function(){return!(this._isWidgetLocatorTracking()||!l.hasClass(this.placehoder,"locating"))},onReceiveData:function(b,
k,d,f){d&&"getCurrentLocation"===d.type&&(this._isWidgetLocatorLoaded()?this._isWidgetLocatorTracking()?this._locateAction.cacheLatestTracking&&this._publishLocationAction(this._locateAction.cacheLatestTracking):this._isWidgetLocatorLocating()||this._triggerHiddenLocatorLocate():this._triggerHiddenLocatorLocate())},_publishLocationAction:function(b){this.publishData({type:"publishCurrentLocation",geoLocationResult:b})},_createHiddenLocator:function(){this._locateAction={locator:null,cacheLatestTracking:null};
this._locateAction.locator=new v({map:this.map,highlightLocation:!1,setScale:!1,centerAt:!1,geolocationOptions:{enableHighAccuracy:!0}});this._locateAction.locator.startup()},_destroyHiddenLocator:function(){this._locateAction.locator.clear();this._locateAction.locator.destroy();this._locateAction.locator=null;this._locateAction={locator:null,cacheLatestTracking:null}},_triggerHiddenLocatorLocate:function(){this.own(t.once(this._locateAction.locator,"locate",n.hitch(this,this._onHiddenLocatorLocate)));
this._locateAction.locator.locate()},_onHiddenLocatorLocate:function(b){this._publishLocationAction(b)}});m.inPanel=!1;m.hasUIFile=!1;m.extend(g);return m});