(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{135:function(e,t){e.exports=function(e,t){return[Math.round(e[0]/t)*t,Math.round(e[1]/t)*t]}},161:function(e,t,a){"use strict";function n(e,t,a,n,r,o,i){i=i||{};var c=t[e];return Object.keys(c).reduce(function(c,s){var l=function(e,t,a,n,r,o,i,c){var s=a[e][t],l=a[t][e],p=[],u=[],d=c.edgeDataSeed;for(c.edgeDataReduceFn&&(d=c.edgeDataReduceFn(d,o[t][e]));!n[t];){var m=a[t];if(!m)break;var h=Object.keys(m).filter(function(t){return t!==e})[0];if(s+=m[h],i){if(l+=a[h][t],u.indexOf(t)>=0){n[t]=a[t];break}u.push(t)}c.edgeDataReduceFn&&(d=c.edgeDataReduceFn(d,o[t][h])),p.push(r[t]),e=t,t=h}return{vertex:t,weight:s,reverseWeight:l,coordinates:p,reducedEdge:d}}(e,s,t,a,n,r,o,i),p=l.weight,u=l.reverseWeight;if(l.vertex!==e&&((!c.edges[l.vertex]||c.edges[l.vertex]>p)&&(c.edges[l.vertex]=p,c.coordinates[l.vertex]=[n[e]].concat(l.coordinates),c.reducedEdges[l.vertex]=l.reducedEdge),o&&!isNaN(u)&&(!c.incomingEdges[l.vertex]||c.incomingEdges[l.vertex]>u))){c.incomingEdges[l.vertex]=u;var d=[n[e]].concat(l.coordinates);d.reverse(),c.incomingCoordinates[l.vertex]=d}return c},{edges:{},incomingEdges:{},coordinates:{},incomingCoordinates:{},reducedEdges:{}})}e.exports={compactNode:n,compactGraph:function(e,t,a,r){var o=(r=r||{}).progress,i=Object.keys(e).reduce(function(t,a,n,r){var i,c=e[a],s=Object.keys(c),l=s.length;if(1===l){var p=e[s[0]];i=!p[a]}else i=2===l&&s.filter(function(t){return e[t][a]}).length===l;return i||(t[a]=c),n%1e3===0&&o&&o("compact:ends",n,r.length),t},{});return Object.keys(i).reduce(function(c,s,l,p){var u=n(s,e,i,t,a,!1,r);return c.graph[s]=u.edges,c.coordinates[s]=u.coordinates,r.edgeDataReduceFn&&(c.reducedEdges[s]=u.reducedEdges),l%1e3===0&&o&&o("compact:nodes",l,p.length),c},{graph:{},coordinates:{},reducedEdges:{}})}}},282:function(e,t,a){var n=a(326);e.exports=function(e,t,a){var r={};r[t]=0;for(var o=new n([[0,[t],t]],function(e,t){return e[0]-t[0]});o.length;){var i=o.pop(),c=i[0],s=i[2];if(s===a)return i.slice(0,2);var l=e[s];Object.keys(l).forEach(function(e){var t=c+l[e];if(!(e in r)||t<r[e]){r[e]=t;var a=[t,i[1].concat([e]),e];o.push(a)}})}return null}},283:function(e,t,a){"use strict";var n=a(327),r=a(135);function o(e){return"LineString"===e.geometry.type}e.exports=function(e,t){var a=(t=t||{}).keyFn||function(e){return e.join(",")},i=t.precision||1e-5,c=function(e,t){var a=[];"FeatureCollection"===e.type&&(a=a.concat(e.features.filter(t)));return{type:"FeatureCollection",features:a}}(e,o),s=n(c).features.reduce(function(e,n,o,c){var s=r(n.geometry.coordinates,i);return e[a(s)]=n.geometry.coordinates,o%1e3===0&&t.progress&&t.progress("topo:vertices",o,c.length),e},{}),l=function e(t,a,n){return"FeatureCollection"===t.type?t.features.reduce(function(t,n){return e(n,a,t)},n):a(n,t)}(c,function(e,n,o,c){return n.geometry.coordinates.forEach(function(t,o,c){if(o>0){var s=a(r(c[o-1],i)),l=a(r(t,i));e.push([s,l,n.properties])}}),o%1e3===0&&t.progress&&t.progress("topo:edges",o,c.length),e},[]);return{vertices:s,edges:l}}},318:function(e,t,a){e.exports=a(563)},343:function(e,t,a){e.exports=a.p+"static/media/start.2b3a6e15.svg"},344:function(e,t,a){e.exports=a.p+"static/media/finish.b336a83d.svg"},345:function(e,t,a){e.exports=a.p+"static/media/business.e87899ae.svg"},346:function(e,t,a){e.exports=a.p+"static/media/bicycle.971f6a4f.svg"},347:function(e,t,a){e.exports=a.p+"static/media/hiking.eb071ea3.svg"},348:function(e,t,a){e.exports=a.p+"static/media/tent.051bcc3a.svg"},349:function(e,t,a){e.exports=a.p+"static/media/hut.4687401e.svg"},350:function(e,t,a){e.exports=a.p+"static/media/town.1b07dea6.svg"},351:function(e,t,a){e.exports=a.p+"static/media/water.1006b328.svg"},352:function(e,t,a){e.exports=a.p+"static/media/attraction.cb8356bf.svg"},353:function(e,t,a){e.exports=a.p+"static/media/vehicle.10d97375.svg"},553:function(e,t,a){},555:function(e,t,a){},557:function(e,t,a){},559:function(e,t,a){},561:function(e,t,a){},563:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(11),i=a.n(o),c=a(45),s=a(137),l=a(188),p=a(23),u="FETCH_PRODUCTS_BEGIN",d="FETCH_PRODUCTS_SUCCESS",m="FETCH_MARKERS_SUCCESS",h="FETCH_PRODUCTS_FAILURE",f="CALC_DISTANCE",g="CALC_ELEVATION",y="STORE_CUSTOM_TRACK",k="CHANGE_ZOOM_LEVEL",E="CHANGE_FOCUS_POINT",v="FIND_TRAIL_MARKERS",b="FILTER_TRAIL_MARKERS",_="CHANGE_TERRAIN",M="SET_START_POINT",O="SET_END_POINT",w="STORE_FOCUS_MARKER",j="SET_CUSTOM_DISTANCE_MARKER",C="ADD_MAP_MARKER_START",S="ADD_MAP_MARKER_END",P="WIPE_MARKERS_AND_PATH",D="WIPE_MARKERS",N="ALLOW_CUSTOM_PATH",T="CHANGE_SIDEBAR_DATA",A="SET_OPEN_MENUS",I="OPEN_DISTANCE_TAB",x="FETCH_MAPS_SUCCESS";function R(){return function(e){e(L()),fetch("http://localhost:8082/api/maps/getmany").then(F).then(function(e){return e.json()}).then(function(e){return e.map(function(e){return{map_name:e.Map_name,map_alias:e.Map_alias,walking:e.Walking,cycling:e.Cycling,horseriding:e.Horseriding}})}).then(function(t){e(U(t))}).catch(function(t){return e(K(t))})}}function F(e){if(!e.ok)throw Error(e.statusText);return e}var L=function(){return{type:u}},B=function(e){return{type:d,payload:{initMapInfo:e}}},z=function(e){return{type:m,payload:{markers:e}}},U=function(e){return{type:x,payload:{maps:e}}},K=function(e){return{type:h,payload:{error:e}}},H=function(e){return{type:k,payload:e}},V=function(e){return{type:E,payload:e}},G=function(e){return{type:y,payload:e}},W=function(e){return{type:v,payload:e}},Z=function(e){return{type:b,payload:e}},q=function(e){return{type:_,payload:e}},J=function(e){return{type:M,payload:e}},Q=function(e){return{type:O,payload:e}},$=function(e){return{type:w,payload:e}},X=function(e){return{type:j,payload:e}},Y=function(){return{type:P}},ee=function(){return{type:D}},te=function(e){return{type:N,payload:e}},ae=function(e,t){return{type:T,payload:{blurb:e,image:t}}},ne=function(e){return{type:A,payload:e}},re={data:[],loadingTrack:!0,loadingMarkers:!0,error:null,poiMarkers:[],distancePoint:{},mapMarkerTypes:[],distance:0,elevation:[],customDistance:[],customPath:{},terrain:"topo",zoom:10,center:0,filters:[],startPoint:{},endPoint:{},focusMarker:{},customDistanceMarker:[],mapMarkerStart:null,mapMarkerEnd:null,allowCustomPath:!1,sideBarImage:null,sideBarBlurb:null,openKeys:[],allMaps:[]};var oe=a(280),ie=a(24),ce=a(25),se=a(27),le=a(26),pe=a(28),ue=a(577),de=a(585),me=a(583),he=a(43),fe=a.n(he),ge=a(53),ye=a.n(ge),ke=(a(312),a(44)),Ee=a(281),ve=a.n(Ee),be=a(282),_e=a.n(be),Me=a(283),Oe=a.n(Me),we=a(161),je=a.n(we),Ce=a(135),Se=a.n(Ce),Pe=a(221),De=a.n(Pe);function Ne(e,t){if(t=t||{},e.compactedVertices||(e=function(e,t){var a,n=(t=t||{}).weightFn||function(e,t){return ye()(De()(e),De()(t))};"FeatureCollection"===e.type?a=Oe()(e,t):e.edges&&(a=e),e=a.edges.reduce(function(e,r,o,i){var c=r[0],s=r[1],l=r[2],p=n(a.vertices[c],a.vertices[s],l),u=function(a){e.vertices[a]||(e.vertices[a]={},t.edgeDataReduceFn&&(e.edgeData[a]={}))},d=function(a,n,r){e.vertices[a][n]=r,t.edgeDataReduceFn&&(e.edgeData[a][n]=t.edgeDataReduceFn(t.edgeDataSeed,l))};return p&&(u(c),u(s),p instanceof Object?(p.forward&&d(c,s,p.forward),p.backward&&d(s,c,p.backward)):(d(c,s,p),d(s,c,p))),o%1e3===0&&t.progress&&t.progress("edgeweights",o,i.length),e},{edgeData:{},vertices:{}});var r=je.a.compactGraph(e.vertices,a.vertices,e.edgeData,t);return{vertices:e.vertices,edgeData:e.edgeData,sourceVertices:a.vertices,compactedVertices:r.graph,compactedCoordinates:r.coordinates,compactedEdges:t.edgeDataReduceFn?r.reducedEdges:null}}(e,t)),this._graph=e,this._keyFn=t.keyFn||function(e){return e.join(",")},this._precision=t.precision||1e-5,this._options=t,0===Object.keys(this._graph.compactedVertices).filter(function(e){return"edgeData"!==e}).length)throw new Error("Compacted graph contains no forks (topology has no intersections).")}Ne.prototype={findPath:function(e,t){var a=this._keyFn(Se()(e.geometry.coordinates,this._precision)),n=this._keyFn(Se()(t.geometry.coordinates,this._precision));if(!this._graph.vertices[a]||!this._graph.vertices[n])return null;this._createPhantom(a),this._createPhantom(n);var r=_e()(this._graph.compactedVertices,a,n);if(r){var o=r[0];return{path:(r=r[1]).reduce(function(e,t,a,n){return a>0&&(e=e.concat(this._graph.compactedCoordinates[n[a-1]][t])),e}.bind(this),[]).concat([this._graph.sourceVertices[n]]),weight:o,edgeDatas:this._graph.compactedEdges?r.reduce(function(e,t,a,n){return a>0&&e.push({reducedEdge:this._graph.compactedEdges[n[a-1]][t]}),e}.bind(this),[]):void 0}}return null},serialize:function(){return this._graph},_createPhantom:function(e){if(this._graph.compactedVertices[e])return null;var t=je.a.compactNode(e,this._graph.vertices,this._graph.compactedVertices,this._graph.sourceVertices,this._graph.edgeData,!0,this._options);return this._graph.compactedVertices[e]=t.edges,this._graph.compactedCoordinates[e]=t.coordinates,this._graph.compactedEdges&&(this._graph.compactedEdges[e]=t.reducedEdges),Object.keys(t.incomingEdges).forEach(function(a){this._graph.compactedVertices[a][e]=t.incomingEdges[a],this._graph.compactedCoordinates[a][e]=t.incomingCoordinates[a],this._graph.compactedEdges&&(this._graph.compactedEdges[a][e]=t.reducedEdges[a])}.bind(this)),e},_removePhantom:function(e){e&&(Object.keys(this._graph.compactedVertices[e]).forEach(function(t){delete this._graph.compactedVertices[t][e]}.bind(this)),Object.keys(this._graph.compactedCoordinates[e]).forEach(function(t){delete this._graph.compactedCoordinates[t][e]}.bind(this)),this._graph.compactedEdges&&Object.keys(this._graph.compactedEdges[e]).forEach(function(t){delete this._graph.compactedEdges[t][e]}.bind(this)),delete this._graph.compactedVertices[e],delete this._graph.compactedCoordinates[e],this._graph.compactedEdges&&delete this._graph.compactedEdges[e])}};var Te=a(284),Ae=a.n(Te),Ie=a(222),xe=a.n(Ie),Re=a(285),Fe=a.n(Re),Le=a(218),Be=a(217);var ze=function(e,t,a){if(a=a||{},!Object(ke.isObject)(a))throw new Error("options is invalid");var n=e.geometry?e.geometry.type:e.type;if("LineString"!==n&&"MultiLineString"!==n)throw new Error("lines must be LineString or MultiLineString");var r=Object(ke.point)([1/0,1/0],{dist:1/0}),o=0;return Object(Le.flattenEach)(e,function(e){for(var n=Object(Be.getCoords)(e),i=0;i<n.length-1;i++){var c=Object(ke.point)(n[i]);c.properties.dist=ye()(t,c,a);var s=Object(ke.point)(n[i+1]);s.properties.dist=ye()(t,s,a);var l=ye()(c,s,a),p=Math.max(c.properties.dist,s.properties.dist),u=Ae()(c,s),d=xe()(t,p,u+90,a),m=xe()(t,p,u-90,a),h=Fe()(Object(ke.lineString)([d.geometry.coordinates,m.geometry.coordinates]),Object(ke.lineString)([c.geometry.coordinates,s.geometry.coordinates])),f=null;h.features.length>0&&((f=h.features[0]).properties.dist=ye()(t,f,a),f.properties.location=o+ye()(c,f,a)),c.properties.dist<r.properties.dist&&((r=c).properties.index=n[i],r.properties.location=o),s.properties.dist<r.properties.dist&&((r=s).properties.index=n[i+1],r.properties.location=o+l),f&&f.properties.dist<r.properties.dist&&((r=f).properties.index=n[i]),o+=l}}),r};function Ue(e,t,a){var n=ve()(e).features[0].geometry.coordinates,r=Object(ke.multiLineString)(n);return{closestStart:ze(r,Object(ke.point)([t.latlng.lng,t.latlng.lat])),closestFinish:ze(r,Object(ke.point)([a.latlng.lng,a.latlng.lat]))}}function Ke(e,t,a){var n=Ue(e,t,a),r=n.closestStart,o=n.closestFinish;if(r=Object(ke.point)(r.properties.index),o=Object(ke.point)(o.properties.index),fe.a.isEqual(r,o))return{path:null,distance:0,chartData:null,elevationGain:0,elevationLoss:0};var i=new Ne(e,{precision:1e-5}).findPath(r,o),c=function(e){var t,a=0,n=[],r=0,o=0;if(e.length>1)for(t=0;t<e.length;t++)if(e[t-1]){a+=ye()(e[t-1],e[t]);var i=0;t>0&&t%11===0&&(i=Math.abs(e[t][2]-e[t-11][2]))>5&&(e[t-11][2]<e[t][2]?r+=i:o+=i),n.push({elevation:e[t][2],distance:a,coords:[e[t][1],e[t][0]]})}else a=0,n.push({elevation:e[t][2],distance:a,coords:[e[t][1],e[t][0]]});return{distance:a,chartData:n,elevationGain:r,elevationLoss:o}}(i.path);return{path:Object(ke.lineString)(i.path),distance:c.distance,chartData:c.chartData,elevationGain:c.elevationGain,elevationLoss:c.elevationLoss}}var He=a(575),Ve=a(573),Ge=a(584),We=a(586),Ze=a(568),qe=a(16),Je=a.n(qe),Qe=new Je.a.Icon({iconUrl:a(343),iconSize:new Je.a.Point(30,35),className:null}),$e=new Je.a.Icon({iconUrl:a(344),iconSize:new Je.a.Point(30,35),className:null}),Xe=new Je.a.Icon({iconUrl:a(345),iconSize:new Je.a.Point(30,35),className:null}),Ye=new Je.a.Icon({iconUrl:a(346),iconSize:new Je.a.Point(30,35),className:null}),et=new Je.a.Icon({iconUrl:a(347),iconSize:new Je.a.Point(30,35),className:null}),tt=new Je.a.Icon({iconUrl:a(348),iconSize:new Je.a.Point(30,35),className:null}),at=new Je.a.Icon({iconUrl:a(349),iconSize:new Je.a.Point(30,35),className:null}),nt=new Je.a.Icon({iconUrl:a(350),iconSize:new Je.a.Point(30,35),className:null}),rt=new Je.a.Icon({iconUrl:a(351),iconSize:new Je.a.Point(30,35),className:null}),ot=new Je.a.Icon({iconUrl:a(352),iconSize:new Je.a.Point(30,35),className:null}),it=new Je.a.Icon({iconUrl:a(353),iconSize:new Je.a.Point(30,35),className:null});var ct=a(223),st=a(286),lt=a(287),pt=a(569),ut=a(582),dt=function(e){function t(){var e,a;Object(ie.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(se.a)(this,(e=Object(le.a)(t)).call.apply(e,[this].concat(r)))).markerClick=function(e){"startPoint"===e?a.props.setStartPoint(a.props.marker):a.props.setEndPoint(a.props.marker)},a}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this,t=this.props.marker,a=function(e){switch(e){case"start":return Qe;case"finish":return $e;case"business":return Xe;case"bicycle":return Ye;case"campsite":return tt;case"hut":return at;case"town":return nt;case"water":return rt;case"attraction":return ot;case"vehicle":return it;default:return tt}}(t.marker_type),n=t.marker_info;return r.a.createElement(Ze.a,{key:t.id,position:[t.marker_lat,t.marker_lng],icon:a,onClick:function(){e.props.onClick(t)}},r.a.createElement(ut.a,null,r.a.createElement("div",{className:"titleDiv"},r.a.createElement("h1",{style:{marginBottom:0}},t.marker_title," "),r.a.createElement("div",{className:"titleSpan"},r.a.createElement("a",null,r.a.createElement(ct.a,{icon:st.a,className:"startFlag",onClick:function(){e.markerClick("startPoint")}})),r.a.createElement("a",null,r.a.createElement(ct.a,{icon:lt.a,className:"startFlag",onClick:function(){e.markerClick("endPoint")}})))),r.a.createElement(pt.a,{style:{marginTop:0,marginBottom:5}}),r.a.createElement("div",{className:"popupText"},n.map(function(e){return r.a.createElement("div",null,r.a.createElement("b",null," ",e.title,": ")," ",e.value)}))))}}]),t}(n.Component),mt=Object(c.b)(function(e){return{}},function(e){return{setStartPoint:function(t){e(J(t))},setEndPoint:function(t){e(Q(t))}}})(dt),ht=function(e){function t(){var e,a;Object(ie.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(se.a)(this,(e=Object(le.a)(t)).call.apply(e,[this].concat(o)))).state={markerCounter:0},a.checkMarkers=function(e){a.props.allowCustomPath&&(0===a.state.markerCounter?(a.setState({markerCounter:a.state.markerCounter+1}),e.startEnd="start",a.addCustomMarker(e)):1===a.state.markerCounter?(a.setState({markerCounter:a.state.markerCounter+1}),e.startEnd="end",a.addCustomMarker(e)):(e.startEnd="start",a.props.wipeMarkersAndPath(),a.setState({markerCounter:1}),a.addCustomMarker(e)))},a.draggableMarker=function(e){e.latlng={lat:e.target._latlng.lat,lng:e.target._latlng.lng},"start"===e.startEnd?a.props.addMapMarkerStart(e):a.props.addMapMarkerEnd(e);var t=Ke(a.props.data.map_track,a.props.mapMarkerStart,a.props.mapMarkerEnd);a.props.storePath(t)},a.checkForCustomPath=function(){if(Object.keys(a.props.customPath).length&&a.props.customPath.path)return r.a.createElement(He.a,{key:a.props.customPath.elevationChartData.length,data:a.props.customPath.path,interactive:!1,color:"red"})},a.shouldShowMarker=function(e){var t=a.props.startPoint,n=a.props.endPoint,r=a.props.focusMarker;return!fe.a.isEmpty(t)&&t.marker_id===e.marker_id||(!fe.a.isEmpty(n)&&n.marker_id===e.marker_id||!fe.a.isEmpty(r)&&r.marker_id===e.marker_id)},a.onClickMarker=function(e){a.props.storeFocusMarker(e),a.props.changeSideBarData(e.marker_blurb,e.default_image)},a.filterMarkers=function(){var e=[];return a.props.poiMarkers.map(function(t){(a.props.filters.includes(t.marker_type)||a.shouldShowMarker(t))&&e.push(r.a.createElement(mt,{marker:t,onClick:a.onClickMarker}))}),e},a}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"addCustomMarker",value:function(e){if("start"===e.startEnd)this.props.addMapMarkerStart(e);else if(this.props.addMapMarkerEnd(e),function(e,t,a){var n=Ue(e,t,a),r=n.closestStart,o=n.closestFinish,i=ye()([r.geometry.coordinates[1],r.geometry.coordinates[0]],[t.latlng.lat,t.latlng.lng]),c=ye()([o.geometry.coordinates[1],o.geometry.coordinates[0]],[a.latlng.lat,a.latlng.lng]);return i<10&&c<10}(this.props.data.map_track,this.props.mapMarkerStart,this.props.mapMarkerEnd)){var t=Ke(this.props.data.map_track,this.props.mapMarkerStart,this.props.mapMarkerEnd);this.props.storePath(t),this.props.openKeys.includes("distanceTab")||this.props.openDistanceTab()}else this.props.wipeMarkersAndPath()}},{key:"render",value:function(){var e=this,t=this.props,a=t.data,n=(t.customPath,t.center),o=t.zoom,i=t.terrain,c=t.customDistanceMarker,s=t.mapMarkerStart,l=t.mapMarkerEnd,p="https://maps.tilehosting.com/styles/"+i+"/{z}/{x}/{y}.png?key=7qrAZ6R0EFPZMiyEp2m4";return r.a.createElement(Ve.a,{center:n,zoom:o,className:"map",zoomControl:!1,onClick:this.checkMarkers},r.a.createElement(Ge.a,{position:"bottomright"}),r.a.createElement(We.a,{attribution:'<a href="https://www.maptiler.com/license/maps/" target="_blank">\xa9 MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">\xa9 OpenStreetMap contributors</a>',url:p}),r.a.createElement(He.a,{interactive:!1,data:a.map_track}),this.checkForCustomPath(),this.filterMarkers().map(function(e){return e}),s?r.a.createElement(Ze.a,{key:s.distance,position:[s.latlng.lat,s.latlng.lng],icon:Qe,draggable:!0,onDragEnd:function(t){return t.startEnd="start",e.draggableMarker(t)},className:"map-marker-custom"}):null,l?r.a.createElement(Ze.a,{key:l.distance,position:[l.latlng.lat,l.latlng.lng],icon:$e,draggable:!0,onDragEnd:function(t){return t.startEnd="end",e.draggableMarker(t)},className:"map-marker-custom"}):null,c.length?r.a.createElement(Ze.a,{key:1,position:c,icon:"cycling"===this.props.data.map_type.toLowerCase()?Ye:et}):null)}}]),t}(n.Component),ft=Object(c.b)(function(e){return{data:e.data,poiMarkers:e.poiMarkers,customDistance:e.customDistance,customPath:e.customPath,center:e.center,zoom:e.zoom,filters:e.filters,terrain:e.terrain,startPoint:e.startPoint,endPoint:e.endPoint,focusMarker:e.focusMarker,customDistanceMarker:e.customDistanceMarker,mapMarkerStart:e.mapMarkerStart,mapMarkerEnd:e.mapMarkerEnd,allowCustomPath:e.allowCustomPath,openKeys:e.openKeys}},function(e){return{addMapMarkerStart:function(t){e({type:C,payload:t})},addMapMarkerEnd:function(t){e({type:S,payload:t})},storeDistance:function(t){e({type:f,payload:t})},calcElevation:function(t){e({type:g,payload:t})},storePath:function(t){e(G(t))},wipeMarkersAndPath:function(){e(Y())},openDistanceTab:function(){e({type:I})},changeSideBarData:function(t,a){e(ae(t,a))},storeFocusMarker:function(t){e($(t))}}})(ht),gt=a(570),yt=a(578),kt=a(491),Et=a(98),vt=a(566),bt=a(492),_t=a(565),Mt=function(e){function t(){var e,a;Object(ie.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(se.a)(this,(e=Object(le.a)(t)).call.apply(e,[this].concat(r)))).drawMarker=function(e){e.activePayload&&a.props.dispatch(X(e.activePayload[0].payload.coords))},a.wipeMarker=function(){a.props.dispatch(X([]))},a}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(gt.a,{width:"100%",height:"100%"},r.a.createElement(yt.a,{data:this.props.customPath.elevationChartData,margin:{top:5,right:20,left:5,bottom:12},onMouseMove:function(t){return e.drawMarker(t)},onMouseLeave:this.wipeMarker},r.a.createElement(kt.a,{dataKey:function(e){return Math.round(e.distance)}},r.a.createElement(Et.a,{value:"Distance (km)",offset:-6,position:"insideBottom",className:"x-axis"})),r.a.createElement(vt.a,{labelFormatter:function(e){return"distance: "+e+"km"},formatter:function(e){return e+"m"}}),"/>",r.a.createElement(bt.a,{allowDecimals:!1,dataKey:"elevation"},r.a.createElement(Et.a,{value:"Elevation (meters)",angle:-90,position:"insideLeft",offset:10,dy:60,style:{color:"red"},className:"y-axis"})),r.a.createElement(_t.a,{dot:!1,type:"monotone",dataKey:"elevation",stroke:"#8884d8"})))}}]),t}(n.Component),Ot=Object(c.b)(function(e){return{customPath:e.customPath}})(Mt),wt=a(104),jt=a(572),Ct=jt.a.TreeNode,St=function(e){function t(){var e,a;Object(ie.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(se.a)(this,(e=Object(le.a)(t)).call.apply(e,[this].concat(r)))).onMapSelect=function(e){window.location.href=e},a}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this.props.allMaps;return r.a.createElement(jt.a,{className:"map-select",value:this.props.data.map_name,placeholder:"Select a Map",dropdownStyle:{maxHeight:400,overflow:"auto"},allowClear:!0,size:"large",onSelect:this.onMapSelect},r.a.createElement(Ct,{selectable:!1,isLeaf:!1,value:"cycling",title:"Cycle Trails",key:"0-0"},e.map(function(e,t){if(e.cycling)return r.a.createElement(Ct,{value:e.map_alias,title:e.map_name,key:"0"+t})})),r.a.createElement(Ct,{selectable:!1,isLeaf:!1,value:"hiking",title:"Bushwalking Trails",key:"1-0"},e.map(function(e,t){if(e.walking)return r.a.createElement(Ct,{value:e.map_alias,title:e.map_name,key:"1"+t})})))}}]),t}(n.Component),Pt=Object(wt.a)(function(e){return{data:e.data,allMaps:e.allMaps}})(St),Dt=a(313),Nt=a(97),Tt=a(581),At=a(580),It=a(574),xt=a(576),Rt=xt.a.Option,Ft=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this.props,t=e.dataSource,a=e.onSelect,n=e.type,o=e.value,i=e.inputDirty,c=t.map(function(e){return r.a.createElement(Rt,{key:e.marker_id},e.marker_title)});return r.a.createElement("div",null,r.a.createElement(xt.a,{showSearch:!0,style:{width:200,marginBottom:10},onInputKeyDown:i,placeholder:this.props.placeHolder,filterOption:function(e,t){return-1!==t.props.children.toUpperCase().indexOf(e.toUpperCase())},onSelect:function(e){a(e,n)},value:o?o.marker_title:null},c))}}]),t}(n.Component),Lt=a(564),Bt=a(571),zt=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this.props,t=e.dataSource,a=e.dataSelect,n=e.buttonDisabled,o=e.submitDistance,i=e.startPoint,c=e.endPoint,s=e.clearPath,l=e.customPath;return r.a.createElement("div",{style:{marginLeft:48}},r.a.createElement("div",null,r.a.createElement(Ft,{placeHolder:"Start point",onSelect:a,type:"start",dataSource:t,value:i,className:"distance-calculator"}),r.a.createElement(Ft,{placeHolder:"End point",onSelect:a,type:"end",dataSource:t,value:c}),this.props.customDistance,r.a.createElement(Tt.a,{disabled:n,icon:"calculator",type:"primary",htmlType:"submit",className:"login-form-button",onClick:o},"Calculate"),l.path?r.a.createElement(Tt.a,{icon:"delete",type:"default",htmlType:"submit",className:"clear-path",onClick:s},"Clear"):null),r.a.createElement(pt.a,{className:"distance-divider"}),r.a.createElement(It.a,{bordered:!1,style:{width:250}},r.a.createElement("span",null,"Custom Path Creation",r.a.createElement(Lt.a,{title:"Click on the map to define a custom start and end point "},r.a.createElement(Nt.a,{style:{paddingLeft:4,fontSize:12},type:"question-circle"})),r.a.createElement(Bt.a,{size:"small",style:{marginLeft:5},checked:this.props.allowCustomPath,onChange:this.props.toggleCustomPath}))),r.a.createElement(pt.a,{style:{marginTop:0},className:"distance-divider"}),l.path?r.a.createElement(It.a,{bordered:!1,style:{width:250}},r.a.createElement("p",null,r.a.createElement("b",null," Distance: "),l.distance.toFixed(2),"km"),r.a.createElement("p",null,r.a.createElement("b",null,"Elevation Gain: "),Math.round(l.elevationGain),"m"),r.a.createElement("p",null,r.a.createElement("b",null,"Elevation Loss: ")," ",Math.round(l.elevationLoss),"m")):null)}}]),t}(r.a.Component),Ut=Object(c.b)(function(e){return{startPoint:e.startPoint,endPoint:e.endPoint,customPath:e.customPath,allowCustomPath:e.allowCustomPath}})(zt),Kt=a(579).a.Group,Ht=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this.props.mapMarkerTypes;return r.a.createElement(Kt,{style:this.props.style,options:e,onChange:this.props.filterMarkers,defaultValue:this.props.currentFilters})}}]),t}(n.Component),Vt=[{key:"darkmatter",pretty:"Dark Matter - (dark theme)"},{key:"basic",pretty:"Basic"},{key:"positron",pretty:"Positron - (greyscale)"},{key:"topo",pretty:"Topographical"}],Gt=xt.a.Option,Wt=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this.props,t=e.terrain,a=e.terrainSwitch;return r.a.createElement("div",null,r.a.createElement(xt.a,{style:this.props.style,onChange:a,defaultValue:t,placeholder:t.pretty},Vt.map(function(e){return r.a.createElement(Gt,{key:e.key}," ",e.pretty," ")})))}}]),t}(n.Component),Zt=At.a.SubMenu,qt=function(e){function t(){var e,a;Object(ie.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(se.a)(this,(e=Object(le.a)(t)).call.apply(e,[this].concat(r)))).dataSelect=function(e,t){var n=a.props.poiMarkers.find(function(t){return t.marker_id===parseInt(e)});"locate"===t?(a.props.dispatch(H(13)),a.props.dispatch(V([n.marker_lat,n.marker_lng])),a.props.dispatch($(n))):"start"===t?a.props.dispatch(J(n)):a.props.dispatch(Q(n))},a.submitDistance=function(e){e.preventDefault(),a.props.dispatch(ee());var t=a.calculateInfo();a.props.dispatch(G(t))},a.clearPath=function(e){e.preventDefault(),a.props.dispatch(Y())},a.calculateInfo=function(){var e=[{latlng:{lat:a.props.startPoint.marker_lat,lng:a.props.startPoint.marker_lng}},{latlng:{lat:a.props.endPoint.marker_lat,lng:a.props.endPoint.marker_lng}}];return Ke(a.props.data.map_track,e[0],e[1])},a.filterMarkers=function(e){a.props.dispatch(Z(e))},a.terrainSwitch=function(e){a.props.dispatch(q(e))},a.toggleCustomPath=function(e){a.props.dispatch(te(e))},a.isButtonDisabled=function(){var e=fe.a.isEmpty(a.props.startPoint),t=fe.a.isEmpty(a.props.endPoint);return!(!e&&!t)},a.handleMenuOpen=function(e){a.props.dispatch(ne(e))},a}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){var e=this.props,t=e.data,a=e.poiMarkers,n=e.mapMarkerTypes,o=e.sideBarImage,i=e.sideBarBlurb,c=e.terrain,s=e.focusMarker,l=e.filters,p=e.openKeys;return console.log(s),console.log(fe.a.isEmpty(s)),r.a.createElement(At.a,{className:"overlayMenu",onOpenChange:this.handleMenuOpen,style:{width:300,opacity:.9},defaultOpenKeys:["menu","sub5"],openKeys:p,mode:"inline"},r.a.createElement(Zt,{key:"menu",className:"title",title:r.a.createElement("span",null,r.a.createElement(Nt.a,{style:{fontSize:"1.4em"},type:"setting",theme:"outlined",className:"icons-large"}),r.a.createElement("span",{id:"map-tool-heading"}," Map Tools"))},r.a.createElement(pt.a,{style:{margin:0}}),r.a.createElement(Zt,{style:{paddingTop:40},key:"sub1",title:r.a.createElement("span",null,r.a.createElement(Nt.a,{type:"search",theme:"outlined",className:"sub-icon"}),r.a.createElement("span",{className:"sub-heading"},"Locate Point on Map"))},r.a.createElement("div",{style:{marginLeft:48}},r.a.createElement(Ft,{placeHolder:"Point on map",dataSource:a,type:"locate",onSelect:this.dataSelect,value:s}))),r.a.createElement(Zt,{key:"distanceTab",title:r.a.createElement("span",null,r.a.createElement(Nt.a,{type:"calculator",theme:"outlined",className:"sub-icon"}),r.a.createElement("span",{className:"sub-heading"},"Distance and Elevation"))},r.a.createElement(Ut,{dataSource:a,dataSelect:this.dataSelect,buttonDisabled:this.isButtonDisabled(),submitDistance:this.submitDistance,clearPath:this.clearPath,toggleCustomPath:this.toggleCustomPath})),r.a.createElement(Zt,{key:"sub3",title:r.a.createElement("span",null,r.a.createElement(Nt.a,{type:"select",theme:"outlined",className:"sub-icon"}),r.a.createElement("span",{className:"sub-heading"}," Filter Markers"))},r.a.createElement(Ht,{mapMarkerTypes:n,filterMarkers:this.filterMarkers,currentFilters:l,style:{marginLeft:48,width:200}})),r.a.createElement(Zt,{key:"sub4",title:r.a.createElement("span",null,r.a.createElement(Nt.a,{type:"picture",theme:"outlined",className:"sub-icon"}),r.a.createElement("span",{className:"sub-heading"},"Change Map Terrain"))},r.a.createElement(Wt,{terrain:c,terrainSwitch:this.terrainSwitch,style:{marginLeft:48,width:200}})),r.a.createElement(Zt,{key:"sub5",title:r.a.createElement("span",null,r.a.createElement(Nt.a,{type:"picture",theme:"outlined",className:"sub-icon"}),r.a.createElement("span",{className:"sub-heading"},"Map & Marker Information"))},r.a.createElement(It.a,{bordered:!1,className:"info-card"},r.a.createElement("span",null,r.a.createElement("img",{className:"map-blurb-img",src:o||null})),r.a.createElement(pt.a,{className:"map-info-divider"}),r.a.createElement("p",null,r.a.createElement("b",null," Information: "),fe.a.isEmpty(s)?i:s.marker_blurb),r.a.createElement("p",null,r.a.createElement(pt.a,{className:"map-info-divider"}),r.a.createElement("div",null,!fe.a.isEmpty(t.map_stats)&&fe.a.isEmpty(s)?t.map_stats.map(function(e){return r.a.createElement("div",null,r.a.createElement("b",null,e.key)," : ",e.value)}):null))))))}}]),t}(r.a.Component),Jt=Object(c.b)(function(e){return{data:e.data,poiMarkers:e.poiMarkers,mapMarkerTypes:e.mapMarkerTypes,customPath:e.customPath,terrain:e.terrain,startPoint:e.startPoint,endPoint:e.endPoint,focusMarker:e.focusMarker,filters:e.filters,sideBarImage:e.sideBarImage,sideBarBlurb:e.sideBarBlurb,openKeys:e.openKeys}})(qt),Qt=function(e){function t(){var e,a;Object(ie.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(se.a)(this,(e=Object(le.a)(t)).call.apply(e,[this].concat(r)))).state={width:"40%",height:125,showElevation:!0},a.elevationChartStatus=function(e){a.setState({showElevation:e})},a}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"componentDidMount",value:function(){var e,t=window.location.pathname.substring(1);this.props.dispatch((e=t,function(t){t(L()),fetch("http://localhost:8082/api/mapinfo/"+e).then(F).then(function(e){return e.json()}).then(function(e){var a=[];e.Default_filters.forEach(function(e){return a.push(e.type)});var n={id:e.Id,map_name:e.Map_name,map_alias:e.Map_alias,map_type:e.Map_type,map_track:e.Map_track,startpointlat:e.Startpointlat,startpointlng:e.Startpointlng,filters:a,map_blurb:e.Map_blurb,default_image:e.Default_image,map_stats:e.Map_stats,zoom_level:e.Zoom_level,walking:e.Walking,cycling:e.Cycling,horseriding:e.Horseriding};return t(H(n.zoom_level)),t(ae(n.map_blurb,n.default_image)),t(B(n)),n}).catch(function(e){return t(K(e))})})),this.props.dispatch(function(e){return function(t){t(L()),fetch("http://localhost:8082/api/markers/"+e).then(F).then(function(e){return e.json()}).then(function(e){return e.map(function(e){return{marker_id:e.Id,marker_type:e.Marker_type,marker_lat:e.Marker_lat,marker_lng:e.Marker_lng,marker_info:e.Marker_info,marker_title:e.Marker_title,marker_blurb:e.Marker_blurb,default_image:e.Default_image}})}).then(function(e){var a=[];e.forEach(function(e){a.includes(e.marker_type)||a.push(e.marker_type)}),t(W(a)),t(z(e))}).catch(function(e){return t(K(e))})}}(t)),this.props.dispatch(R())}},{key:"render",value:function(){var e=this,t=this.props,a=t.loadingTrack,n=t.loadingMarkers,o=this.state.showElevation;return a||n?r.a.createElement("div",null,"Loading..."):r.a.createElement("div",{className:"map"},r.a.createElement(Pt,null),r.a.createElement(ft,null),r.a.createElement(Jt,null),fe.a.isEmpty(this.props.customPath)||!0!==o?fe.a.isEmpty(this.props.customPath)?null:r.a.createElement(Tt.a,{className:"show-elevation",type:"primary",size:"small",onClick:function(){e.elevationChartStatus(!0)}},r.a.createElement("span",null,"Show Elevation",r.a.createElement(Nt.a,{className:"minimise-chart",type:"up-circle"}))):r.a.createElement(Dt.a,{className:"elevation-chart",size:{width:this.state.width,height:this.state.height},onResize:function(t,a,n,r,o){e.setState(Object(p.a)({width:n.style.width,height:n.style.height},o))}},r.a.createElement(Ot,null),r.a.createElement(Nt.a,{className:"minimise-chart",type:"down-circle",onClick:function(){e.elevationChartStatus(!1)}})))}}]),t}(n.Component),$t=Object(c.b)(function(e){return{data:e.data,loadingTrack:e.loadingTrack,loadingMarkers:e.loadingMarkers,filters:e.filters,poiMarkers:e.poiMarkers,customPath:e.customPath,elevationChartData:e.elevationChartData}})(Qt),Xt=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch(R())}},{key:"render",value:function(){return r.a.createElement("div",{className:"landing-page"},r.a.createElement("div",{className:"map-switcher-block"},r.a.createElement("h1",null," Trail Maps "),r.a.createElement("div",{className:"map-switcher-div"},r.a.createElement(Pt,{placeholder:"Select a Map"}))))}}]),t}(n.Component),Yt=Object(wt.a)()(Xt),ea=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){return r.a.createElement(de.a,null,r.a.createElement(me.a,{exact:!0,path:"/",component:Yt}),r.a.createElement(me.a,{component:$t}))}}]),t}(n.Component),ta=function(e){function t(){return Object(ie.a)(this,t),Object(se.a)(this,Object(le.a)(t).apply(this,arguments))}return Object(pe.a)(t,e),Object(ce.a)(t,[{key:"render",value:function(){return r.a.createElement(ue.a,null,r.a.createElement(ea,null))}}]),t}(n.Component),aa=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function na(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(551),a(553),a(555),a(557),a(559),a(561);var ra=Object(s.c)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return Object(p.a)({},e,{loading:!0,error:null});case d:return Object(p.a)({},e,{loadingTrack:!1,data:t.payload.initMapInfo,center:[t.payload.initMapInfo.startpointlat,t.payload.initMapInfo.startpointlng],filters:t.payload.initMapInfo.filters});case m:return Object(p.a)({},e,{loadingMarkers:!1,poiMarkers:t.payload.markers});case x:return Object(p.a)({},e,{loadingMarkers:!1,allMaps:t.payload.maps});case h:return Object(p.a)({},e,{loading:!1,error:t.payload.error,data:[]});case C:return Object(p.a)({},e,{mapMarkerStart:t.payload});case S:return Object(p.a)({},e,{mapMarkerEnd:t.payload});case f:return Object(p.a)({},e,{customDistance:Object(l.a)(e.customDistance).concat([t.payload])});case g:return Object(p.a)({},e,{mapMarkers:Object(l.a)(e.mapMarkers).concat([t.payload])});case y:return Object(p.a)({},e,{customPath:{path:t.payload.path,distance:t.payload.distance,elevationGain:t.payload.elevationGain,elevationLoss:t.payload.elevationLoss,elevationChartData:t.payload.chartData}});case k:return Object(p.a)({},e,{zoom:t.payload});case E:return Object(p.a)({},e,{center:t.payload});case v:return Object(p.a)({},e,{mapMarkerTypes:t.payload});case b:return Object(p.a)({},e,{filters:t.payload});case _:return Object(p.a)({},e,{terrain:t.payload});case M:return Object(p.a)({},e,{startPoint:t.payload});case O:return Object(p.a)({},e,{endPoint:t.payload});case w:return Object(p.a)({},e,{focusMarker:t.payload});case j:return Object(p.a)({},e,{customDistanceMarker:t.payload});case P:return Object(p.a)({},e,{mapMarkerStart:null,mapMarkerEnd:null,customPath:{},customDistance:[],startPoint:{},endPoint:{}});case D:return Object(p.a)({},e,{mapMarkerStart:null,mapMarkerEnd:null});case N:return Object(p.a)({},e,{allowCustomPath:t.payload});case T:return Object(p.a)({},e,{sideBarImage:t.payload.image,sideBarBlurb:t.payload.blurb});case A:return Object(p.a)({},e,{openKeys:t.payload});case I:return Object(p.a)({},e,{openKeys:Object(l.a)(e.openKeys).concat(["distanceTab"])});default:return e}},Object(s.a)(oe.a));i.a.render(r.a.createElement(c.a,{store:ra},r.a.createElement(ta,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");aa?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):na(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):na(e)})}}()}},[[318,2,1]]]);
//# sourceMappingURL=main.709b9619.chunk.js.map