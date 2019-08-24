import TemplateCompiler from "./TemplateCompiler.js";
import Observer from "./Observer.js";
//创建一个MVVM框架类
class MinVue{
	constructor(options) {
		//缓存重要属性
	    this.$vm = this;
		this.$el = options.el;
		this.$data = options.data;
		
		//判断视图
		if(this.$el){
			//添加属性观察对象
			new Observer(this.$data);
			
			//创建模板编译器
			this.$compiler = new TemplateCompiler(this.$el,this.$vm);
		}
		
	}
}

export default MinVue;