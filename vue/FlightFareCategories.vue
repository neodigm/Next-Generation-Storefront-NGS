<template>
    <article class="l-FlightFareCategories flightcard_grid-header xs:tthidden md:ttgrid" style="box-shadow: 0px 0px 5px #0000001A;">
        <div class="griditem_header-left ttp-2 xs:tthidden md:ttgrid" >
            <div class="">
                <div class="ttp-2">
                    Fare Categories
                </div>
            </div>
        </div>
        <div class="griditem_header-right xs:tthidden md:ttgrid" >
            <aside class="ttborder-l ttborder-gray-200 ttpy-1" >
                <div class="ttbg-no-repeat ttbg-center tth-12 tt-self-center" style="background-image: url(images/fareClassIcons/SVG/1star.svg)"></div>
                <div class="tttext-center ttfs-10">
                    Basic
                </div>
            </aside>
            <aside class="ttborder-l ttborder-gray-200 tooltip ttpy-1" >
                <div class="ttmx-auto">
                    <div class="ttbg-no-repeat ttbg-center tth-12 ttself-center" style="background-image: url(images/fareClassIcons/SVG/2star.svg);"></div>
                    <div class="tttext-center ttfs-10">Standard
                        <div class="ttrelative tth-1">
                            <ul class="ttabsolute ttleft-0 tttop-0 ttmt-3 ttp-2 ttrounded-lg ttbg-white ttz-10 tthidden tooltip-hover:ttblock ttw-64">
                                <li class="ttp-2 ttrounded-full tttext-sm md:tttext-base tttext-gray-600 tttext-left">
                                    <div class="ttpy-1 tttext-left">
                                        <h5>Standard</h5><span class="tttext-sm tttext-left">Fares that include greater than standard legroom (34 inches or above). These are generally related to economy or premium economy type fares.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <aside class="ttborder-l ttborder-gray-200 ttpy-1" >
                <div class="ttbg-no-repeat ttbg-center tth-12 tself-center" style="background-image: url(images/fareClassIcons/SVG/3star.svg);">
                </div>
                <div class="tttext-center ttfs-10">Enhanced</div>
            </aside>
            <aside class="ttborder-l ttborder-gray-200 ttpy-1" >
                <div class="ttbg-no-repeat ttbg-center tth-12 ttself-center" style="background-image: url(images/fareClassIcons/SVG/4star.svg);"></div>
                <div class="tttext-center ttfs-10">Premium</div>
            </aside>
            <aside class="ttborder-l ttborder-gray-200 ttpy-1" style="min-width:50px">
                <div class="ttbg-no-repeat ttbg-center tth-12 ttself-center" style="background-image: url(images/fareClassIcons/SVG/5star.svg);"></div>
                <div class="tttext-center ttfs-10">Luxury</div>
            </aside>
            <aside class="ttborder-l ttborder-gray-200 ttpy-1" style="min-width: 49px">
                <div class="ttbg-no-repeat ttbg-center tth-12 ttself-center" style="background-image: url(images/fareClassIcons/SVG/6star.svg);"></div>
                <div class="tttext-center ttfs-10">Luxury+</div>
            </aside>
        </div>
    </article>
</template>

<script>
    export default {
        components: { 
        },
        props: {
            cardShelfListIsVisible: { type: String, required: false },
            cardDetailsIsVisible: { type: String, required: false },
        }
    }
</script>

<style scoped>

.l-flight-cabinet,
tt-flight-shelf {
    display: block;
}
[data-cabinet-fare-basic="hide"] .l-FlightFareCategories aside:nth-of-type(1) {
    display: none;
}
[data-cabinet-fare-basic="allow"] .l-FlightFareCategories aside:nth-of-type(1),
[data-cabinet-fare-basic="needs_approval"] .l-FlightFareCategories aside:nth-of-type(1) {
    cursor: pointer;
}
[data-cabinet-fare-basic="restricted"] .l-FlightFareCategories aside:nth-of-type(1) {
    opacity: 0.6;
    filter:grayscale(88%);
}
[data-cabinet-is-domestic="true"] .l-FlightFareCategories aside:nth-of-type(6) {
    display: none;
}

@media only screen
    and (min-width: 375px)
    and (max-width: 767px){  /* small *//* mobile 44.875em */

}
@media only screen 
    and (min-width: 768px)
    and (max-width: 1064px){  /* medium *//* tablet 47.938em */

}
@media only screen 
    and (min-width: 1065px){  /* large *//* laptop 66.563em */
        @supports (display: grid) {

        }
}
@media (prefers-color-scheme: light) { 
}
@media (prefers-color-scheme: dark) {
}   
/* --------------------------- 
      IE 11 Overrides
--------------------------- */
@media (min-width:600px) and (max-width:768px) and (-ms-high-contrast: active), 
(min-width:600px) and (max-width:768px) and (-ms-high-contrast: none) {
  
}
</style>