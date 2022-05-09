<template>
	<div class="editTable">
		<el-table
			:data="souce"
			@cell-dblclick="cellDblclick"
			@cell-contextmenu="ellContextmenu"
			:border="true"
			:show-header="false"
		>
			<template v-for="(item, index) in options" :key="index">
				<el-table-column :align="item.align" :prop="item.prop">
					<template #default="scope">
						<div class="text" v-if="!scope.row[scope.column.property].showInput">
							{{ scope.row[scope.column.property].value }}
						</div>
						<el-input
							v-else
							v-model="scope.row[scope.column.property].value"
							@blur="scope.row[scope.column.property].showInput = false"
							@change="inputChange($event, scope)"
						></el-input>
					</template>
				</el-table-column>
			</template>
		</el-table>

		<div class="myMun" ref="myMun">
			<el-menu active-text-color="#000000">
				<el-menu-item index="1-1">删除当前行</el-menu-item>
				<el-menu-item index="2-1">删除当前列</el-menu-item>
				<!-- <el-menu-item>前方插入一列</el-menu-item>
				<el-menu-item>前方插入一行</el-menu-item>
				<el-menu-item>后方插入一列</el-menu-item>
				<el-menu-item>后方插入一行</el-menu-item> -->
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
const emits = defineEmits(['valueUpdate'])

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

const cellDblclick = (row, column, cell) => {
	row[column.property].showInput = true
	nextTick(() => {
		cell.querySelector('input').focus()
	})
}

const ellContextmenu = (row, column, cell, event) => {
	event.preventDefault()
	myMun.value.style = `visibility: visible;transform: translate(${event.clientX}px, ${event.clientY}px);`

	console.log(event, myMun.value)
}

const inputChange = (val, scope) => {
	emits('valueUpdate', val, scope.$index, scope.column.rawColumnKey)
}
document.addEventListener('click', function () {
	myMun.value.style = `visibility: hidden;`
})
</script>

<style scoped lang="scss">
.editTable {
	:deep(.cell) {
		min-height: 23px;
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
