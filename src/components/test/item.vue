<template>
	<div>
		<div><slot></slot></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, PropType, defineProps, onUnmounted, onMounted, onUpdated } from 'vue'
// const props = defineProps({
// 	list: {
// 		type: Array as PropType<number[]>,
// 		required: true,
// 	},
// })
onUnmounted(() => {
	console.log('列表组件卸载')
})
onMounted(() => {
	console.log('列表组件加载')
})
onUpdated(() => {
	console.log('组件更新')
})
</script>

<style scoped lang="scss"></style>
