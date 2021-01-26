let _Vue
let current
class Router {
    constructor(options) {
        this.$options = options
        _Vue.util.defineReactive(this, 'current', window.location.hash.slice(1))
        window.addEventListener('hashchange', this.hashChange.bind(this))
    }

    hashChange() {
        this.current = window.location.hash.slice(1)
    }

}
Router.install = function (Vue) {
    _Vue = Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    Vue.component('router-view', {
        render(h) {
            let component = null
            const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
            if (route) {
                component = route.component
            }
            return h(component)
        }
    })

    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                default: ''
            },
            tag: {
                type: String,
                default: 'a'
            }
        },
        render(h) {
            return h(
                this.tag, 
                {
                attrs: {
                    href: this.to
                }
            }, this.$slots.default)
        }
    })
}
export default Router