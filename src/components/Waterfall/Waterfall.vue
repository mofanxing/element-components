<template>
	<div class="wrap">
		<div class="container" ref="container">
			<div class="item" v-for="item in showList" :key="item.picture_id">
				<img :src="item.original_url" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
const list = ref<any[]>([])
const showList = ref<any[]>([])
const container = ref()
let firstItemColumn: number[] = []
const getList = async () => {
	let { data } = await axios.get(
		'https://www.vilipix.com/api/v1/picture/public?limit=50&tags=&sort=hot&offset=50'
	)
	list.value = data.data.rows
	showList.value = list.value.slice(0, 10)
}
getList()

const layoutItem = () => {
	let clientWidth = document.documentElement.clientWidth / 200
	let itemWidth = container.value
	console.log(itemWidth)
	// container.value.style.width =
}
onMounted(() => {
	layoutItem()
})
watch(
	() => showList.value,
	() => {
		layoutItem()
	}
)
</script>

<style scoped lang="scss">
.wrap {
	padding: 20px;
	box-sizing: border-box;
	background-color: black;
	.container {
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		.item {
			width: 200px;

			padding: 12px;
			float: left;
			box-sizing: border-box;
			img {
				width: 100%;
				border-radius: 12px;
			}
		}
	}
}
</style>
