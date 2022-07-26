<template>
	<div>
		<!-- <Waterfall></Waterfall> -->

		<KeepAlive>
			<TestVue v-for="item in list" :id="item" :key="item">
				<template #ss>
					<div>{{ item }}</div>
				</template>
			</TestVue>
		</KeepAlive>
		<el-button @click="dele">删除</el-button>
		<el-button @click="list.unshift(1)">添加</el-button>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import Waterfall from './components/Waterfall/Waterfall.vue'
import TestVue from './components/test/test.vue'
const list = ref([0, 1, 2, 3, 4, 5])
const dele = () => {
	console.log(list.value.shift())
}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
