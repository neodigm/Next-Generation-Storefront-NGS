<template>
	
	<section class="l-flight-drawer ttflex">
		<div class="ttw-auto ttself-stretch ttpx-5 ttml-3">

			<div class="ttmt-1 tttext-gray-900">
				<span class="leg_fare__label">Main Cabin</span>
			</div>
			<div class="ttmt-2" style="">
				<ul>
					<li class="ttfs-8">Seat pitch</li>
					<li class="ttfs-8">Advance changes</li>
					<li class="ttfs-8">Carry-on baggage allowance</li>
					<li class="" style="font-size:8px;">Non refundable</li>
					<li class="" style="font-size:8px;">Changeable for fee</li>
					<li class="" style="font-size:8px;">Paid checked bags</li>
					<li class="drawer_fare__price">$300</li>
				</ul>
			</div>
			<div class="ttmt-2" style="">
				<button class="js-select-flight ttborder ttborder-purple-500 hover:ttbg-purple-500 hover:tttext-white ttfont-normal tttext-purple-500 ttfs-12 ttpy-2 ttpx-4 ttrounded">
					Select Flight
				</button>
			</div>
		</div>
		<div class="ttw-auto ttflex-grow ttself-stretch ttborder-l ttborder-black-300 ttpx-5">

			<div class="ttmt-1">
				<span class="leg_fare__label">Main Cabin Flexible</span>
			</div>
			<div class="ttmt-2" style="">
				<ul>
					
					<li class="ttfs-8">Seat pitch</li>
					<li class="ttfs-8">Advance changes</li>
					<li class="ttfs-8">Carry-on baggage allowance</li>

					<li class="ttfs-8">Non refundable</li>
					<li class="ttfs-8">Changeable for fee</li>
					<li class="ttfs-8">Paid checked bags</li>
					<li class="drawer_fare__price">$262</li>
				</ul>
			</div>
			<div class="ttmt-2" style="">
				<button class="js-select-flight ttborder ttborder-purple-500 hover:ttbg-purple-500 hover:tttext-white ttfont-normal tttext-purple-500 ttfs-12 ttpy-2 ttpx-4 ttrounded">
					Select Flight
				</button>
			</div>
		</div>
	</section>
	
</template>

<script>
	export default {
		data() {
			return {}
		},
		components: {}
	}
</script>

<style scoped>
.l-flight-drawer{
	font-family: 'Open Sans',sans-serif;
}
.drawer_fare__price{
line-height: 1.5;
font-family: 'Open Sans',sans-serif;
color: #4e5a80!important;
font-size: 20px;
font-weight: 900!important;
margin-bottom: 0!important;
text-align: left;
}
</style>