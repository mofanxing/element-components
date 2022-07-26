<template>
	<div>
		<KeepAlive>
			<Item v-for="item in list" :key="item">{{ item }}</Item>
		</KeepAlive>

		<!-- <component :is="thisCom[comIndex]"></component> -->
		<el-button @click="comIndex = '1'">1</el-button>
		<el-button @click="comIndex = '2'">2</el-button>
		<el-button @click="open = false">组件卸载</el-button>
		<el-button @click="open = true">组件加载</el-button>
		<el-button @click="updateList">更新</el-button>
		<el-button @click="list.pop()">移除</el-button>
		<el-button @click="list.push(0)">add</el-button>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Waterfall from './components/Waterfall/Waterfall.vue'
import Item from './components/test/item.vue'

const list = ref([1, 2, 3])
const updateList = () => {
	list.value = [4, 5, 6]
}
const open = ref(true)
const comIndex = ref('1')
const thisCom = {
	'1': Waterfall,
}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
