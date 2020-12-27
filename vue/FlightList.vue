<template>
    <main data-list-out-policy-show="true" class="l-flightList">
        <section v-if="true" class="">

            <aside class="contain-depart">
                <tt-flight-card></tt-flight-card>
                <tt-flight-card></tt-flight-card>
                <tt-flight-card></tt-flight-card>
                <tt-flight-card></tt-flight-card>
                <tt-flight-card></tt-flight-card>
                <tt-flight-card></tt-flight-card>
            </aside>
            <aside class="contain-return">
                <tt-return-flight-card></tt-return-flight-card>
                <tt-return-flight-card></tt-return-flight-card>
                <tt-return-flight-card></tt-return-flight-card>
                <tt-return-flight-card></tt-return-flight-card>
            </aside>

        </section>
        <section v-else>
            <div class="">
                <!--
                <strong>No results returned. </strong> Please try another your search.
                -->
            </div>
        </section>
    </main>
</template>

<script>

    // Components
    import FlightCard from '@source-components/flights/FlightCard.vue';

    export default {
        components: { 
            ttFlightCard: FlightCard,
        },
        props: {
            listOutPolicyShow: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>

[data-list-out-policy-show="true"] .l-flightList {

}

[data-list-out-policy-show="false"] .l-flightList {
    
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
/* --------------------------- 
      IE 11 Overrides
--------------------------- */
@media (min-width:600px) and (max-width:768px) and (-ms-high-contrast: active), 
(min-width:600px) and (max-width:768px) and (-ms-high-contrast: none) {
  
}
</style>