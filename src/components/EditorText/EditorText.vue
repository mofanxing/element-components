<template>
	<div class="editor-wrapper">
		<textarea :id="editorId" class="tinymce-textarea"></textarea>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, nextTick, watchEffect } from 'vue'
import tinymce, { Editor } from 'tinymce/tinymce'
// #region
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
// import 'tinymce/plugins/table';
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
// #endregion
export default defineComponent({
	name: 'Editor',
	props: {
		width: {
			type: Number as PropType<number>,
		},
		height: {
			type: [Number, String] as PropType<number | string>,
			default: '100%',
		},
		content: {
			type: String as PropType<string>,
		},
	},
	emits: ['update:content', 'update:text', 'change'],
	setup(props, { emit }) {
		const editorId = 'text-editor_' + new Date().getTime() + Math.floor(Math.random()) * 1000000
		const defaultVal = ref(props.content)
		// 记录编辑器实例
		let editorInstance = null as unknown as Editor
		const setContent = () => {
			if (editorInstance && !setContentCount) {
				editorInstance.setContent(props.content || '')
				emit('update:content', editorInstance.getContent())
				emit('change', editorInstance.getContent(), editorInstance.getContent({ format: 'text' }))
				emit('update:text', editorInstance.getContent({ format: 'text' }))
			}
		}

		// 设置比编辑器初始值
		let setContentCount = 0 // 记录设置 编辑器内容 的次数

		watchEffect(() => {
			defaultVal.value = props.content
			setContent()
		})

		nextTick(() => {
			tinymce.init({
				selector: `#${editorId}`,
				language: 'zh_CN',
				plugins: 'table link lists code image',
				toolbar: [
					`formatselect code forecolor backcolor bold italic underline strikethrough link anchor alignleft aligncenter alignright alignjustify outdent indent	fontselect fontsizeselect bullist numlist blockquote subscript superscript removeformat table customImage media charmap emoticons hr pagebreak insertdatetime print preview fullscreen bdmap indent2em lineheight formatpainter axupimgs`,
				],
				width: '100%',
				menubar: false,
				height: props.height,
				setup: function (editor) {
					// 添加自定义按钮
					editor.ui.registry.addButton('customImage', {
						icon: 'image',
						onAction: function () {},
					})

					// 编辑器初始化时，将编辑器实例记录下来
					editor.on('init', function () {
						editorInstance = editor
						if (props.content) {
							setContent()
						}
					})

					// 编辑器的input事件
					editor.on('input change redo undo', function (e) {
						if (e.type === 'input') setContentCount++

						emit('update:content', editor.getContent())
						emit('update:text', editor.getContent({ format: 'text' }))
						emit(
							'change',
							editorInstance.getContent(),
							editorInstance.getContent({ format: 'text' })
						)
					})
				},
			})
		})
		return {
			editorId,
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-wrapper {
	height: 100%;
}
</style>
