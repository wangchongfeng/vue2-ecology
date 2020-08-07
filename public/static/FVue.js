
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
        this.$methods = options.methods
        observe(this.$data)
        Proxy(this,'$data')
        Proxy(this,'$methods')
        new Compile(options.el, this)
    }
}
// 定义响应式
function defineRactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (val !== newVal) {
                observe(newVal)
                val = newVal
                dep.notify()
            }
        }
    })
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
        this.update(node, RegExp.$1.trim(), 'text')
    }
    // 编译元素上的指令事件
    compileElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
            }
            if (this.isEvent(attrName)) {
                // 事件添加事件监听
                const dir = attrName.substring(1)
                this.vm[exp] && node.addEventListener(dir, this.vm[exp])
            }
        })
    }
    isDirective(attr) {
        return attr.startsWith('k-')
    }
    // 判断是否是事件
    isEvent(attr) {
        return attr.startsWith('@') 
    }
    model(node, exp) {
        this.update(node, exp, 'model')
        // 绑定input事件， dom更改 触发数据改变
        node.addEventListener('input', (e) => {
            this.vm[exp] = e.target.value
        })
    }
    // input赋值
    modelUpdater(node, val) {
        node.value = val
    }
    text(node, exp) {
        this.update(node, exp, 'text')
    }
    textUpdater(node,val) {
        node.textContent = val
    }
    html(node, exp) {
        this.update(node, exp, 'html')
    }
    htmlUpdater(node, val) {
        node.innerHTML = val
    }
    update(node, exp, dir) {
        const fn = this[dir+ 'Updater']
        fn && fn(node, this.vm[exp])
        new Watcher(this.vm, exp, function(val) {
            fn && fn(node, val)
        })
    }
}

class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn
        // 收集依赖触发
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }
    update() {
        this.updateFn.call(this.vm, this.vm[this.key] )
    }
}

class Dep {
    constructor() {
        this.deps = []
    }
    addDep(watcher) {
        this.deps.push(watcher)
    }
    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}






