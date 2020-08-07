
function observe(obj) {
    if (typeof obj !=='object' ||  obj === null) {
        return obj
    }
    new Observer(obj)
}
function set(obj, key, val) {
    defineRactive(obj, key, val)
}

// 代理通过this直接访问对象上的属性方法
function Proxy(vm, key) {
    Object.keys(vm[key]).forEach(k => {
        Object.defineProperty(vm, k, {
            get() {
                return vm[key][k]
            },
            set(val) {
                vm[key][k] = val
            }
        })
        
    })
}

class Vue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        observe(this.$data)
        Proxy(this,'$data')
        new Compile(options.el, this)
    }
}
// 定义响应式
function defineRactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            return val
        },
        set(newVal) {
            if (val !== newVal) {
                console.log('set', newVal )
                observe(newVal)
                val = newVal
                // update()
            }
        }
    })
}


function update() {
    app.innerHtml = a.count
}
// 根据类型不同做不同的操作，把数据变成响应式
class Observer {
    constructor(value) {
        this.value = value
        this.walk(value)
    }
    // 遍历
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineRactive(obj, key, obj[key])
        })
    }
}

class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el)
        this.vm = vm
        if (this.$el) {
            this.compile(this.$el)
        }
    }
    compile(el) {
        // 遍历元素，根据类型进行不同操作
        el.childNodes.forEach(node => {
            if (node.nodeType === 1) {
                // 元素
                this.compileElement(node)
            } else if (this.isInter(node)) {
                this.compileText(node)
            }
            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })

    }
    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    // 编译渲染文本
    compileText(node) {
        node.textContent = this.vm[RegExp.$1.trim()]
    }
    // 编译元素上的指令事件
    compileElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node,exp)
            }
        })
    }
    isDirective(attr) {
        return attr.startsWith('k-')
    }
    text(node, exp) {
        node.textContent = this.vm[exp]
    }
    html(node, exp) {
        node.innerHTML = this.vm[exp]
    }
}






