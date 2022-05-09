<template>
	<div class="editTable">
		<table>
			<tr v-for="(item, index) in souce" :key="index">
				<td
					v-for="(column, columnIndex) in item"
					:key="columnIndex"
					@dblclick="cellDblclick($event, column)"
					@contextmenu="ellContextmenu($event, index, columnIndex)"
				>
					<div class="text" v-if="!column.showInput">{{ column.value }}</div>
					<el-input
						v-model="column.value"
						v-else
						@blur="column.showInput = false"
						@change="inputChange($event, index, columnIndex)"
					></el-input>
				</td>
			</tr>
		</table>

		<div class="myMun" ref="myMun">
			<el-menu active-text-color="#000000">
				<el-menu-item
					v-for="(itemMun, indexMun) in eventList"
					:key="indexMun"
					:index="String(indexMun)"
					@click="menuClick($event, itemMun.event)"
					>{{ itemMun.text }}</el-menu-item
				>
			</el-menu>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, defineProps, PropType, nextTick, defineEmits } from 'vue'

export interface TableOptions {
	prop?: string
	width?: string | number
	align?: 'left' | 'center' | 'right'
}
const myMun = ref()
const emits = defineEmits(['valueUpdate', 'eventTarget'])

const prop = defineProps({
	data: {
		type: Array as PropType<any[]>,
		required: true,
	},
})

let options = ref<TableOptions[]>([])

let souce = ref([])
prop.data.forEach((item) => {
	let souceObj = {}
	item.forEach((i, index) => {
		souceObj[`col_${index}`] = { value: i, showInput: false }
	})
	souce.value.push(souceObj)
})
for (let key in souce.value[0]) {
	let optionsObj: TableOptions = {
		align: 'center',
		prop: '',
	}
	optionsObj.prop = key
	options.value.push(optionsObj)
}

const cellDblclick = (event, item) => {
	let td = event.target.parentNode
	item.showInput = true
	nextTick(() => {
		td.querySelector('input').focus()
	})
}
console.log(souce.value)

let currentEventIndex = []
const ellContextmenu = (event, index, columnIndex) => {
	event.preventDefault()
	currentEventIndex = [index, columnIndex.split('_')[1]]
	myMun.value.style = `visibility: visible;transform: translate(${event.clientX}px, ${event.clientY}px);`
}

const inputChange = (val, index, columnIndex) => {
	emits('valueUpdate', val, index, columnIndex)
}
document.addEventListener('click', function () {
	myMun.value.style = `visibility: hidden;`
})

const eventList = [
	{
		text: '删除当前行',
		event: 'deleteRow',
	},
	{
		text: '删除当前列',
		event: 'deleteColumn',
	},
	{
		text: '前方插入一列',
		event: 'insertBeforColumn',
	},
	{
		text: '前方插入一行',
		event: 'insertBeforeRow',
	},
	{
		text: '后方插入一列',
		event: 'insertAfterColumn',
	},
	{
		text: '后方插入一行',
		event: 'insertAfterRow',
	},
]

const menuClick = ($event, eventText: string) => {
	emits('eventTarget', eventText, currentEventIndex[0], currentEventIndex[1])
}
</script>

<style scoped lang="scss">
.editTable {
	table {
		border: 1px solid #eee;
		border-collapse: collapse;
		table-layout: fixed;

		width: 100%;
		td {
			border-bottom: 1px solid #eee;
			border-right: 1px solid #eee;
			padding: 8px;
			font-size: 14px;
			color: #606266;
			.text {
				min-height: 48px;
				line-height: 23px;

				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.myMun {
		position: fixed;
		visibility: hidden;
		background-color: #fff;
		z-index: 10;
		width: 180px;
		top: 0;
		left: 0;
		box-shadow: 0 0 20px 10px #eee;
		:deep(.el-menu-item) {
			height: 32px;
			line-height: 32px;
		}
	}
}
</style>
