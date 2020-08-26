let effectStack = []
let targetMap = new WeakMap()
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  return new Proxy(obj, {
    get(target, key ,reciever) {
      let res = Reflect.get(target, key, reciever)
      track(target, key)
      console.log('get:', res)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, reciever) {
      
      let res = Reflect.set(target, key, value, reciever)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key, value,  reciever) {
      return Reflect.deleteProperty(target, key, value, reciever)
    }
  })
}

function track(target, key) {
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depsMap =  targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    if (!deps.has(effect)) {
      deps.add(effect)
    }
  }
}
function trigger(target, key) {
  let depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      console.log('trigger了')
      deps.forEach(effect => effect())
    }
    
  }
}

function effect(fn) {
  try{
    effectStack.push(fn)
    fn()
  } finally {
    effectStack.pop()
  }
}

let obj = reactive({a: 1})
effect(() => {
  console.log('effect:', obj.b)
})
obj.b = 3
console.log(obj.b)