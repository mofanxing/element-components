<template>
	<div>
		<el-dialog title="ces" v-model="show">
			<div class="box">
				<EditorText v-if="a === 1"></EditorText>
				<p v-else>sadasda</p>
			</div>
		</el-dialog>
		<el-button @click="show = !show">展示</el-button>
		<el-button @click="a = 2">2</el-button>
		<el-button @click="a = 1">1</el-button>
		<div class="lin"></div>
		{{ time }}
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import EditorText from './components/EditorText/EditorText.vue'
import { countDown } from './tools/down.js'
const a = ref(1)
const show = ref(false)
let startTime = new Date().getTime()
let endTime = startTime + 700000
let time = ref('')
setInterval(() => {
	time.value = countDown(startTime, endTime)
}, 1000)
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	padding: 20px;
}
.lin {
	margin-bottom: 40px;
}
.box {
	height: 400px;
}
.grid {
	display: grid;
	grid-template-columns: 100px 100px;
	grid-template-rows: 100px 100px;
}
</style>
