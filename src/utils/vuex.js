let _Vue
class Store {
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        this._vm = new _Vue({
            data() {
                return {
                    $$state: options.state
                }
            }
        })
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
        this.setGetters(options.getters)
    }
    // 天王盖地虎
    setGetters(getters) {
        this.getters = {}
        let that = this
        for (let key in getters) {
            const getter = getters[key]
            Object.defineProperty(this.getters, key, {
                get(){
                    return getter(that._vm._data.$$state)
                },
                set() {
                    console.log('cannot change getters')
                }
            })
        }
    }
    get state() {
        return this._vm._data.$$state
    }
    set state(val) {
        console.log('cannot change state')
    }
    commit(type, payload) {
        const mutation = this._mutations[type]
        if (!mutation) {
            throw new Error('unkunow mutation type')
        }
        return mutation(this.state, payload)
    }
    dispatch(type, payload) {
        const action = this._actions[type]
        if (!action) {
            throw new Error('unkunow mutation type')
        }
        return action(this, payload)
    }
}

 function install(Vue) {
    _Vue = Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}
export default {install, Store}