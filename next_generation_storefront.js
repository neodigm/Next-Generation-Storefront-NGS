    const _d = document;
    const isMobile = function(){ return (document.body.clientWidth <= 768) ? true : false; };

    const oPopOver = (function( _w, _d, _q ){  // Popover UX pattern
        let arPops = [], ePos, iOffTop=0, iOffLft=0;
        return {
            "init": function(){ // wire DOM events
                arPops= [].slice.call(_d.querySelectorAll(_q));
                _w.addEventListener("resize", oPopOver.closeAll);
                _w.addEventListener("scroll", oPopOver.closeAll); 
                _d.body.addEventListener("click", function( e ){  //  Outside Click close
                    var eTarget = e.target, bInside = false;
                    while( eTarget.tagName !== "HTML" ){
                        if( eTarget.dataset.popover ){ bInside = true; break; }
                        eTarget = eTarget.parentNode;
                    }
                    if( !bInside ){
                        oPopOver.closeAll();
                    }
                }, true);
            },
            "open": function(id, evPos){
                if( arPops.length == 0) return false;
                oPopOver.closeAll();
                ePos = evPos.currentTarget;
                var elPop = arPops.filter(function(el){
                    return ( el.id == id );
                })[0];
                iOffTop = Number(elPop.dataset.popoverPos.split("|")[0]);
                iOffLft = Number(elPop.dataset.popoverPos.split("|")[1]);
                elPop.dataset.popover = "true";
                elPop.style.left = oPopOver.position().left+"px";
                elPop.style.top = oPopOver.position().top+"px";
            },
            "closeAll": function(){
                if( arPops.length == 0) return false;
                arPops.filter(function(el){
                    el.dataset.popover = "false";
                });
            },
            "position": function(){
                var rec = ePos.getBoundingClientRect(),
                pxLft = _w.pageXOffset || _d.documentElement.scrollLeft,
                pxTop = _w.pageYOffset || _d.documentElement.scrollTop;
                return { top: (rec.top + pxTop + iOffTop), left: (rec.left + pxLft + iOffLft) }
            }
        }
    })(window, _d, "[data-popover]");

    setTimeout(function(){wireEvents();}, 4800);
    setInterval(function(){loadVue();}, 1600);
    setInterval(function(){loadVueComp();}, 300);
    
    var fAsyncGet = function( sID, fCB ){ // Given an index and a callback
            var oX = new XMLHttpRequest();
            var sURI = sID + ".vue";
            oX.onreadystatechange = function(){ if (oX.readyState==4 && oX.status==200) fCB(sID, oX.responseText); };
            oX.open("GET", sURI, true); // true asynchronous 
            oX.send( null );
    };
    function loadVue(){
        [].slice.call(_d.querySelectorAll("TEMPLATE"))
            .filter(function(el){
                fAsyncGet(el.id, function(sID, resp){
                    _d.getElementById(sID).outerHTML = unTemplate(resp);
                    console.log( "loaded ... " + el.id );
            });
        });
    }

    let nVueCnt = 0;
    function loadVueComp(){
        let oConf = [
                ["tt-flight-list", "FlightList"],
                ["tt-flight-card", "FlightCard"],
                ["tt-return-flight-card", "ReturnFlightCard"],
                ["tt-flight-offer", "FlightOffer"],
                ["tt-flight-summary", "FlightSummary"],
                ["tt-flight-cabinet", "FlightCabinet"],
                ["tt-flight-shelf", "FlightShelf"],
                ["tt-flight-shelf-list", "FlightShelfList"],
                ["tt-flight-media", "FlightMedia"],
                ["tt-flight-drawer", "FlightDrawer"],
                ["tt-return-flight-drawer", "ReturnFlightDrawer"],
                ["tt-flight-details", "FlightDetails"],
                ["tt-flight-detail-leg", "FlightDetailLeg"],
                ["tt-flight-fare-categories", "FlightFareCategories"],
                ["tt-departure-flight", "DepartureFlight"]
            ];
        [].slice.call(document.querySelectorAll( oConf.map(function(ar){ return ar[0]; }).join() ))
        .filter(function(el){
            let seID = "vue-" + nVueCnt++;
            let compName = oConf.filter(function(ar){
                return ( el.nodeName.toLowerCase() == ar[0] );
            })[0][1];
            if( el.id === ""){
                el.setAttribute("id", seID);
                fAsyncGet("/NGS/components/flights/" + compName, function(sID, resp){
                    el.innerHTML = unTemplate(resp);
                    console.log( "loaded comp ... " + el.nodeName );
                });
            }
        });
    }

    function unTemplate(resp){
        resp = resp.replace("<template>","");
        resp = resp.substring(0, resp.length - 11);
        return resp;
    }
    
    loadVue();
    loadVueComp();

