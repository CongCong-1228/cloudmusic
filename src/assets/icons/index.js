// 一个个导入svg太麻烦，我们使用webpack自动导入所有文件

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 将SvgIcon组件注册到全局
Vue.component('svg-icon', SvgIcon)

// requires and returns all modules that match

// 遍历这个目录下的所有文件
const requireAll = requireContext => requireContext.keys().forEach(requireContext)

// import svg
// 指定目录和遍历的规则
const req = require.context('@/assets/icons/svg', true, /\.svg$/)

requireAll(req)


