<template>
	<div>
		<slot name="ss"> </slot>
	</div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onActivated, PropType, onMounted } from 'vue'
const props = defineProps({
	id: {
		type: Number as PropType<number>,
	},
})
onMounted(() => {
	console.log(props.id)
})
onActivated(() => {
	console.log(props.id)
})
</script>

<style scoped lang="scss"></style>