function wireEvents(){
    // Vue.js psuedo events | Meaning this would be done in Vue - Begin
    [].slice.call( _d.querySelectorAll("tt-flight-shelf") )
        .filter( (el) => {
            el.addEventListener("click", (ev) => {
                let elFC = ev.currentTarget.closest("tt-flight-card>section");
                if( elFC ){  //  data-card-shelf-list-is-visible
                    let sSiS = el.dataset.shelfIsSelected;
                    if( sSiS == "true" ){  //  data-shelf-is-selected
                        el.dataset.shelfIsSelected = elFC.dataset.cardShelfListIsVisible = "false";
                    }else{
                        [].slice.call( elFC.querySelectorAll("tt-flight-shelf") )
                            .filter( (elShelf) => {  //  Unselect all other
                                elShelf.dataset.shelfIsSelected = "false";
                            });  //  Green Selected Indicator
                        el.dataset.shelfIsSelected = elFC.dataset.cardShelfListIsVisible = "true";
                    }
                    elFC.dataset.cardDetailIsVisible = "false";  //  mutex
                }
                ev.preventDefault(); ev.stopPropagation();
            });
        });
    [].slice.call( _d.querySelectorAll(".js-cardDetailIsVisible") )
        .filter( (el) => {
            el.addEventListener("click", (ev) => {
                let elFC = ev.currentTarget.closest("[data-card-detail-is-visible]");
                if( elFC ){  //  data-card-detail-is-visible
                    let sSLV = elFC.dataset.cardDetailIsVisible;
                    elFC.dataset.cardDetailIsVisible = (sSLV === "true") ? "false" : "true";
                    elFC.dataset.cardShelfListIsVisible = "false";  //  mutex
                }
                ev.preventDefault(); ev.stopPropagation();
            });
        });
    [].slice.call( _d.querySelectorAll("tt-return-flight-card .js-cardDetailIsVisible") )
        .filter( (el) => {
            el.addEventListener("click", (ev) => {
                let elFC = ev.currentTarget.closest("[data-return-detail-is-visible]");
                if( elFC ){  //  data-return-detail-is-visible
                    let sSLV = elFC.dataset.returnDetailsIsVisible;
                    elFC.dataset.returnDetailsIsVisible = (sSLV === "true") ? "false" : "true";
                }
                ev.preventDefault(); ev.stopPropagation();
            });
        });
    [].slice.call( _d.querySelectorAll("tt-flight-card") )
        .filter( (el) => {
            el.addEventListener("click", (ev) => {
                if( isMobile() ){
                    let sSLV = el.dataset.cardDetailIsVisible;
                    el.dataset.cardDetailIsVisible = (sSLV === "true") ? "false" : "true";
                    el.dataset.cardShelfListIsVisible = "true";  //  mutex
                }
                ev.preventDefault(); ev.stopPropagation();
            });
        });
    [].slice.call( _d.querySelectorAll("tt-flight-card") )
        .filter( (el) => {
            el.addEventListener("click", (ev) => {
                if( isMobile() ){
                    let sSLV = el.dataset.cardDetailIsVisible;
                    el.dataset.cardDetailIsVisible = (sSLV === "true") ? "false" : "true";
                    el.dataset.cardShelfListIsVisible = "true";  //  mutex
                }
                ev.preventDefault(); ev.stopPropagation();
            });
        });
    [].slice.call( _d.querySelectorAll("tt-return-flight-card") )
        .filter( (el) => {
            el.addEventListener("click", (ev) => {
                if( isMobile() ){
                    let sSLV = el.dataset.returnDetailsIsVisible;
                    el.dataset.returnDetailsIsVisible = (sSLV === "true") ? "false" : "true";
                    el.dataset.cardShelfListIsVisible = "true";  //  mutex
                }
                ev.preventDefault(); ev.stopPropagation();
            });
        });
    // Vue.js psuedo events | Meaning this would be done in Vue - End

    // url search param config begin
    var urlParams = new URLSearchParams(window.location.search);
    for (let parmData of urlParams) {
        if( parmData[0].indexOf("data-" != -1) ){
            [].slice.call(_d.querySelectorAll( "[" + parmData[0] + "]" ))
                .filter( (el) => {
                    el.dataset[ data2prop( parmData[0] ) ] = parmData[1];
                });
        }
    }
    function data2prop( sDset ){  //  Convert HTML data attrib name to JS dataset name
        sDset = sDset.replace("data-", "").toLowerCase();
        let aDset = sDset.split(""), aDret = [], bUpper = false;
        aDset.forEach( (sVal, nIx) => {
            if( sVal == "-" ){
                bUpper = true;
            }else{
                aDret.push( ( bUpper ) ? sVal.toUpperCase() : sVal );
                bUpper = false;
            }
        });
        return aDret.join("");
    }
    // url search param config end

    // random faux data seed begin
    [].slice.call(_d.querySelectorAll("IMG.ttobject-contain"))  //  seat images
        .filter( (e) => {
            e.src = e.src.replace("firstclass", "firstclass" + (Math.floor(Math.random() * 4) + 1 ));
        });

        [].slice.call(_d.querySelectorAll("tt-flight-cabinet"))  //  fare names
        .filter( (elCab) => {
            let aFares = ["Basic", "Standard", "Enhanced","Premium", "Luxury", "Luxury+"], nCnt = 0;
            [].slice.call(elCab.querySelectorAll(".leg_fare__label"))
                .filter( (elLabel) => {
                    elLabel.innerHTML = aFares[ nCnt++ ];
                });
        });
        [].slice.call(_d.querySelectorAll("tt-flight-cabinet"))  //  price
        .filter( (elCab) => {
            let nCnt = 0;
            [].slice.call(elCab.querySelectorAll(".leg_fare__price"))
                .filter( (elLabel) => {
                    let nPrice = (Math.floor(Math.random() * (nCnt++ * 800)) + 100 );
                    elLabel.innerHTML = "$" + nPrice;
                    elLabel.nextElementSibling.innerHTML = "$" + Math.round(( nPrice + (nPrice / 3)));
                });
        });
    // random faux data seed end

var oSimpleExpand = (function( doc ){ // Simple expand / collapse
    var aSum, aDet; // Summary and Details paired elements 1:1
    return {
        "rebind": function(){
            aSum = [].slice.call( doc.querySelectorAll("[data-expand-summary]") );
            aDet = [].slice.call( doc.querySelectorAll("[data-expand-details]") );
            aSum.forEach( function( aE ){
                var aDecl = aE.dataset.expandSummary.split("|");
                if(  aDecl.length > 0 ){
                    aE.aDecl = aDecl;
                    aE.eDet = aDet.filter( function( eDet ){ // match
                        if( eDet.dataset.expandDetails == aDecl[0] ){ return true; }
                    });
                    aE.addEventListener( "click", oSimpleExpand.click );                    
                }
            });
        },
        "click": function( ev ){ // hide or show
            var aDet = this.eDet;
            var aDecl = this.aDecl;
            var that = this;
            if( aDet[0].dataset.expandMutex ){
                [].slice.call( doc.querySelectorAll("[data-expand-mutex='" + aDet[0].dataset.expandMutex + "']") )
                .filter(function(_elDet){
                    _elDet.classList.add("tthidden");
                });
            }
            aDet.filter(function(eDet){
                if( eDet.classList.contains("tthidden") ){
                    //if( playAudioFile ) playAudioFile(22);
                    eDet.classList.remove("tthidden");
                    if( aDecl[1] ) that.classList.add( aDecl[1] );
                    if( aDecl[2] ) { // swap temp
                        aDecl[3] = that.innerHTML;
                        that.innerHTML = aDecl[2];
                    }
                }else{
                    //if( playAudioFile ) playAudioFile(22);
                    eDet.classList.add("tthidden");
                    if( aDecl[1] ) that.classList.remove( aDecl[1] );
                    if( aDecl[3] ) that.innerHTML = aDecl[3]; // undo
                }               
            });
            ev.preventDefault();
        }
    }
})( _d );
oSimpleExpand.rebind();


        // Popover begin
        oPopOver.init();
        [].slice.call( _d.querySelectorAll(".js-filt__stops") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                if(ev.currentTarget.dataset.filtChip=="false") oPopOver.open("stop_content", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-filt__airlines") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                if(ev.currentTarget.dataset.filtChip=="false") oPopOver.open("airline_content", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-filt__price") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                if(ev.currentTarget.dataset.filtChip=="false") oPopOver.open("price_content", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-filt__time") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                if(ev.currentTarget.dataset.filtChip=="false") oPopOver.open("time_content", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-filt__sort") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                oPopOver.open("sort_content", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-filt__sort--mobile") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                oPopOver.open("sort_content--mobile", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-filt__policy") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                oPopOver.open("policy_content", ev);
            })
        });
        [].slice.call( _d.querySelectorAll(".js-select-flight") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                var crdContain = _d.querySelector("[data-flight-direction]");
                var curState = crdContain.dataset.flightDirection;
                crdContain.dataset.flightDirection = (curState == "depart") ? "return": "depart";
                window.scrollTo(0, 0);
                snck.q("Flight 1343 added|to Trip Cart");
                //if( playAudioFile ) playAudioFile(22);
                ev.preventDefault();
            })
        });
        [].slice.call( _d.querySelectorAll(".js-close-all") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                //if( playAudioFile ) playAudioFile(22);
                oPopOver.closeAll();
                ev.preventDefault();
            })
        });
        [].slice.call( _d.querySelectorAll(".filt-btn__apply") )
        .filter(function( elCmd ){
            elCmd.addEventListener("click", function(ev){
                if( ev.currentTarget.dataset.filtCmd  ){
                    var elCmd = _d.querySelector( ev.currentTarget.dataset.filtCmd );
                    if(elCmd) elCmd.dataset.filtChip = "true";
                    if( snck ) snck.q(Math.floor(Math.random() * 60) + 48 + " filtered flights");
                    if( playAudioFile ) playAudioFile(22);
                }else{
                    //if( playAudioFile ) playAudioFile(22);
                    if( window.sortMsg && snck ) snck.q( window.sortMsg );
                    window.sortMsg = "";
                }
                setTimeout(function(){  oPopOver.closeAll(); }, 480);
                ev.preventDefault();
            })
        });
        // Popover End

        var oScrim = (function(_d, sQry){  //  Open or Close Scrim
            var elScrim = _d.querySelector(sQry);
            return {
                "open": function(){
                    elScrim.dataset.snackbarScrimState = "true";
                    oPopOver.closeAll();
                    ////if( playAudioFile ) playAudioFile(22);
                },
                "close": function(){
                    elScrim.dataset.snackbarScrimState = "false";
                    //if( playAudioFile ) playAudioFile(22);
                }
            };
        })(_d, ".js-scrim");

        var oNote = (function(_d, sQry){  //  Open or Close Note
            var elScrim = _d.querySelector(sQry);
            return {
                "open": function(){elScrim.dataset.slideLeftState = "true";
                //if( playAudioFile ) playAudioFile(22);
            },
                "close": function(){elScrim.dataset.slideLeftState = "false";}};
        })(_d, ".js-note");

        var oShop = (function(_d, sQry){  //  Open or Close Cart
            var elScrim = _d.querySelector(sQry);
            return {
                "open": function(){elScrim.dataset.slideRightState = "true";
            },
                "close": function(){elScrim.dataset.slideRightState = "false";}};
        })(_d, ".js-shop");

        // Wire events
        _d.querySelector(".js-note__tap").addEventListener("click", function(ev){
            oScrim.open(); oNote.open();
        });
        
        [].slice.call( _d.querySelectorAll(".js-sort-select div") )
            .filter(function( elSel ){
                elSel.addEventListener("click", function(ev){
                    [].slice.call( _d.querySelectorAll(".js-sort-select div") )
                        .filter(function( elUnSel ){
                            elUnSel.dataset.filterSelected = "false";
                    });
                elSel.dataset.filterSelected = "true";
                //if( playAudioFile ) playAudioFile(22);
                if( snck ) snck.q("Sorting by|" + elSel.innerHTML);
                setTimeout(function(){  oPopOver.closeAll(); }, 480);
            });
        });
        [].slice.call( _d.querySelectorAll(".js-stops-select div") )
            .filter(function( elSel ){
                elSel.addEventListener("click", function(ev){
                    [].slice.call( _d.querySelectorAll(".js-stops-select div") )
                        .filter(function( elUnSel ){
                            elUnSel.dataset.filterSelected = "false";
                    });
                elSel.dataset.filterSelected = "true";
                setTimeout(function(){  oPopOver.closeAll(); }, 480);
            });
        });
        [].slice.call( _d.querySelectorAll(".js-airlines-select div") )
            .filter(function( elSel ){
                elSel.addEventListener("click", function(ev){
                if(elSel.dataset.filterSelected == "true"){
                    elSel.dataset.filterSelected = "false";
                }else{
                    elSel.dataset.filterSelected = "true";
                }
            });
        });
        [].slice.call( _d.querySelectorAll(".js-shop__tap") )
            .filter(function( elCmd ){
                elCmd.addEventListener("click", function(ev){
                oScrim.open(); oShop.open();
            });
        });
        [].slice.call( _d.querySelectorAll(".js-note--close, .js-shop--close") )
        .filter(function( elClose ){
            elClose.addEventListener("click", function(ev){
                oScrim.close(); oNote.close(); oShop.close();});
        });
 
        [].slice.call( _d.querySelectorAll("[data-filt-chip]") )
        .filter(function( elBtn ){
            elBtn.addEventListener("click", function(ev){
                if(elBtn.dataset.filtChip == "true"){
                    elBtn.dataset.filtChip = "false";
                    //if( playAudioFile ) playAudioFile(22);
                }
                ev.preventDefault();
            });
        });
    } //  wire events end

/*  Snackbar begin */
var snck=(function(_d,eID){var _nTimeout=5400,_aQ=[];
var _eSb=_d.getElementById(eID),_eSbText=_eSb.querySelectorAll("P")[0];
var _fClose=function(){_aQ.shift();
_eSb.classList.remove("snackbar__cont--show");
_eSb.classList.add("snackbar__cont--hide");
if(_aQ.length!=0){setTimeout(_fOpen,1200);
}};
var _fOpen=function(){_eSbText.innerHTML=_aQ[0].replace("|","<br>");
_eSb.style.left=((_d.body.clientWidth/2)-(_eSb.clientWidth/2))+"px";
_eSb.classList.remove("snackbar__cont--hide");
_eSb.classList.add("snackbar__cont--show");
if ("vibrate" in navigator) { 
window.navigator.vibrate([16,8]);
}
setTimeout(_fClose,_nTimeout);
};
return{q:function(sMsg){if(sMsg != _aQ[0]) _aQ.push(sMsg);
if(_aQ.length==1){_fOpen();
}}}})(document,"js-snackbar__id");
/*  Snackbar End */
