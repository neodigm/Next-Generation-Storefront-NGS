<template>
    <section class="flight-card--wrapper"
data-card-shelf-list-is-visible="false"
data-card-details-is-visible="false"
data-card-out-policy="false"
data-card-out-policy-penalty="needs_approval"
>
        <tt-flight-offer></tt-flight-offer>
        <tt-flight-shelf-list></tt-flight-shelf-list>
        <tt-flight-details></tt-flight-details>
    </section>
</template>

<script>

    // Components
    import FlightOffer from '@source-components/flights/FlightOffer.vue';
    import FlightShelfList from '@source-components/flights/FlightShelfList.vue';
    import FlightDetails from '@source-components/flights/FlightDetails.vue';

    export default {
        components: { 
            ttFlightOffer: FlightOffer,
            ttFlightShelfList: FlightShelfList,
            ttFlightDetails: FlightDetails,
        },
        props: {
            cardShelfListIsVisible: { type: String, required: false },
            cardDetailsIsVisible: { type: String, required: false },
            cardOutPolicy: { type: String, required: false },
            cardOutPolicyPenalty: { type: String, required: false },
        }
    }
</script>

<style scoped>

[data-card-shelf-list-is-visible="false"] tt-flight-shelf-list {
    display: none;
}

[data-card-details-is-visible="false"] tt-flight-details {
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