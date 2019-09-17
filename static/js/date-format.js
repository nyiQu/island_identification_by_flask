Date.prototype.format = function(fmt) {
    let o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(let k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
    }
    return fmt;
};
 function filterDataChange(_self,result) {//表格数据载入方法
     console.log('ajax done', result);
     let data = result.result;
     _self.loading = false;
     _self.tableDataBegin = data;
     console.log("123", _self.tableDataBegin);
     _self.totalItems = result.data_num;
     if (_self.totalItems > _self.pageSize) {
         for (let index = 0; index < _self.pageSize; index++) {
             _self.tableDataEnd.push(_self.tableDataBegin[index]);
         }
         } else {
         _self.tableDataEnd = _self.tableDataBegin;
         }
 }