[Next Generation Storefront NGS ✈️ Travel Booking UX](https://neodigm.github.io/Next-Generation-Storefront-NGS/NGS_VUE_UML_Scott_C_Krause_2020.pdf)

The Next Generation Storefront™ is a [UX](https://www.thescottkrause.com/categories/ux/) & data standard that empowers consumers to make informed flight reservation [decisions](https://replit.com/@neodigm/Proximity-Logic). NGS presents like options from different airlines taking the guesswork out of the customer journey. It allows travelers to compare apples to apples when shopping online.

This document presents artifacts depicting an NGS implemented design for constructing an accessible, responsive, and progessive single-page booking app.

This design is a startup travel, expense, and itinerary concierge platform that manages flight, car, and hotel reservations for corporate events.

While [Vue.js](https://github.com/neodigm/Next-Generation-Storefront-NGS/tree/gh-pages/vue) is mentioned explicitly, any modern framework(s) may be implemented (Micro Frontend).

<p align="center">
<img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvn.svg" width="88" alt="Next Generation Storefront 🌑🌒🌓🌔🌕🌖🌗🌘🌑">
<img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvg.svg" width="88" alt="DataVis 🚀 Micro Frontend 🚀 PWA">
<img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvs.svg" width="88" alt="Three.js 🚀 TypeScript 🚀 WASM ✨ Go">
</p>

<p align="center">
  <a target="_blank" href="https://neodigm.github.io/Next-Generation-Storefront-NGS/NGS_VUE_UML_Scott_C_Krause_2020.pdf">
  <img src="https://neodigm.github.io/Next-Generation-Storefront-NGS/next_generation_storefront_ux_scott_krause.webp" title="NGS UX Next Gen Storefront">
  </a>
</p>

```javascript
//  A popover is a transient view that shows on a content screen when
//  a user clicks on a control button or within a defined area.
/*   __  __     __           __  __     __  __    
    /\ \/\ \   /\ \         /\ \/\ \   /\_\_\_\   
    \ \ \_\ \  \ \ \        \ \ \_\ \  \/_/\_\/_  
     \ \_____\  \ \_\        \ \_____\   /\_\/\_\ 
      \/_____/   \/_/         \/_____/   \/_/\/_/
🌑🌒🌓🌔🌕🌖🌗🌘🌑*/
let oPopOver = ( ( _win, _doc, _qry ) => {
        let arPops = [], ePos, iOffTop=0, iOffLft=0;
        return {  // Popover UX pattern
            "init": function(){ // wire DOM events
                arPops= [].slice.call(_doc.querySelectorAll( _qry ));
                _win.addEventListener("resize", oPopOver.closeAll);
                _win.addEventListener("scroll", oPopOver.closeAll); 
                _doc.body.addEventListener("click", function( e ){ // Outside Click
                    let eTarget = e.target, bInside = false;
                    while( eTarget.tagName !== "HTML" ){
                        if( eTarget.dataset.popover ){ bInside = true; break; }
                        eTarget = eTarget.parentNode;
                    }
                    if( !bInside ){ // Tapped Outside of Popover
                        oPopOver.closeAll();
                    }
                }, true);
            },
            "open": function(id, evPos){ // Open a single Popover
                if( arPops.length == 0) return false;
                oPopOver.closeAll();
                ePos = evPos.currentTarget;
                let elPop = arPops.filter(function(el){
                    return ( el.id == id );
                })[0];
                iOffTop = Number(elPop.dataset.popoverPos.split("|")[0]);
                iOffLft = Number(elPop.dataset.popoverPos.split("|")[1]);
                elPop.dataset.popover = "true"; // Open and Active
                elPop.style.left = oPopOver.position().left+"px";
                elPop.style.top = oPopOver.position().top+"px";
            },
            "closeAll": function(){ // Close all Popovers
                if( arPops.length == 0) return false;
                arPops.map(function(el){
                    el.dataset.popover = "false";
                });
            },
            "position": function(){ // Determine Popover position
                let rec = ePos.getBoundingClientRect(),
                pxLft = _win.pageXOffset || _doc.documentElement.scrollLeft,
                pxTop = _win.pageYOffset || _doc.documentElement.scrollTop;
                return { top: (rec.top + pxTop + iOffTop), left: (rec.left + pxLft + iOffLft) }
            }
        }
})(window, _doc, "[data-popover]"); // Declarative implementation
//  DataVis 🚀 Micro Frontend 🚀 PWA
```

<p align="center">
  <a target="_blank" href="https://neodigm.github.io/Next-Generation-Storefront-NGS/NGS_VUE_UML_Scott_C_Krause_2020.pdf">
  <img src="https://neodigm.github.io/Next-Generation-Storefront-NGS/airline_seat_1.jpg" title="NGS UX Next Gen Storefront">
  </a>
</p>

#
[Portfolio Blog](https://www.theScottKrause.com) |
[🚀 Résumé](https://www.thescottkrause.com/Arcanus_Scott_C_Krause_2022.pdf) |
[NPM](https://www.npmjs.com/~neodigm) |
[Github](https://github.com/neodigm) |
[LinkedIn](https://www.linkedin.com/in/neodigm55/) |
[Gists](https://gist.github.com/neodigm?direction=asc&sort=created) |
[Salesforce](https://trailblazer.me/id/skrause) |
[Code Pen](https://codepen.io/neodigm24) |
[Machvive](https://machvive.com/) |
[Arcanus 55](https://www.arcanus55.com/) |
[Repl](https://repl.it/@neodigm) |
[Twitter](https://twitter.com/neodigm24) |
[Keybase](https://keybase.io/neodigm) |
[Docker](https://hub.docker.com/u/neodigm) |
[W3C](https://www.w3.org/users/123844) |
[InfoSec](https://arcanus55.medium.com/offline-vs-cloud-password-managers-51b1fbebe301)
#
 
<p align="center">
  <a target="_blank" href="https://thescottkrause.com/d3_datavis_skills.html">
  <img src="https://repository-images.githubusercontent.com/178555357/2b6ad880-7aa0-11ea-8dde-63e70187e3e9" title="D3js Skills with Audio">
  </a>
</p>

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/neodigm/vue_voyagers)
<p align="center">
  <a target="_blank" href="https://www.thescottkrause.com">
    <img src="https://neodigm.github.io/pan-fried-monkey-fisticuffs/thescottkrause_contact_card.png" title="DataVis 👁️ UX 🍭 PWA 👁️ ThreeJS">
  </a>
</p>
