<template>
<article class="flightcard_fare__details">
            <div class="xs:tthidden md:ttblock xs:ttw-screen md:ttw-full" style="">
                <div class="ttborder-t ttpx-4">
                    <div class="ttflex ttmb-4 ttpy-4">
                        <tt-flight-media class="ttw-1/3"></tt-flight-media>
						<tt-flight-drawer></tt-flight-drawer>
                        
                    </div>
                </div>
            </div>
        </article>
    
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
    [data-flight-fare-details="false"] .flightcard_fare__details { display: none; }
    [data-flight-fare-details="true"]  .flightcard_fare__details { display: block; }
</style>