module.exports=
{
    setArr:function (arr) 
    {
    var obj = {};
    var len = arr.length;
    var maxItem = {
        key: '',
        count: 0,
        newArr: []
    };
    var newArr = maxItem.newArr;

    for (var i = 0; i < len; i++) {
        if (!obj[arr[i]]) {
            newArr.push(arr[i]);
            obj[arr[i]] = 1;
        } else {
            obj[arr[i]]++;
        }
        if (obj[arr[i]] > maxItem.count) {
            maxItem.count = obj[arr[i]];
            maxItem.key = arr[i];
        }
    }


    return maxItem;
},
response:function (aim,context,issue_url,tagstring)
{
  if(aim.toLowerCase().includes("mast"))
  context.github.issues.createComment(context.issue({body:"The issue was commented most frequently："+issue_url}));
if(aim.toLowerCase().includes("new release"))
  context.github.issues.createComment(context.issue({body:"This week published :"+tagstring}));
},
GetDateStr:function (AddDayCount) {     
  var dd = new Date();    
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
  var y = dd.getFullYear();     
  var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0    
  var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0    
  return y+"-"+m+"-"+d;     
}    
,
TsfTime:function (str)
{
  let value=str.split('T')
  value=value.splice(1,1)
  let string=value.toString()
  value=string.split('-')
  value.forEach(element=>{
    element=parseInt(element)
  })
  return value
},
ConTime:function (va1,va2)
{
    for(let i=0;i<va1.length;i++)
    {
      if(va1[i]>va2[i])
        return 1
      if(va1[i]<va2[i])
        return 0
    }
    return 1
}
}
/*Array.prototype.max = function () {
    return Math.max.apply({}, this);
};*/

