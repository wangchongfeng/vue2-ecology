<template>
    <div>
        我是form组件
        <button @click="create">弹窗</button>
    </div>
</template>
<script>
import create from '@/utils/create'
import Notice from './Notice.vue'
export default {
    methods: {
        create() {
           let a = create(Notice, {
               title: '老杨喊你来搬砖',
               message: '弹窗内容'
           }).show()
        }
    }
}
</script>