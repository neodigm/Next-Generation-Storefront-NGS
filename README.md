
[![License: BSD](https://badgen.net/badge/license/BSD/orange)](https://opensource.org/licenses/BSD-3-Clause)

[Next Generation Storefront NGS ✈️ Travel Booking UX](https://neodigm.github.io/Next-Generation-Storefront-NGS/NGS_VUE_UML_Scott_C_Krause_2020.pdf)

---

The Next Generation Storefront™ is a UX & data standard that empowers consumers to make informed flight reservation decisions. NGS presents like options from different airlines taking the guesswork out of the customer journey. It allows travelers to compare apples to apples when shopping online.

This document presents artifacts depicting an NGS implemented design for constructing an accessible, responsive, and progessive single-page booking app.

This design is a startup travel, expense, and itinerary concierge platform that manages flight, car, and hotel reservations for corporate events.

While Vue.js is mentioned explicitly, any modern framework(s) may be implemented (Micro Frontend).

<p align="center">
  <a target="_blank" href="https://neodigm.github.io/Next-Generation-Storefront-NGS/NGS_VUE_UML_Scott_C_Krause_2020.pdf">
  <img src="https://neodigm.github.io/Next-Generation-Storefront-NGS/next_generation_storefront_ux_scott_krause.webp" title="NGS UX Next Gen Storefront">
  </a>
</p>

```javascript
    //  A popover is a transient view that shows on a content screen when a user clicks on a control button or within a defined area.     
    var oPopOver = (function( _w, _d, _q ){  // Popover UX pattern
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
```

#
[Portfolio Blog](https://www.theScottKrause.com) |
[🚀 Résumé](https://thescottkrause.com/Arcanus_Scott_C_Krause_2020.pdf) |
[NPM](https://www.npmjs.com/~neodigm) |
[Github](https://github.com/neodigm) |
[LinkedIn](https://www.linkedin.com/in/neodigm24/) |
[Gists](https://gist.github.com/neodigm?direction=asc&sort=created) |
[Salesforce](https://trailblazer.me/id/skrause) |
[Code Pen](https://codepen.io/neodigm24) |
[Machvive](https://machvive.com/) |
[Arcanus 55](https://www.arcanus55.com/) |
[Repl](https://repl.it/@neodigm) |
[Twitter](https://twitter.com/neodigm24) |
[Keybase](https://keybase.io/neodigm) |
[Docker](https://hub.docker.com/u/neodigm) |
[W3C](https://www.w3.org/users/123844)
#
---
<p align="center">
  <a target="_blank" href="https://thescottkrause.com/d3_datavis_skills.html">
  <img src="https://repository-images.githubusercontent.com/178555357/2b6ad880-7aa0-11ea-8dde-63e70187e3e9" title="D3js Skills with Audio">
  </a>
</p>
