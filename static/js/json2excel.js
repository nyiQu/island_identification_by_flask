/**
 * Created by llyod on 2019-01-10.
 */

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function downloadExl(data, fileName, tableHeader,keys) {

    // var keys = Object.keys(data[0]);
    var keys = keys;
//        console.log("keys",keys)
    var firstRow =tableHeader;
//        keys.forEach(function (item) {
//            firstRow[item] = item;
//        });
    console.log("firstRow",firstRow)
    data.unshift(firstRow);

    var content = {};

    // 把json格式的数据转为excel的行列形式
    var sheetsData = data.map(function (item, rowIndex) {
        return keys.map(function (key, columnIndex) {
            return Object.assign({}, {
                value: key.includes("date")&&rowIndex!=0?(new Date(item[key])).Format('yyyy-MM-dd hh:mm:ss'):item[key],
                position: (columnIndex > 25 ? getCharCol(columnIndex) : String.fromCharCode(65 + columnIndex)) + (rowIndex + 1),
            });
        });
    }).reduce(function (prev, next) {
        return prev.concat(next);
    });

    sheetsData.forEach(function (item, index) {
        content[item.position] = { v: item.value };
    });

    //设置区域,比如表格从A1到D10,SheetNames:标题，
    var coordinate = Object.keys(content);
    var workBook = {
        SheetNames: ["Sheet1"],
        Sheets: {
            "Sheet1": Object.assign({}, content, { "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1] }),
        }
    };
    //这里的数据是用来定义导出的格式类型
    var excelData = XLSX.write(workBook, { bookType: "xlsx", bookSST: false, type: "binary" });
    var blob = new Blob([string2ArrayBuffer(excelData)], { type: "" });
    saveAs(blob, fileName+new Date().toLocaleDateString()+".xlsx");
}
//字符串转字符流
function string2ArrayBuffer(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    var temCol = "",
        s = "",
        m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}

function dataChange(_self,data) {//表格数据载入方法
                 console.log('ajax done', data);
                 _self.loading = false;
                 _self.tableDataBegin = data;
                 _self.pageSizeArray = [20,30,50,data.length];
                 //_self.pageSizeArray.push(data.length)
                 console.log("123", _self.tableDataBegin);
                 _self.totalItems = _self.tableDataBegin.length;
                 if (_self.totalItems > _self.pageSize) {
                     for (let index = 0; index < _self.pageSize; index++) {
                         _self.tableDataEnd.push(_self.tableDataBegin[index]);
                     }
                 } else {
                     _self.tableDataEnd = _self.tableDataBegin;
                 }
         }