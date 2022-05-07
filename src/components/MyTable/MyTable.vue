<template>
	<el-table :data="souce" @cell-dblclick="cellDblclick" :border="true" :show-header="false">
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
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, nextTick, defineEmits } from 'vue'

export interface TableOptions {
	prop?: string
	width?: string | number
	align?: 'left' | 'center' | 'right'
}

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

const inputChange = (val, scope) => {
	emits('valueUpdate', val, scope.$index, scope.column.rawColumnKey)
}
</script>

<style scoped lang="scss"></style>
