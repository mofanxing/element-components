<template>
	<div class="wrap">
		<div class="container">
			<div class="item" v-for="item in showList" :key="item.picture_id">
				<img :src="item.original_url" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
const list = ref<any[]>([])
const showList = ref<any[]>([])
const getList = async () => {
	let { data } = await axios.get(
		'https://www.vilipix.com/api/v1/picture/public?limit=50&tags=&sort=hot&offset=50'
	)
	list.value = data.data.rows
	showList.value = list.value.slice(0, 10)
}
getList()
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
			border-radius: 20px;
			margin: 20px 0 0 20px;
			float: left;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
	}
}
</style>
