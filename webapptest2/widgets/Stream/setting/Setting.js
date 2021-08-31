// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/Stream/setting/utils":function(){define(["dojo/_base/array"],function(n){return{getStreamLayers:function(d){var g=[],k;n.forEach(d.graphicsLayerIds,function(f){k=d.getLayer(f);"esri.layers.StreamLayer"===k.declaredClass&&g.push(k)});g.reverse();return g},getStreamLayerName:function(d){d=/\/([^\/]+)\/StreamServer/.exec(d);return 1<d.length?d[1]:""}}})},"widgets/Stream/setting/StreamSetting":function(){define("dojo/_base/declare dojo/_base/lang dojo/on dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./StreamSetting.html dojo/dom-class dojo/dom-style dojo/Evented esri/symbols/jsonUtils jimu/dijit/CheckBox jimu/dijit/SymbolPicker jimu/dijit/Message ./FilterConfigPopup ../FilterUtil jimu/dijit/LoadingShelter".split(" "),
function(n,d,g,k,f,h,r,p,q,u,t,l,v,b,a,c){return n([k,f,h,u],{baseClass:"jimu-widget-stream-setting",templateString:r,map:null,nls:null,layerName:null,streamLayer:null,_filterList:[],_started:!1,postCreate:function(){this.inherited(arguments);var e=null;this._filterList=[];this.startStopCheckBox=new l({checked:!0,label:this.nls.startStopStream});this.startStopCheckBox.placeAt(this.startStopCheckBoxDiv);this.clearPreviousCheckBox=new l({checked:!0,label:this.nls.clearStream});this.clearPreviousCheckBox.placeAt(this.clearPreviousCheckBoxDiv);
this.drawPreviousCheckBox=new l({checked:!1,label:this.nls.drawPrevious});this.drawPreviousCheckBox.placeAt(this.drawPreviousCheckBoxDiv);this.streamLayer&&(1===this.streamLayer.maximumTrackPoints?this.drawPreviousCheckBox.setStatus(!1):1<this.streamLayer.maximumTrackPoints&&this.drawPreviousCheckBox.setValue(!0));this.spatialFilterCheckBox=new l({checked:!0,label:this.nls.spatialFilter,onChange:d.hitch(this,this._spatialStatusChange)});this.spatialFilterCheckBox.placeAt(this.spatialFilterCheckBoxDiv);
this.mapExtentCheckBox=new l({checked:!1,label:this.nls.limitMapExtent});this.mapExtentCheckBox.placeAt(this.mapExtentCheckBoxDiv);this.drawExtentCheckBox=new l({checked:!1,label:this.nls.limitDrawExtent,onChange:d.hitch(this,function(m){m?q.set(this.symbolPickerNode,"display","inline"):q.set(this.symbolPickerNode,"display","none")})});q.set(this.drawExtentCheckBox.domNode,"vertical-align","top");this.drawExtentCheckBox.placeAt(this.drawExtentCheckBoxDiv);this.config&&this.config.drawSymbol&&(e=t.fromJson(this.config.drawSymbol));
this.symbolPicker=new v({symbol:e,type:"fill"});q.set(this.symbolPicker.domNode,"margin-top","-16px");this.symbolPicker.placeAt(this.symbolPickerNode);this.symbolPicker.startup();this.filterCheckBox=new l({checked:!1,label:this.nls.attributeFilter,onChange:d.hitch(this,this._filterStatusChange)});this.filterCheckBox.placeAt(this.filterCheckBoxDiv);this.config?this.setConfig(this.config):this.streamLayer&&this.streamLayer.getDefinitionExpression()&&(this.shelter.show(),c.buildFilterInfoFromString(this.streamLayer,
this.streamLayer.getDefinitionExpression(),this.nls.newFilter).then(d.hitch(this,function(m){null!==m&&(this._filterList.push(m),this.filterCheckBox.setValue(!0),this.filterCheckBox.setStatus(!1));this.shelter.hide()})))},setConfig:function(e){this.config=e;this.layerName=this.config.layerName;this._filterList=this.config.filterList;this.startStopCheckBox.setValue(this.config.startStop);this.clearPreviousCheckBox.setValue(this.config.clear);this.drawPreviousCheckBox.setValue(this.config.drawPrevious);
this.spatialFilterCheckBox.setValue(this.config.spatialFilter);this.mapExtentCheckBox.setValue(!!this.config.mapExtentFilter);this.drawExtentCheckBox.setValue(!!this.config.drawExtentFilter);this.config.drawExtentFilter?q.set(this.symbolPickerNode,"display","inline"):q.set(this.symbolPickerNode,"display","none");this.filterCheckBox.setValue(this.config.attrFilter)},getConfig:function(){var e={layerId:this.streamLayer.id,layerName:this.layerName||"",startStop:this.startStopCheckBox.getValue(),clear:this.clearPreviousCheckBox.getValue(),
drawPrevious:this.drawPreviousCheckBox.getValue(),spatialFilter:this.spatialFilterCheckBox.getValue(),mapExtentFilter:this.mapExtentCheckBox.getValue(),drawExtentFilter:this.drawExtentCheckBox.getValue(),attrFilter:this.filterCheckBox.getValue(),filterList:this._filterList};e.mapExtentFilter||e.drawExtentFilter||(e.spatialFilter=!1);e.drawExtentFilter&&(e.drawSymbol=this.symbolPicker.getSymbol().toJson());return e},_filterStatusChange:function(e){e?p.remove(this.filterIcon,"disabled"):p.add(this.filterIcon,
"disabled")},_spatialStatusChange:function(e){e?q.set(this.spatialChoices,"display","block"):q.set(this.spatialChoices,"display","none")},_showFilter:function(){if(this.filterCheckBox.getValue()){var e=new a({titleLabel:this.nls.configFilter,filterList:this._filterList,streamLayer:this.streamLayer,nls:this.nls});this.own(g(e,"ok",d.hitch(this,function(m){this._filterList=m;e.close()})));this.own(g(e,"cancel",d.hitch(this,function(){e.close()})));this.own(g(e,"empty",d.hitch(this,function(){new b({message:this.nls.setFilterTip})})));
e.startup()}}})})},"jimu/dijit/SymbolPicker":function(){define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dojo/Evented dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/query dijit/TooltipDialog dijit/popup dijit/registry jimu/dijit/SymbolChooser jimu/symbolUtils".split(" "),function(n,d,g,k,f,h,r,p,q,u,t,l,v,b){return n([d,g,k],{baseClass:"jimu-symbol-picker",declaredClass:"jimu.dijit.SymbolPicker",templateString:'\x3cdiv\x3e\x3cdiv data-dojo-attach-point\x3d"symbolNode" class\x3d"symbol-node jimu-float-leading"\x3e\x3c/div\x3e\x3cdiv class\x3d"separator jimu-float-leading"\x3e\x3c/div\x3e\x3cdiv class\x3d"jimu-icon jimu-icon-down-arrow-8 jimu-float-leading"\x3e\x3c/div\x3e\x3c/div\x3e',
tooltipDialog:null,_isTooltipDialogOpened:!1,symbol:null,type:null,cropImage:!1,customZIndex:null,postCreate:function(){this.inherited(arguments);this._createTooltipDialog();this._hideTooltipDialog();var a=this.symbolChooser.getSymbol();a&&this._drawSymbol(a)},destroy:function(){this._hideTooltipDialog();this.symbolChooser&&this.symbolChooser.destroy();this.symbolChooser=null;this.inherited(arguments)},_createTooltipDialog:function(){var a=h.create("div");this.tooltipDialog=new u({content:a});this.symbolChooser=
new v({cropImage:this.cropImage,customZIndex:this.customZIndex,symbol:this.symbol,type:this.type});this.symbolChooser.placeAt(a);this.symbolChooser.startup();this.own(p(this.symbolChooser,"change",f.hitch(this,function(c){this._drawSymbol(c);this.emit("change",c)})));this.own(p(this.domNode,"click",f.hitch(this,function(c){c.stopPropagation();c.preventDefault();this._isTooltipDialogOpened?this._hideTooltipDialog():this._showTooltipDialog()})));this.own(p(document.body,"click",f.hitch(this,function(c){var e=
c.target||c.srcElement;c=this._getColorPickers();if(!(0<c.length&&r.some(c,function(x){return x.isPartOfPopup(e)})))if(c=this.tooltipDialog.domNode,c=e===c||h.isDescendant(e,c),this.cropImage&&this.symbolChooser._isCustomImageOptionSelected()){var m=this.symbolChooser.imageChooser,w=m.msgPopupOpen;m.cropPopupOpen||w||c||this._hideTooltipDialog();m.cropPopup&&m.cropPopup.domNode||(m.cropPopupOpen=!1);m.msgPopup&&m.msgPopup.domNode||(m.msgPopupOpen=!1)}else c||this._hideTooltipDialog()})));this.own(p(this.symbolChooser,
"resize",f.hitch(this,function(){this._isTooltipDialogOpened&&(this._hideTooltipDialog(),this._showTooltipDialog())})))},_getColorPickers:function(){var a=q(".jimu-color-picker",this.symbolChooser.domNode);return r.map(a,f.hitch(this,function(c){return l.byNode(c)}))},reset:function(){this.symbol=this.type=null;h.empty(this.symbolNode);this.symbolChooser.reset()},showBySymbol:function(a){this.reset();a&&(this._drawSymbol(a),this.symbolChooser.showBySymbol(a))},showByType:function(a){this.reset();
this.symbolChooser.showByType(a);(a=this.symbolChooser.getSymbol())&&this._drawSymbol(a)},getSymbol:function(){return this.symbolChooser.getSymbol()},_drawSymbol:function(a){h.empty(this.symbolNode);a&&(a=b.createSymbolNode(a,{width:16,height:16}))&&h.place(a,this.symbolNode)},_showTooltipDialog:function(){this.tooltipDialog&&(t.open({parent:this.getParent(),popup:this.tooltipDialog,around:this.domNode}),this._isTooltipDialogOpened=!0)},_hideTooltipDialog:function(){this.tooltipDialog&&(t.close(this.tooltipDialog),
this._isTooltipDialogOpened=!1)}})})},"widgets/Stream/setting/FilterConfigPopup":function(){define("dojo/_base/declare dojo/Evented dojo/_base/lang dojo/_base/html jimu/dijit/Popup jimu/dijit/LoadingIndicator ./FilterConfig".split(" "),function(n,d,g,k,f,h,r){return n([f,d],{width:1024,height:600,titleLabel:"",filterList:null,streamLayer:null,nls:null,constructor:function(){this.inherited(arguments);this.nls=g.clone(window.jimuNls.common);this.buttons=[{label:this.nls.ok,onClick:g.hitch(this,this._accept)},
{label:this.nls.cancel,onClick:g.hitch(this,this._reject)}]},postCreate:function(){this.inherited(arguments);k.addClass(this.domNode,"stream-filter-popup");this._initLoading();this._initFilter()},_initFilter:function(){this.filter=new r({streamLayer:this.streamLayer,config:this.filterList,nls:this.nls});this.filter.placeAt(this.contentContainerNode)},_reject:function(){this.emit("cancel")},_accept:function(){var p=this.filter.getConfig();p&&0!==p.length?this.emit("ok",p):this.emit("empty")},_initLoading:function(){this.loading=
new h({hidden:!0});this.loading.placeAt(this.domNode);this.loading.startup()}})})},"widgets/Stream/setting/FilterConfig":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/on dojo/dom-style dojo/dom-class dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./FilterConfig.html ./SingleFilter jimu/dijit/Message jimu/dijit/SimpleTable jimu/dijit/LoadingShelter".split(" "),function(n,d,g,k,f,h,r,p,q,u,t,l,v){return n([r,p,q],{baseClass:"jimu-widget-stream-filter",
templateString:u,streamLayer:null,config:null,postCreate:function(){this.inherited(arguments);this.filterList=new v({autoHeight:!1,selectable:!0,fields:[{name:"name",title:this.nls.name,width:"auto",type:"text",editable:!1},{name:"actions",title:"",width:"70px",type:"actions",actions:["up","down","delete"]}]},this.filterList);h.add(this.filterList.domNode,"stream-filter-table");f.set(this.filterList.domNode,"height","100%");this.own(k(this.filterList,"row-select",d.hitch(this,this._onFilterSelected)));
this.own(k(this.filterList,"row-delete",d.hitch(this,this._onFilterRemoved)));this.filterList.startup();this.config&&0<this.config.length&&this._applyConfig()},_applyConfig:function(){this.filterList.clear();g.forEach(this.config,d.hitch(this,function(b,a){var c=this.filterList.addRow({name:b.name||this.nls.newFilter}).tr;this._createFilter(c,b);0===a&&this.filterList.selectRow(c)}))},getConfig:function(){var b,a=[],c;g.forEach(this.filterList.getRows(),function(e){b=e.filter;(c=b.getConfig())&&a.push(c)});
return a},_addFilter:function(){var b=this.filterList.addRow({name:this.nls.newFilter});b.success?(b=b.tr,this._createFilter(b,{name:this.nls.newFilter}),this.filterList.selectRow(b)):new l({message:this.nls.addFilterFailed})},_onFilterSelected:function(b){var a;this.currentTR?this.currentTR!==b&&((a=this.currentTR.filter)&&f.set(a.domNode,"display","none"),this.currentTR=b,(a=this.currentTR.filter)&&f.set(a.domNode,"display","block")):(this.currentTR=b,(a=this.currentTR.filter)&&f.set(a.domNode,
"display","block"))},_onFilterRemoved:function(b){var a=b.filter;a&&(a.destroy(),b.filter=null)},_createFilter:function(b,a){a=new t({config:a,streamLayer:this.streamLayer,nls:this.nls});a.placeAt(this.singleFilterContainer);b.filter=a;this.own(k(a,"filterNameChanged",d.hitch(this,function(c){this.filterList.editRow(b,{name:c})})));f.set(a.domNode,"display","none")}})})},"widgets/Stream/setting/SingleFilter":function(){define("dojo/_base/declare dojo/_base/lang dojo/json dojo/on dojo/Evented dojo/dom-style dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./SingleFilter.html jimu/dijit/Filter jimu/dijit/SimpleTable jimu/dijit/LoadingShelter dijit/form/ValidationTextBox".split(" "),
function(n,d,g,k,f,h,r,p,q,u,t){return n([r,p,q,f],{baseClass:"jimu-widget-stream-filter",templateString:u,streamLayer:null,config:null,_inherited:null,_definitionExpression:null,postCreate:function(){this.inherited(arguments);this._inherited=!1;this._definitionExpression="";this._init()},_init:function(){this.filterNameEditor.set("value",this.config.name||this.nls.newFilter);"inherited"in this.config&&(this._inherited=this.config.inherited);"definitionExpression"in this.config&&(this._definitionExpression=
this.config.definitionExpression);this.own(k(this.filterNameEditor,"change",d.hitch(this,function(v){this.emit("filterNameChanged",v)})));this.filter=new t({enableAskForValues:!0,noFilterTip:this.nls.noFilterTip,style:"width:100%;margin-top:22px;"});this.filter.placeAt(this.singleFilterContent);this._inherited?(h.set(this.filterMask,"display","block"),h.set(this.filterMaskTip,"display","block")):(h.set(this.filterMask,"display","none"),h.set(this.filterMaskTip,"display","none"));if(this.streamLayer&&
this.config){this.shelter.show();var l=g.parse(this.streamLayer._json);"object"===typeof this.config&&"object"===typeof this.config.filterInfo?this.filter.buildByFilterObj(this.streamLayer.url,this.config.filterInfo,this.streamLayer).then(d.hitch(this,function(){this.shelter.hide()})):this.filter.buildByExpr(this.streamLayer.url,"1\x3d1",l).then(d.hitch(this,function(){this.shelter.hide()}))}},getConfig:function(){var l=this.filter.toJson();return l?{inherited:this._inherited,definitionExpression:this._definitionExpression,
name:this.filterNameEditor.get("value"),filterInfo:l}:null}})})},"widgets/Stream/FilterUtil":function(){define(["jimu/dijit/Filter","dojo/dom-construct"],function(n,d){return{buildFilterInfoFromString:function(g,k,f){var h=new n,r=d.create("div");h.placeAt(r);h.startup();return h.buildByExpr(g.url,k,g).then(function(){return{inherited:!0,definitionExpression:k,name:f,filterInfo:h.toJson()}},function(){return null})}}})},"widgets/Stream/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html",
"dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/Stream/setting/Setting.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"stream-list"\x3e\r\n    \x3cdiv class\x3d"stream-list-head" style\x3d"overflow:hidden;"\x3e\r\n      \x3cdiv class\x3d"jimu-float-leading jimu-widget-title"\x3e${nls.streamLayers}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"stream-list-content"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"streamList"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"single-stream-container" data-dojo-attach-point\x3d"singleStreamContainer"\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"shelter" data-dojo-type\x3d"jimu/dijit/LoadingShelter" data-dojo-props\x3d\'hidden:true\'\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
"url:widgets/Stream/setting/StreamSetting.html":'\x3cdiv\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"detailSection" class\x3d"detail"\x3e\r\n    \x3cdiv\x3e\r\n      \x3cdiv class\x3d"titleContainer"\x3e\r\n        \x3clabel class\x3d"jimu-widget-title"\x3e${nls.streamControls}\x3c/label\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"startStopCheckBoxDiv" class\x3d"checkboxContainer jimu-widget-tooltip"\x3e\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"clearPreviousCheckBoxDiv" class\x3d"checkboxContainer jimu-widget-tooltip"\x3e\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"drawPreviousCheckBoxDiv" class\x3d"checkboxContainer jimu-widget-tooltip"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv\x3e\r\n      \x3cdiv class\x3d"titleContainer"\x3e\r\n        \x3clabel class\x3d"jimu-widget-title"\x3e${nls.streamFilter}\x3c/label\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"spatialFilterCheckBoxDiv" class\x3d"checkboxContainer jimu-widget-tooltip"\x3e\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"spatialChoices"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"mapExtentCheckBoxDiv" class\x3d"subCheckboxContainer jimu-widget-tooltip"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"subCheckboxContainer"\x3e\r\n          \x3cdiv data-dojo-attach-point\x3d"drawExtentCheckBoxDiv" class\x3d"jimu-widget-tooltip" style\x3d"display:inline"\x3e\x3c/div\x3e\r\n          \x3cdiv data-dojo-attach-point\x3d"symbolPickerNode" style\x3d"display:none"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"filterCheckBoxDiv" class\x3d"jimu-widget-tooltip"\r\n             class\x3d"checkboxContainer" style\x3d"display: inline-block"\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"filterIcon" class\x3d"filterIcon disabled jimu-leading-margin05"\r\n          data-dojo-attach-event\x3d"onClick: _showFilter"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"shelter" data-dojo-type\x3d"jimu/dijit/LoadingShelter" data-dojo-props\x3d\'hidden:true\'\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/Stream/setting/FilterConfig.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"stream-filter-head" style\x3d"overflow:hidden;"\x3e\r\n    \x3cdiv class\x3d"jimu-float-leading"\x3e\r\n      \x3cdiv class\x3d"add-with-icon" data-dojo-attach-event\x3d"onclick:_addFilter"\x3e\r\n        \x3cspan class\x3d"jimu-icon jimu-icon-add"\x3e\x3c/span\x3e\r\n        \x3cspan class\x3d"add-label jimu-widget-normal"\x3e${nls.addNew}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"stream-filterList"\x3e\r\n    \x3cdiv class\x3d"stream-filterList-content"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"filterList"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"single-filter-container" data-dojo-attach-point\x3d"singleFilterContainer"\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"shelter" data-dojo-type\x3d"jimu/dijit/LoadingShelter" data-dojo-props\x3d\'hidden:true\'\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
"url:widgets/Stream/setting/SingleFilter.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"single-filter-container"\x3e\r\n    \x3cdiv\x3e\r\n      \x3cspan class\x3d"jimu-widget-normal"\x3e${nls.filterName}\x3c/span\x3e\r\n      \x3cinput data-dojo-type\x3d"dijit/form/ValidationTextBox"\r\n        data-dojo-props\x3d"required:true"\r\n        data-dojo-attach-point\x3d"filterNameEditor"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv style\x3d"position:relative;"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"singleFilterContent"\x3e\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"filterMask" class\x3d"mask"\x3e\x3c/div\x3e\r\n      \x3cspan class\x3d"jimu-widget-normal mask-tip" data-dojo-attach-point\x3d"filterMaskTip"\x3e\r\n        ${nls.filterReadOnly}\r\n      \x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"shelter" data-dojo-type\x3d"jimu/dijit/LoadingShelter"\r\n       data-dojo-props\x3d\'hidden:true\'\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
"url:widgets/Stream/setting/css/style.css":".jimu-widget-stream-setting{height: 90%; margin-top: 20px;}.jimu-widget-stream-setting .titleContainer{margin-bottom: 12px;}.jimu-widget-stream-setting .checkboxContainer{margin-bottom: 15px;}.jimu-widget-stream-setting .subCheckboxContainer{margin-bottom: 15px; margin-left: 30px;}.jimu-rtl .jimu-widget-stream-setting .subCheckboxContainer{margin-right: 30px; margin-left: auto;}.jimu-widget-stream-setting .filterIcon{background-image: url(images/edit_icon02.png); width: 16px; height: 16px; cursor: pointer; background-repeat: no-repeat; display: inline-block;}.jimu-widget-stream-setting .filterIcon.disabled{background-image: url(images/edit_icon01.png); cursor: default;}.jimu-widget-stream-setting .stream-list{position: absolute; top: 0; left: 0; width: 235px; height: 100%;}.jimu-rtl .jimu-widget-stream-setting .stream-list{left: auto; right: 0;}.jimu-widget-stream-setting .stream-list-content{position: absolute; width: 100%; top: 30px; bottom: 5px; overflow-y: auto;}.jimu-widget-stream-setting .single-stream-container{position: absolute; left: 265px; right: 0; height: 100%; overflow-y: auto;}.jimu-rtl .jimu-widget-stream-setting .single-stream-container{right: 265px; left: 0;}.stream-filter-head{width: 100%; height: 30px;}.stream-filterList{width: 100%; height: 100%;}.stream-filterList-content{position: absolute; width: 250px; top: 40px; bottom: 5px; overflow-y: auto;}.single-filter-container{margin-left: 140px; margin-top: 5px; overflow-y: auto;}.jimu-rtl .single-filter-container{margin-right: 140px; margin-left: auto;}.jimu-widget-stream-filter .mask{position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #FFFFFF; opacity: 0;}.jimu-widget-stream-filter .mask-tip{color: #FF0000;}",
"*now":function(n){n(['dojo/i18n!*preload*widgets/Stream/setting/nls/Setting*["ar","bs","ca","cs","da","de","en","el","es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sk","sl","sr","sv","th","tr","zh-cn","uk","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/on dojo/dom-style dojo/dom-class dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./Setting.html jimu/BaseWidgetSetting ./utils ./StreamSetting jimu/dijit/SimpleTable jimu/dijit/LoadingShelter".split(" "),function(n,d,g,k,f,h,r,p,q,u,t,l,v){return n([u,r,p],{baseClass:"jimu-widget-stream-setting",templateString:q,postMixInProperties:function(){this.inherited(arguments);d.mixin(this.nls,window.jimuNls.common,window.jimuNls.filterBuilder)},
postCreate:function(){this.inherited(arguments);this.streamList=new v({autoHeight:!1,selectable:!0,fields:[{name:"name",title:this.nls.name,width:"auto",type:"text",editable:!1}]},this.streamList);h.add(this.streamList.domNode,"stream-list-table");f.set(this.streamList.domNode,"height","100%");this.own(k(this.streamList,"row-select",d.hitch(this,this._onStreamLayerSelected)));this.streamList.startup();this.layerList=t.getStreamLayers(this.map);g.forEach(this.layerList,d.hitch(this,function(b,a){var c=
null;var e=this.streamList.addRow({name:t.getStreamLayerName(b.url)});if(e.success){var m=e.tr;this.config&&this.config.streamLayers&&0<this.config.streamLayers.length&&g.some(this.config.streamLayers,d.hitch(this,function(w){if(w.layerId===b.id)return c=w,!0}));this._createSingleStreamSetting(m,b,c)}0===a&&this.streamList.selectRow(m)}))},getConfig:function(){var b,a={streamLayers:[]};g.forEach(this.streamList.getRows(),function(c){b=c.streamLayerSetting;a.streamLayers.push(b.getConfig())});return a},
_onStreamLayerSelected:function(b){var a;this.currentTR?this.currentTR!==b&&((a=this.currentTR.streamLayerSetting)&&f.set(a.domNode,"display","none"),this.currentTR=b,(a=this.currentTR.streamLayerSetting)&&f.set(a.domNode,"display","block")):(this.currentTR=b,(a=this.currentTR.streamLayerSetting)&&f.set(a.domNode,"display","block"))},_createSingleStreamSetting:function(b,a,c){var e=this.streamList.getRowData(b);a=new l({map:this.map,nls:this.nls,config:c,layerName:e?e.name:"",streamLayer:a});a.placeAt(this.singleStreamContainer);
b.streamLayerSetting=a;f.set(a.domNode,"display","none")}})});