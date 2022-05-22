<template>
	<div class="text-editor">
		<textarea :id="editorId" class="tinymce-textarea" />
		<UploadImgPopover v-model:visible="visible" @confirm="insertImg" type="check" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, nextTick, watchEffect } from 'vue'
import tinymce, { Editor } from 'tinymce/tinymce'
import UploadImgPopover from '../uploadImgPopover/UploadImgPopover.vue'

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
import { Session } from '/@/utils/storage'
// #endregion

export default defineComponent({
	name: 'TextEditor',
	components: { UploadImgPopover },
	props: {
		width: {
			type: Number as PropType<number>,
		},
		height: {
			type: [Number, String] as PropType<number | string>,
			default: '100%',
		},
		content: String as PropType<string>,
		text: String as PropType<string>,
		valide: Array as unknown as PropType<[{ [key: string]: any }, string]>,
		toolbar: {
			type: String as PropType<string>,
			default: `formatselect code forecolor backcolor bold italic underline strikethrough link anchor alignleft aligncenter alignright alignjustify outdent indent	fontselect fontsizeselect bullist numlist subscript superscript removeformat table customImage media charmap emoticons hr pagebreak insertdatetime print preview fullscreen bdmap indent2em lineheight formatpainter axupimgs`,
		},
	},
	emits: ['update:content', 'update:text', 'change'],
	setup(props, { emit }) {
		const editorId = 'text-editor_' + new Date().getTime() + Math.floor(Math.random()) * 1000000
		const defaultVal = ref(props.content)

		const visible = ref(false)
		// 记录编辑器实例
		let editorInstance = null as unknown as Editor
		// 向编辑器插入图片
		let insertImg = (data) => {
			const imgsDom = data
				.map((item) => {
					return `<img src="${item.src}"></img>`
				})
				.join('')

			editorInstance.insertContent(imgsDom)
		}

		const setContent = (flag = false) => {
			if (editorInstance && !setContentCount) {
				editorInstance.setContent(props.content || '')
				if (!flag) {
					!(props.content === editorInstance.getContent()) && Session.set('editorCount', 1)
				}
				emit('update:content', editorInstance.getContent())
				emit('change', editorInstance.getContent(), editorInstance.getContent({ format: 'text' }))
				emit('update:text', editorInstance.getContent({ format: 'text' }))
			}
		}

		// 设置此编辑器初始值
		let setContentCount = 0 // 记录设置 编辑器内容 的次数
		watchEffect(() => {
			defaultVal.value = props.content
			setContent(true)
		})

		nextTick(() => {
			tinymce.init({
				selector: `#${editorId}`,
				language: 'zh_CN',
				plugins: 'table link lists code image',
				// 取消默认段落格式(force_p_newlines), 取消默认添加p标签(forced_root_block)
				// forced_root_block: false,
				force_p_newlines: false,
				convert_fonts_to_spans: false,
				block_formats:
					'Paragraph=p; 标题1=h1; 标题2=h2; 标题3=h3; 标题4=h4; 标题5=h5; 标题6=h6; 正文=pre',
				non_empty_elements:
					'td,th,iframe,video,audio,object,pre,code,area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source,wbr,track,svg,defs,pattern,desc,metadata,g,mask,path,line,marker,rect,circle,ellipse,polygon,polyline,linearGradient,radialGradient,stop,image,view,text,textPath,title,tspan,glyph,symbol,switch,use',
				extended_valid_elements:
					'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*],script[*],style[*],link[*]',
				toolbar: [props.toolbar],
				valid_elements: '*[*]',
				valid_children: '*[*]',
				width: '100%',
				menubar: false,
				statusbar: false,
				height: props.height,
				contextmenu: '',
				setup: function (editor) {
					// 添加自定义按钮
					editor.ui.registry.addButton('customImage', {
						icon: 'image',
						onAction: function () {
							visible.value = true
						},
					})

					// 编辑器初始化时，将编辑器实例记录下来
					editor.on('init', function () {
						editorInstance = editor
						if (props.content) {
							setContent(false)
						}
					})
					// 编辑器的input事件
					editor.on('input change redo undo KeyUp', function (e) {
						if (e.type === 'input') setContentCount++
						emit('update:content', editor.getContent())
						emit('update:text', editor.getContent({ format: 'text' }))
						emit(
							'change',
							editorInstance.getContent(),
							editorInstance.getContent({ format: 'text' })
						)

						// 表单验证
						if (props.valide) {
							const [elform, content] = props.valide
							elform.validateField(content)
						}
					})

					editor.on('keydown', function (e) {
						if (e.code === 'Enter' || e.code === 'Delete' || e.code === 'Backspace')
							setContentCount++
					})
				},
			})
		})

		return {
			defaultVal,
			editorId,
			visible,
			insertImg,
		}
	},
})
</script>

<style lang="scss" scoped>
.text-editor {
	height: 100%;
}

textarea {
	display: none;
}

:deep(.tox-statusbar__branding) {
	display: none;
}

:deep(.tox .tox-statusbar__path) {
	display: none;
}
</style>
