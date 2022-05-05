<template>
	<table class="editTable" ref="editTable">
		<!-- <div class="editTable-colmun" v-for="(item, index) in tableData" :key="index">
			<div class="editTable-cell" v-for="(itemCell, indexCell) in item" :key="indexCell">
				<div class="editTable-text">{{ itemCell }}</div>
				<el-input v-model="item[indexCell]"></el-input>
			</div>
		</div> -->
		<tr v-for="(item, index) in tableData" :key="index">
			<td @dblclick="editEvent" v-for="(itemCell, indexCell) in item" :key="indexCell">
				<div class="editTable-text">{{ itemCell }}</div>
				<el-input @blur="saveEvent" v-model="item[indexCell]"></el-input>
			</td>
		</tr>
	</table>
	<button @click="insert">插入数据</button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const editTable = ref()
const tableData = ref([
	['测试数据', '测试数据2', '测试数据3'],
	['测试数据4', '测试数据5', '测试数据6'],
	['测试数据7', '测试数据8', '测试数据9'],
])

let oldNode = null
const editEvent = (event) => {
	event.stopPropagation()
	if (oldNode !== null) {
		oldNode.className = ''
	}
	let dom = event.target
	dom.parentNode.className = 'isEdit'
	dom.parentNode.querySelector('.el-input__inner').focus()
	oldNode = dom.parentNode
}

const saveEvent = (event) => {
	event.stopPropagation()
	console.log(event)
	let dom = event.target
	dom.parentNode.parentNode.className = ''
}

const insert = () => {
	tableData.value.push(['测试数据7', '测试数据8', '测试数据9'])
}

const initWidth = () => {
	let len = tableData.value[0].length
	console.log(editTable.value.querySelectorAll('td'))
	editTable.value.querySelectorAll('td').forEach((item) => {
		item.style.width = `${editTable.value.offsetWidth / len}px `
	})
}
onMounted(() => {
	initWidth()
})
</script>

<style scoped lang="scss">
.editTable {
	width: 100%;
	margin-top: 40px;
	border-collapse: collapse;

	tr {
		height: 50px;
		td {
			&.isEdit {
				.editTable-text {
					display: none;
				}
				.el-input {
					display: block;
				}
			}
			padding: 8px;
			line-height: 23px;
			box-sizing: border-box;
			text-align: center;
			border: 1px solid #ebeef5;
			&:hover {
				background-color: #f5f7fa;
				/* border-color: #409eff; */
				cursor: pointer;
			}

			.editTable-text {
				display: block;
			}
			.el-input {
				display: none;
				.el-input__inner {
					text-align: center;
				}
			}
		}
	}
}
</style>
