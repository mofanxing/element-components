<template>
	<div style="height: 400px">
		<EditorText></EditorText>
		<MyTable :data="tableData" :options="options"></MyTable>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import EditorText from './components/EditorText/EditorText.vue'
import MyTable from './components/MyTable/MyTable.vue'
import { TableOptions } from './components/MyTable/types'
const tableData = [
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
]

const options: TableOptions[] = [
	{
		prop: 'date',
		align: 'center',
	},
	{
		prop: 'name',
		align: 'center',
	},
	{
		prop: 'address',
		align: 'center',
	},
]
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
