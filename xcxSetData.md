#1. 小程序setData总结
```
Page({
  data: {
    str:'aaa',
    mobj:null,
    array: [{ text: 'init data1' }, { text: 'init data2' }, { text: 'init data3' }]

  },
  onLoad: function (options) {
    this.setData({ 'str':'bbb'});
    this.setData({['str']:'ccc'});

    let mStrs = 'mobj.name';
    this.setData({ 'mobj.name': 'leo' });
    this.setData({ ['mobj.name']: 'leo22' });
    this.setData({ [mStrs]: 'leo333' });

    this.setData({'array[0].text': 'changed data'});

    let index = 1;
    let mArr = "array["+index+"].text";
    this.setData({ [mArr]: 'dddd'});

    index = 2;
    let mArr2 = "array[" + index +"]";
    this.setData({ [mArr2]: {text:'cccc'} });

  }
})
```
