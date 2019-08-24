console.log('index.js!');

import "./base.css";

////////////////////////////////////////////////////
/* import mVue from "./mVue.js";
//使用mVue
var Demo = new mVue({
  el:'mvvm',
  data:{
    text:'HelloWorld',
    d:'123'
  }
})
var mButton = document.getElementById('mButton');
mButton.addEventListener('click',function(e){
	Demo.text = '我改变了，你看到了吗';
}) */
/////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////
import MinVue from "./js/MinVue.js";
var vm = new MinVue({
  el:'#mvvm',
  data:{
    text:'HelloWorld',
    d:'123'
  }
});

