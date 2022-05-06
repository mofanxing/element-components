<template>
	<div style="height: 400px">
		<EditorText></EditorText>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import EditorText from './components/EditorText/EditorText.vue'
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
