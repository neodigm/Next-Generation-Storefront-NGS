<template>
  
            <div class="griditem_leg__fare tt-rate-select" data-ngs-outofpolicy="true">
			<!-- fare policy icon and hoverover -->
                <div class="ttrelative wrapper-tooltip_policy">
                    <div class="ttabsolute tttop-0 ttright-0 ttmr-1 ttmt-1 tooltip_policy">
                        <div class="ttrelative tth-1">
                            <ul class="ttabsolute ttz-0 tttop-0 ttmt-3 ttp-1 ttrounded ttbg-white ttz-10 tthidden tooltip-hover:ttblock ttw-32" style="right: -64px;">
                                <svg class="ttblock ttfill-current tttext-white ttw-4 tth-4 ttabsolute ttml-12 tt-mt-3 ttz-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                </svg>
                                <li class="ttp-1 ttrounded tttext-sm md:tttext-base tttext-gray-600 tttext-left">
                                    <div class="ttpy-1 tttext-center ttleading-none">
                                        <h5 class="tttext-xs tttextgray-900">Out of Policy</h5>
                                        <span class="" style="font-size:8px">We will send for approval</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <svg class="ttw-2 ttbg-white tttext-orange-400 ttrounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" /></svg>
                    </div>
                </div>
                <!-- //fare policy icon and hoverover -->
                <div class="griditem_leg__fare-l ttborder-gray-200">
                    <p class="leg_fare__label">{{FareName}}</p>
                    <h4 class="leg_fare__price" style="">{{rate}}</h4>
                    <p class="leg_fare__beforediscount tt-m-1"><del>{{dis-rate}}</del></p>
                    <p class="leg_fare__seatavail">2 seats left</p>
					<p class="leg_fare__options">+1 Option</p>
                    <p class="" style="transform: rotate(0);">
                        <a class="stretched-link collapsed" data-toggle="collapse" href="#collapseBasic" role="button" aria-expanded="false" aria-controls="collapseBasic"></a>
						</p>
					<!--<div class="if-unavailable tttext-center ttmy-5">-</div>-->
                </div>
            </div>       
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        }
    }
</script>

<style scoped>
.l-fare-selected {
    border-bottom: 2px solid #68d391;
}
.tt-rate-select:not([data-ngs-outofpolicy=""]):hover {
    background-color: #E8E0EA;
    cursor: pointer;
    box-shadow: 2px 2px 5px #f2f2f2;
    transition: all 200ms ease-out;
}


</style>