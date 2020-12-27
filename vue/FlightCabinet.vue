<template>
    <section class="l-flight-cabinet tth-full"
data-cabinet-fare-basic="hide"
data-cabinet-is-domestic="true"
>
<div class="flightcard_faregrid tth-full">
    <tt-flight-shelf></tt-flight-shelf>
    <tt-flight-shelf></tt-flight-shelf>
    <tt-flight-shelf></tt-flight-shelf>
    <tt-flight-shelf></tt-flight-shelf>
    <tt-flight-shelf></tt-flight-shelf>
    <tt-flight-shelf></tt-flight-shelf>
</div>
<tt-return-flight-drawer></tt-return-flight-drawer>
    </section>
</template>
<script>
    // Components
    import FlightShelf from '@source-components/flights/FlightShelf.vue';
    import ReturnFlightDrawer from '@source-components/flights/ReturnFlightDrawer.vue';

    export default {
        data () {
            return {
            }
        },
        components: { 
            ttFlightShelf: FlightShelf,
            ttReturnFlightDrawer:ReturnFlightDrawer,
            
        },
        props: {
            cabinetFareBasic: { type: String, required: false },
            cabinetIsDomestic: { type: String, required: false },
        }
    }
</script>

<style scoped>
.l-flight-cabinet,
tt-flight-shelf {
    display: block;
}
[data-cabinet-fare-basic="hide"] tt-flight-shelf:nth-of-type(1) {
    display: none;
}
[data-cabinet-fare-basic="allow"] tt-flight-shelf:nth-of-type(1),
[data-cabinet-fare-basic="needs_approval"] tt-flight-shelf:nth-of-type(1) {
    cursor: pointer;
}
[data-cabinet-fare-basic="restricted"] tt-flight-shelf:nth-of-type(1) {
    opacity: 0.6;
    filter:grayscale(88%);
}
[data-cabinet-is-domestic="true"] tt-flight-shelf:nth-of-type(6) {
    display: none;
}
[data-flight-direction='return'] .flightcard_faregrid {
    display:none
}
[data-flight-direction='depart'] tt-return-flight-drawer {
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