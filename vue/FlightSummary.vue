<template>
	<div class="flightcard_infogrid xs:ttpx-2 lg:ttpl-6">
            <div class="griditem_leg__airline">
                <img src="https://res.cloudinary.com/options-travel/image/upload/v1536877754/AA.jpg" class="ttinline" alt="" width="15">
                <span class="leg_airline__name">American Airlines</span>
                <!-- Hidden on desktop -->
                <span class="leg_layover__duration-l">
                    <div class="leg_layover__duration-o xs:tttext-xs xs:ttml-1 ttmt-1 ttalign-middle ttml-3">• 3hr 59m</div>
                        <svg class="js-red-eye red-eye__vect tttext-red-600 ttfill-current ttcursor-pointer" width="18" height="18" viewBox="0 -2 32 32"><path d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z"/></svg>
                </span>
            </div>
            <div class="griditem_leg__times ttpt-0 xs:tthidden md:ttblock">
                <div class="griditem_leg__times-l">
                    <span class="leg_departure__time">7:04<ampm>AM</ampm></span>
<!--                    <span class="ttmx-1">-</span>-->
                    <span class="leg_arrival__time">12:03<ampm>PM</ampm>
                    <span class="leg_isRedeye ttabsolute" style="font-size: 8px;">&nbsp;</span>
                    </span>
                </div>
            </div>
			<!--Mobile Item-->
            <div class="griditem_departinfo_small ttp-1 xs:ttml-1 md:tthidden">
                <div class="ttflex ttflex-col">
                    <span class="leg_departure__time">07:04<ampm>AM</ampm></span>
                    <span class="leg_departure__airport" style="">ORD</span>
                </div>
            </div>
			<!--/Mobile Item-->
            <div class="griditem_leg__duration xs:tthidden md:ttblock ttml-8">
                <div class="griditem_leg__duration-l">
                    <span class="leg_duration ttblock">3h 59m</span>
                    <div class=""><span class="leg_departure__airport">ORD</span><span class="leg_arrival__airport">CLT</span></div>
                </div>
            </div>
            <!--Mobile Item-->
            <div class="griditem_arrivalinfo_small md:tthidden">
                <div class="ttflex ttflex-col">
                    <span class="leg_arrival__time">12:03<ampm>PM</ampm></span>
                    <span class="leg_arrival__airport">CLT</span>
                </div>
            </div>
            <!--/Mobile Item-->
            <div class="griditem_leg__layover-info lg:ttml-8 md:ttself-center">
                <div class="griditem_leg__numstops-l xs:tthidden md:ttblock">
                    <span class="leg_numstops ttblock">1 Stop
                        <svg class="js-red-eye red-eye__vect tttext-red-600 ttfill-current ttcursor-pointer" width="18" height="18" viewBox="0 -2 32 32"><path d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z"/></svg></span>
                    <div class="">
                        <span class="leg_layover__duration ttfs-9">1h 1m</span>
                        <span class="leg_layover__airport ttfs-9">CLE</span>
                    </div>
                </div>
                <!--Mobile Item-->
                <div class="griditem_leg__numstops-small-l md:tthidden">
                    <div class="leg_layover__info ttmx-1 ttp-1 ttself-center" style="">
                        <div class="ttpt-2" style="">
                            <div class="ttblock">
                                <div class="ttself-center">
                                    <div class="line">
                                    </div>
                                </div>
                                <div class="tttext-center" style="margin-bottom:-10px;font-size: 11px">1 Stop</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/Mobile Item-->
            </div>
            <div class="griditem_details-link ttmt-1 xs:tthidden md:ttblock">
                <div class="ttflex ttitems-center" style="">
                    <svg class="ttalign-baseline ttfill-current ttinline ttmb-1 ttmr-1 tttext-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 111.41 1.41l-4.59 4.59a.996.996 0 01-1.41 0L6.7 10.7a.996.996 0 010-1.41c.39-.38 1.03-.39 1.42 0z"></path>
                    </svg>
                    <a class="js-cardDetailsIsVisible violet" href="">Details</a>
                    <span class="ttmx-1 seperator-dash">-</span>
                    <span class="leg_operatedby"> Operated by Envoy Air As American Eagle</span>
                </div>
            </div>
            <!-- Mobile - From$$ and Policy Status -->
            <div class="m-leg_fare md:tthidden" style="">
                <div class="leg_price__info ttself-center" style="">
                    <div class="ttflex ttflex-col ttp-1">
                        <div class="tttext-right tttext-xs"><small>From</small></div>
                        <div class="tttext-right">
                            <h4 class="ttmb-0 xs:tttext-lg sm:tttext-2xl">$244</h4>
                        </div>
                        <div class="tttext-right tttext-orange-400 tttext-xs"><span class="tttext-xs ttwhitespace-no-wrap">Out of policy</span></div>
                    </div>
                </div>
            </div>
            <!-- // -->
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

</style>