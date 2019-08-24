import Dep from "./Dep.js";
class Observer{
	constructor(data) {
	    //属性分析和劫持
		this.observe(data);
	}
	observe(data){
		if(!data || typeof data !== 'object')rturn;
		var keys = Object.keys(data);
		
		keys.forEach((key)=>{
			this.defineReactive(data,key,data[key]);
		});
	}
	defineReactive(obj,key,val){
		var dep = new Dep();
		//重新定义属性 1〉目标对象 2〉属性名 3〉属性配置
		Object.defineProperty(obj,key,{
			enumerable:true,//是否可便利
			configurable:false,//是否可重新配置
			get(){
				//watcher创建时，发布订阅的添加
				Dep.target && dep.addSub(Dep.target);
				
				return val;
			},
			set(newValue){
				val = newValue;
				dep.notify();
			}
		})
	}
}

export default Observer;