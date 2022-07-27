<template>
	<div class="wrap">
		<div class="container" ref="container">
			<div class="item" :ref="getItem" v-for="item in showList" :key="item.picture_id">
				<img :src="item.original_url" @load="setItemHeight" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
const list = ref<any[]>([])
const showList = ref<any[]>([])
const container = ref()
const itemArr = ref([])
let firstItemColumn: number[] = []
const getItem = (el) => {
	if (el) itemArr.value.push(el)
}

const getList = async () => {
	let { data } = await axios.get(
		'https://www.vilipix.com/api/v1/picture/public?limit=50&tags=&sort=hot&offset=50'
	)
	list.value = data.data.rows
	showList.value = list.value.slice(0, 20)
}
getList()

const heightArr = ref<number[]>([])
let imgLoadindex = 1
const setItemHeight = () => {
	if (imgLoadindex >= itemArr.value.length) {
		layoutItem()
	}
	imgLoadindex++
}
const layoutItem = () => {
	let clientWidth = Math.floor(document.documentElement.clientWidth / 200)
	container.value.style.width = 200 * clientWidth + 'px'
	let arr = []
	for (let i = 0; i < itemArr.value.length; i++) {
		if (i < clientWidth) {
			arr.push(itemArr.value[i].offsetHeight)
			heightArr.value = arr
			itemArr.value[i].style.transform = `translate(${i * 200}px, 0px)`
		} else {
			let minHeight = Math.min(...heightArr.value)
			let minIndex = heightArr.value.findIndex((item) => item === minHeight)
			let translateX = minIndex * 200
			let translateY = minHeight
			itemArr.value[i].style.transform = `translate(${translateX}px, ${translateY}px)`
			heightArr.value[minIndex] = minHeight + itemArr.value[i].offsetHeight
		}
	}
	container.value.style.height = Math.max(...heightArr.value) + 'px'
}
</script>

<style scoped lang="scss">
.wrap {
	width: 100vw;
	height: 100vh;
	background-color: #352c2e;
	overflow-y: scroll;
	.container {
		position: relative;
		margin: 0 auto;

		.item {
			width: 200px;
			padding: 12px;
			position: absolute;
			box-sizing: border-box;
			img {
				width: 100%;
				border-radius: 12px;
			}
		}
	}
}
</style>
