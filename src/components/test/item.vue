<template>
	<div>
		<div>{{ props.id }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, PropType, defineProps } from 'vue'
const props = defineProps({
	id: {
		type: Number as PropType<number>,
		required: true,
	},
})
</script>

<style scoped lang="scss"></style>
