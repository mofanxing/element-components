<template>
	<div>
		<Item v-for="item in list" :key="item" :id="item">{{ item }}</Item>
	</div>
</template>

<script lang="ts" setup>
import { ref, onActivated, onUnmounted, onMounted, defineProps, PropType, onDeactivated } from 'vue'
import Item from './item.vue'
const props = defineProps({
	list: {
		type: Array as PropType<number[]>,
		required: true,
	},
})
onUnmounted(() => {
	console.log('组件卸载')
})
onMounted(() => {
	console.log('组件加载')
})
onDeactivated(() => {
	console.log('组件卸载')
})
onActivated(() => {
	console.log(props.list)
})
</script>

<style scoped lang="scss"></style>
