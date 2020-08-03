import Vue from 'vue'
// 老杨喊你来搬砖
const create = function(components, options = {}) {
    const construct = Vue.extend(components)
    const vm = new construct({propsData: options}).$mount()
    document.body.appendChild(vm.$el)
    console.log(vm.$el)
    vm.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return vm
}
export default create