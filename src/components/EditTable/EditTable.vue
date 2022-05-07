<template>
	<el-table :data="data">
		<template v-for="(item, index) in tableOptions" :key="index">
			<el-table-column
				v-if="!item.slot"
				:label="item.label"
				:align="item.align"
				:prop="item.prop"
			></el-table-column>
			<el-table-column v-else :label="item.label" :align="item.align" :prop="item.prop">
				<template #default="scope">
					<slot :name="item.slot" :scope="scope"></slot>
				</template>
			</el-table-column>
		</template>
		<el-table-column :label="actionOptions!.label" :align="actionOptions!.align">
			<template #default="scope">
				<slot name="action" :scope="scope"></slot>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, PropType } from 'vue'

export interface TableOptions {
	prop?: string
	label: string
	width?: string | number
	align?: 'left' | 'center' | 'right'
	slot?: string
	action?: boolean
}

const props = defineProps({
	options: {
		type: Array as PropType<TableOptions[]>,
		required: true,
	},
	data: {
		type: Array as PropType<any[]>,
		required: true,
	},
})

let tableOptions = computed(() => props.options.filter((item) => item.action !== true))

let actionOptions = computed(() => props.options.find((item) => item.action === true))
</script>

<style scoped lang="scss"></style>
