<template>
	<div>
		<Waterfall></Waterfall>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import Waterfall from './components/Waterfall/Waterfall.vue'
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
