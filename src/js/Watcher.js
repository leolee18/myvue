import Dep from "./Dep.js";
class Watcher{
	//使用订阅的节点
	//全局vm对象，用于获取数据
	//发布时要做的事情
	constructor(vm,expr,cb) {
	    this.vm = vm;
		this.expr = expr;
		this.cb = cb;
		
		//缓存当前值
		this.value = this.get();
	}
	//获取当前值
	get(){
		Dep.target = this;
		var value = this.vm.$data[this.expr];
		Dep.target = null;
		
		return value;
	}
	//发布后更新方法
	update(){
		var newValue = this.vm.$data[this.expr];
		var oldValue = this.value;
		if(newValue !== oldValue){
			this.cb(newValue);
		}
	}
}

export default Watcher;