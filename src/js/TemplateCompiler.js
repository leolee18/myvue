import Watcher from "./Watcher.js";
class TemplateCompiler{
	// el 视图线索
	// vm 全局对象
	constructor(el,vm) {
		//缓存重要属性
		this.el = this.isElementNode(el)?el:document.querySelector(el);
		this.vm = vm;
		
		if(this.el){
			//把模板放入内存
			var fragment = this.nodeTofragment(this.el);
			//解析模板
			this.compile(fragment);
			//把内存的结果，返回页面
			this.el.appendChild(fragment);
		}
	}
	////////////////////工具方法//////////////////////////////
	isElementNode(node){
		return node.nodeType === 1;
	}
	isTextNode(node){
		return node.nodeType === 3;
	}
	toArray(fakeArr){
		return [].slice.call(fakeArr);
	}
	isDirective(attrName){
		return attrName.indexOf('v-') >=0;
	}
	////////////////////////////////////////////
	
	
	/////////////////核心方法////////////////////////
	nodeTofragment(node,flag){
		var fragment = flag || document.createDocumentFragment(),child;
		
		while(child = node.firstChild){
			if(child.firstChild){
				var chFrag = this.nodeTofragment(child);
				child.appendChild(chFrag);
			}
			fragment.appendChild(child);
		}
		return fragment;
	}
	compile(parent){
		var childNodes = parent.childNodes,complier = this;
		
		this.toArray(childNodes).forEach((node)=>{
			if(complier.isElementNode(node)){
				if(node.childNodes.length >0){
					complier.compile(node);
				}
				complier.compileElement(node);
			}else{
				var textReg = /\{\{(.+?)\}\}/g;
				var expr = node.textContent;
				if(textReg.test(expr)){
					expr = RegExp.$1;
					complier.compileText(node,expr);
				}
			}
		});
	}
	compileElement(node){
		var arrs = node.attributes,complier = this;
		
		this.toArray(arrs).forEach(attr=>{
			var attrName = attr.name;
			if(complier.isDirective(attrName)){
				var type = attrName.substr(2);
				var expr = attr.value;
				
				CompilerUtils[type](node,complier.vm,expr);
			}
		});
	}
	compileText(node,expr){
		CompilerUtils.text(node,this.vm,expr);
	}
	////////////////////////////////////////
}

var CompilerUtils = {
	text(node,vm,expr){
		//第一次发布
		var updaterFun = this.updater['textUpdater'];
		updaterFun && updaterFun(node,vm.$data[expr]);
		//第n+1次  订阅者
		new Watcher(vm,expr,(newValue)=>{
			updaterFun && updaterFun(node,newValue);
		});
	},
	model(node,vm,expr){
		var updaterFun = this.updater['modelUpdater'];
		updaterFun && updaterFun(node,vm.$data[expr]);
		
		new Watcher(vm,expr,(newValue)=>{
			updaterFun && updaterFun(node,newValue);
		});
		
		node.addEventListener('input',(e)=>{
			var newValue = e.target.value;
			vm.$data[expr] = newValue;
		})
	},
	updater:{
		textUpdater(node,value){
			node.textContent = value;
		},
		modelUpdater(node,value){
			node.value = value;
		}
	}
}

export default TemplateCompiler;