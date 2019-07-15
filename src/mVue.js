function Vue(options){
  this.data = options.data;
	
  var data = this.data;
	observe(data,this);
	
  var id = options.el;
  var dom = nodeContainer(document.getElementById(id),this);
  document.getElementById(id).appendChild(dom);  
}

//mVue的data的属性响应式
function observe (obj,vm){
  Object.keys(obj).forEach(function(key){
    defineReactive(vm,key,obj[key]);
  })
}
function defineReactive (obj, key, value){
	var dep = new Dep();//每一个vm的data属性值声明一个新的订阅者
  Object.defineProperty(obj,key,{
    get:function(){
			if(Dep.global){//这里是第一次new对象Watcher的时候，初始化数据的时候，往订阅者对象里面添加对象。第二次后，就不需要再添加了
        dep.add(Dep.global);
      }
      return value;
    },
    set:function(newValue){
      if(newValue === value){
        return;
      }
      value = newValue;
      dep.notify();
    }
  })
}

//mVue的虚拟节点容器
function nodeContainer(node, vm, flag){
  var flag = flag || document.createDocumentFragment();

  var child;
  while(child = node.firstChild){
    compile(child, vm);
    flag.appendChild(child);
    if(child.firstChild){
      nodeContainer(child, vm, flag);
    }
  }
  return flag;
}

//编译
function compile(node, vm){
  var reg = /\{\{(.*)\}\}/g;
  if(node.nodeType === 1){
    var attr = node.attributes;
    
    for(var i = 0;i < attr.length; i++){
      if(attr[i].nodeName == 'v-model'){
        var name = attr[i].nodeValue;
				
				node.addEventListener('input',function(e){
          vm[name] = e.target.value;
        });
				
        node.value = vm.data[name];
        node.removeAttribute('v-model');
				
				new Watcher(vm,node,name);
      }
    }
  }
  if(node.nodeType === 3){
    if(reg.test(node.nodeValue)){
      var name = RegExp.$1;
      name = name.trim();
      //node.nodeValue = vm.data[name];
			new Watcher(vm,node,name);
    }
  }
}

//定义发布者
function Dep(){
  this.subs = [];
}
Dep.prototype ={
  add:function(sub){
    this.subs.push(sub);
  },
  notify:function(){
    this.subs.forEach(function(sub){
      sub.update();
    })
  }
}

//定义观察者
function Watcher(vm,node,name){
  Dep.global = this;//重要！把自己赋值给Dep函数对象的全局变量
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.update();
  Dep.global = null;//update()完清空Dep函数对象的全局变量
}
Watcher.prototype.update = function(){
    this.get();
    switch (this.node.nodeType) {
      case 1: 
        this.node.value = this.value;
        break;
      case 3:
        this.node.nodeValue = this.value;
        break;
      default: break;
    };
}
Watcher.prototype.get = function(){
    this.value = this.vm[this.name];//这里把this的value值赋值，触发data的defineProperty方法中的get方法！
}

export default Vue;