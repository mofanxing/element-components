<template>
	<div style="height: 400px">
		<EditorText></EditorText>
		<!-- <EditTableVue :data="tableData" :options="options">
			<template #action="{ scope }">
				<el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
				<el-button size="small" type="danger">删除</el-button>
			</template>

			<template #myname="{ scope }"> 哈哈 </template>
		</EditTableVue> -->

		<div class="lin"></div>
		<!-- <MyTable :data="tableData2" @value-update="valeUpdate" @event-target="eventTarget"></MyTable> -->
		<CustomTable
			:data="tableData2"
			@value-update="valeUpdate"
			@event-target="eventTarget"
		></CustomTable>

		<div class="grid">
			<div class="item" v-for="index in 6" :key="index">{{ index }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import EditorText from './components/EditorText/EditorText.vue'
// import EditTableVue, { TableOptions } from './components/EditTable/EditTable.vue'

import MyTable from './components/MyTable/MyTable.vue'
import CustomTable from './components/CustomTable/CustomTable.vue'

const tableData = ref([
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
])

const tableData2 = ref([
	['2016-05-04', '测试', 'Tom', '', 'No. 189, Grove St, Los Angeles'],
	['2016-05-05', '测试', 'Tom2', '', 'No. 189, Grove St, Los Angeles'],
	['', '', '', '', ''],
])

const valeUpdate = (newVal, index, columnIndex) => {
	tableData2.value[index][columnIndex] = newVal
}

const eventTarget = (eventText, index, columnIndex, editEvent) => {
	editEvent[eventText](tableData2.value, Number(index), Number(columnIndex))
}
let options: TableOptions[] = [
	{
		label: '日期',
		prop: 'date',
		align: 'center',
	},
	{
		label: '姓名',
		prop: 'name',
		align: 'center',
		slot: 'myname',
	},
	{
		label: '地址',
		prop: 'address',
		align: 'center',
	},
	{
		label: '操作',
		align: 'center',
		action: true,
	},
]

const edit = (scope: any) => {
	console.log(scope)
}
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

.grid {
	display: grid;
	grid-template-columns: 100px 100px;
	grid-template-rows: 100px 100px;
}
</style>
