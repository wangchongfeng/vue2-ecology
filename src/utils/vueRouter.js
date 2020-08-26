let _Vue
let current
export default Router {
    construct(options) {
        this.routes = this.options.routes
        window.addEventListener('hashchange', )
    }

    addChangeEvent() {
        
    }

}
Router.install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    Vue.component('router-view', {
        props: {

        },
        render(h) {

            return h()
        }
    })
}