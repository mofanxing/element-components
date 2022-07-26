<template>
	<div>
		<Item v-for="item in list" :key="item">{{ item }}</Item>
		<el-button @click="updateList">更新</el-button>
		<el-button @click="list.pop()">移除</el-button>
		<el-button @click="list.push(0)">add</el-button>
	</div>
</template>

<script lang="ts" setup>
import { ref, onActivated, onUnmounted, onMounted } from 'vue'
import Item from './item.vue'
const list = ref([1, 2, 3])
const updateList = () => {
	list.value = [4, 5, 6]
}

onUnmounted(() => {
	console.log('组件卸载')
})
onMounted(() => {
	console.log('组件加载')
})
onActivated(() => {
	console.log(list.value)
})
</script>

<style scoped lang="scss"></style>
