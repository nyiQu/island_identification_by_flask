		function createWaveCanvas(id, rangeColor, textColor, value){
 		  var valueNum = value;//百分比
		  var canvas = document.getElementById(id);
		  var ctx = canvas.getContext('2d');
		  //var range = document.getElementById('r');

		  //range控件信息
		  var rangeValue = valueNum;
		  var nowRange = 0; //用于做一个临时的range

		  //画布属性
		  var mW = canvas.width = 200;
		  var mH = canvas.height = 200;
		  var lineWidth = 2;

		  //圆属性
		  var r = mH / 2; //圆心
		  var cR = r - 16 * lineWidth; //圆半径

		  //Sin 曲线属性
		  var sX = 0;
		  var sY = mH / 2;
		  var axisLength = mW; //轴长
		  var waveWidth = 0.005 ; //波浪宽度,数越小越宽
		  var waveHeight = 3; //波浪高度,数越大越高
		  var speed = 0.05; //波浪速度，数越大速度越快
		  var xOffset = 0; //波浪x偏移量

		  ctx.lineWidth = lineWidth;

		  //画圈函数
		  var IsdrawCircled = false;
		  var drawCircle = function(){

		   ctx.beginPath();
		   ctx.strokeStyle = rangeColor;
		   ctx.arc(r, r, cR+5, 0, 2 * Math.PI);
		   ctx.stroke();
		   ctx.beginPath();
		   ctx.arc(r, r, cR, 0, 2 * Math.PI);
		   ctx.clip();

		  }

		  //画sin 曲线函数
		  var drawSin = function(xOffset){
		   ctx.save();

		   var points=[]; //用于存放绘制Sin曲线的点

		   ctx.beginPath();
		   //在整个轴长上取点
		   for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
		    //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
		    var y = -Math.sin((sX + x) * waveWidth + xOffset);

		    var dY = mH * (1 - nowRange / 100 );

		    points.push([x, dY + y * waveHeight]);
		    ctx.lineTo(x, dY + y * waveHeight);
		   }

		   //封闭路径
		   ctx.lineTo(axisLength, mH);
		   ctx.lineTo(sX, mH);
		   ctx.lineTo(points[0][0],points[0][1]);
		   ctx.fillStyle = rangeColor;
		   ctx.fill();

		   ctx.restore();
		  };

		  //写百分比文本函数
		  var drawText = function(){
		   ctx.save();

		   var size = 0.4*cR;
		   ctx.font = size + 'px Microsoft Yahei';
		   ctx.textAlign = 'center';
		   ctx.fillStyle = textColor;
		   ctx.fillText(~~nowRange + '%', r, r + size / 2);

		   ctx.restore();
		  };

		  var render = function(){
		   ctx.clearRect(0, 0, mW, mH);

		   rangeValue = valueNum;

		   if(IsdrawCircled == false){
		    drawCircle();
		   }

		   if(nowRange <= rangeValue){
		    var tmp = 1;
		    nowRange += tmp;
		   }

		   if(nowRange > rangeValue){
		    var tmp = 1;
		    nowRange -= tmp;
		   }

		   drawSin(xOffset);
		   drawText();

		   xOffset += speed;
		   requestAnimationFrame(render);
		  }

		  render();
 	}
 	    //水波纹canvas进度条，使用时，函数与<canvas>同时创建(后发现echarts也可以，遂废弃)

        function createWaveCharts(id,title,rangeColor, value){
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                title : {
                    text: title,
                    textStyle:{ //设置主标题风格
                        fontSize: 16,
                        fontWeight: 'normal',
                    },
                    padding: 0,
                    x:'center'
                },
                series: [{
                    type: 'liquidFill',
                    radius: '70%',
                    amplitude:'5%',
                    data: [{
                        value: value,
                        itemStyle: {
                            color: rangeColor,
                        }
                    }],
                    outline: {
                        show: true , //是否显示轮廓 布尔值
                        borderDistance: 5, //外部轮廓与图表的距离 数字
                        itemStyle:{
                            borderColor:rangeColor, //边框的颜色
                            borderWidth: 10,  //边框的宽度
                            shadowBlur: 3 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                            shadowColor: '#fff' //外部轮廓的阴影颜色
                        }
                    },
                    backgroundStyle: {
                        color:'rgba(255,255,255,0.1)',//图表的背景颜色
                        borderWidth: '0',//图表的边框宽度
                        borderColor: rangeColor,//图表的边框颜色
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: rangeColor,
                                fontSize: 40
                            }
                        }
                    },
                    emphasis: {
                        itemStyle: {     //悬停样式
                            opacity: 0.9
                        }
                    }

                }]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
        }
        //水波图echarts画法，好用！

		function initColumnChart(id,title,xname,xdata,yname,ydata,sname,startValue) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        left: 'right',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: startValue
                    }, {
                        type: 'inside'
                    }],
                    grid: {
                        left: '3%',
                        right: '2%',
                        bottom: '10%',
                        top:'15%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            name: xname,
                            type : 'category',
                            nameGap:25,
                            nameLocation:"center",
                            data : xdata,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name: yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            min:0,
                            max:100
                        }
                    ],
                    legend: {
                            show:true,
                            name:sname,
                            padding: 30,
                            x:'left'
                    },
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16,
                            }
                        },
                    series : [
                        {
                            name:sname,
                            type:'bar',
                            barWidth: '60%',
                            data:ydata,
                            itemStyle:{//
                                  normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#C8EBFA'},
                                                {offset: 0.5, color: '#94D8F6'},
                                                {offset: 1, color: '#00B0F0'}
                                            ]
                                        )
                                    },
                            },
                        }
                    ]
                    };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //单项柱形图
        function initColumnChartChangeDATA(id,title,xname,yname,data,sname) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        left: 'right',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: 0
                    }, {
                        type: 'inside'
                    }],
                    grid: {
                        left: '3%',
                        right: '2%',
                        bottom: '10%',
                        top:'15%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            name: xname,
                            type : 'category',
                            nameGap:25,
                            nameLocation:"center",
                            data : data.map(function (item) {
                                    return item[0];
                             }),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name: yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            min:0,
                            max:100
                        }
                    ],
                    legend: {
                            show:true,
                            name:sname,
                            padding: 30,
                            x:'left'
                    },
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16,
                            }
                        },
                    series : [
                        {
                            name:sname,
                            type:'bar',
                            barWidth: '60%',
                            data:data.map(function (item) {
                                    return item[1];
                             }),
                            itemStyle:{//
                                  normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#C8EBFA'},
                                                {offset: 0.5, color: '#94D8F6'},
                                                {offset: 1, color: '#00B0F0'}
                                            ]
                                        )
                                    },
                            },
                        }
                    ]
                    };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }

        function initPieChart(id,title,legend,sname,sdata) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                        text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        padding: 30,
                        data: legend
                    },
                    series : [
                        {
                            name: sname,
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:sdata,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                    };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //饼图

        function initMultiColumnChart(id,title,xname,xdata,ydata,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    dataZoom: [{
                            type: 'slider',
                            yAxisIndex:[0],
                            left:'5%'
                        }],
                    legend: {
                        padding: 30,
                        data: xdata
                    },
                    grid: {
                        left: '3%',
                        right: '2%',
                        bottom: '10%',
                        top:'15%',
                        containLabel: true
                    },
                    xAxis:  {
                        name: xname,
                        nameGap:25,
                        nameLocation:"center",
                        type: 'value',
                        min:0,
                        max:100
                    },
                    yAxis: {
                        type: 'category',
                        data: ydata
                    },
                    series: [
                        {
                            name: xdata[0],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[0]
                        },
                        {
                            name: xdata[1],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[1]
                        },
                        {
                            name: xdata[2],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[2]
                        },
                        {
                            name: xdata[3],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[3]
                        },
                        {
                            name: xdata[4],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[4]
                        }
                    ]
                    };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //横向多项复合条形图

        function initMultiColumnNoDatazoomChart(id,title,xname,xdata,ydata,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    /*dataZoom: [{
                            type: 'slider',
                            yAxisIndex:[0],
                            left:'5%'
                        }],*/
                    legend: {
                        padding: 30,
                        data: xdata
                    },
                    grid: {
                        left: '3%',
                        right: '2%',
                        bottom: '5%',
                        top:'15%',
                        containLabel: true
                    },
                    xAxis:  {
                        name: xname,
                        nameGap:25,
                        nameLocation:"center",
                        type: 'value',
                        min:0,
                        max:100
                    },
                    yAxis: {
                        type: 'category',
                        data: ydata
                    },
                    series: [
                        {
                            name: xdata[0],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[0]
                        },
                        {
                            name: xdata[1],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[1]
                        },
                        {
                            name: xdata[2],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[2]
                        },
                        {
                            name: xdata[3],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[3]
                        },
                        {
                            name: xdata[4],
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: data[4]
                        }
                    ]
                    };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //横向多项复合条形图

        function initRaderChart(id,title,xdata,indicator,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    legend: {
                        padding: 25,
                        data: xdata
                    },
                    radar: {
                        // shape: 'circle',
                        radius: 100,
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                           }
                        },
                        indicator: indicator
                    },
                    series: [{
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : data
                    }]
                    };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //雷达图

        function initLineChart(id,title,xname,xdata,ydata,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        padding:30,
                        data:ydata
                    },
                    dataZoom: [{
                        startValue: 0
                    }, {
                        type: 'inside'
                    }],
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '3%',
                        bottom: '10%',
                        top:"20%",
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : xdata
                        }
                    ],
                    yAxis : [
                        {
                            name: xname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            min:0,
                            max:100
                        }
                    ],
                    series : [
                        {
                            name:ydata[0],
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:data[0]
                        },
                        {
                            name:ydata[1],
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:data[1]
                        },
                        {
                            name:ydata[2],
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:data[2]
                        },
                        {
                            name:ydata[3],
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:data[3]
                        },
                        {
                            name:ydata[4],
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            data:data[4]
                        }]
                            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //多色折线图

        function initLineNoColorChart(id,title,xname,yname,xdata,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top:'10%',
                        data:xdata
                    },
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '10%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:xname
                    },
                    yAxis: {
                        name: yname,
                        nameGap:30,
                        nameLocation:"center",
                        type: 'value'
                    },
                    series: [
                        {
                            name:xdata[0],
                            type:'line',
                            data:data[0]
                        },
                        {
                            name:xdata[1],
                            type:'line',
                            data:data[1]
                        },
                        {
                            name:xdata[2],
                            type:'line',
                            data:data[2]
                        },
                        {
                            name:xdata[3],
                            type:'line',
                            data:data[3]
                        }
                    ]
                            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //堆叠折线图

        function initTimeMultiColumnChart(id,title,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    legend: {
                        padding:30
                    },
                    tooltip: {},
                    toolbox: {
                        left: 'right',
                        feature: {
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    dataset: {
                        source: data
                    },
                    grid: {
                        left: '5%',
                        right: '1%',
                        bottom: '10%',
                        top:"20%",
                        containLabel: true
                    },
                    dataZoom: [{
                               startValue: '2015',
                            }, {
                               type: 'inside'
                            }],
                    xAxis: {type: 'category'},
                    yAxis: {
                            name: yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            max:100
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //竖向多项柱形图

        function initBoxChart(id,title,xdata,yname,data) {
            var setboxdData = echarts.dataTool.prepareBoxplotData(data)

            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '10%',
                        right: '1%',
                        bottom: '15%',
                        top:'10%'
                    },
                    xAxis: {
                        type: 'category',
                        data: xdata,
                        nameGap: 30,
                        axisLabel: {
                            formatter: '{value}'
                        },
                    },
                    yAxis: {
                        type: 'value',
                        name: yname,
                        nameGap:30,
                        nameLocation:"center",
                        splitArea: {
                            show: true
                        }
                    },
                    series: [
                        {
                            name: 'boxplot',
                            type: 'boxplot',
                            data: setboxdData.boxData,
                            tooltip: {
                                formatter: function (param) {
                                    return [
                                        param.name + ': ',
                                        '最大值: ' + param.data[5],
                                        '上四分位数: ' + param.data[4],
                                        '中位数: ' + param.data[3],
                                        '下四分位数: ' + param.data[2],
                                        '最小值: ' + param.data[1]
                                    ].join('<br/>');
                                }
                            }
                        },
                        {
                            name: '异常点',
                            type: 'scatter',
                            data: setboxdData.outliers
                        }
                    ]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //箱式图

        function initPointsChart(id,title,xname,yname,data,RR,lineStart,lineEnd,color) {

            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    color:color,
                    grid: [
                        {
                            left: '5%',
                            right: '3%',
                            bottom: '10%',
                            top:"10%",
                            containLabel: true
                        }
                    ],
                    tooltip: {
                        formatter: '({c})'
                    },
                    xAxis: [
                        {
                            gridIndex: 0,
                            name: xname,
                            nameGap:30,
                            nameLocation:"center",
                            }
                    ],
                    yAxis: [
                        {
                            gridIndex: 0,
                            name: yname,
                            nameGap:30,
                            nameLocation:"center",
                        }
                    ],
                    series: [
                        {
                            name: 'I',
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: data,
                            markLine: {
                                animation: true,
                                label: {
                                    normal: {
                                        formatter: 'R²='+RR,
                                        textStyle: {
                                            align: 'right'
                                        }
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        type: 'solid'
                                    }
                                },
                                data: [[{
                                    coord: lineStart,
                                    symbol: 'none',
                                }, {
                                    coord: lineEnd,
                                    symbol: 'none'
                                }]]
                            }
                         }
                    ]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //散点图

        function initMultiBoxChart(id,title,xdata,xname,yname,data) {

            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    legend: {
                        y: '10%',
                        data: xname
                    },
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '9%',
                        top: '20%',
                        right: '5%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: xdata,
                        boundaryGap: true,
                        nameGap: 40,
                        splitArea: {
                            show: true
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: yname,
                        nameGap:30,
                        nameLocation:"center"
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        },
                        {
                            show: true,
                            height: 20,
                            type: 'slider',
                            top: '90%',
                            xAxisIndex: [0],
                            start: 0,
                            end: 20
                        }
                    ],
                    series: [
                        {
                            name: xname[0],
                            type: 'boxplot',
                            data: data[0],
                            tooltip: {formatter: formatter}
                        },
                        {
                            name: xname[1],
                            type: 'boxplot',
                            data: data[1],
                            tooltip: {formatter: formatter}
                        },
                        {
                            name: xname[2],
                            type: 'boxplot',
                            data: data[2],
                            tooltip: {formatter: formatter}
                        },
                        {
                            name: xname[3],
                            type: 'boxplot',
                            data: data[3],
                            tooltip: {formatter: formatter}
                        },
                        {
                            name: xname[4],
                            type: 'boxplot',
                            data: data[4],
                            tooltip: {formatter: formatter}
                        }
                    ]
            };

            myChart.setOption(option,true);
      }
        function formatter(param) {
             return [
                    param.name + ': ',
                    '最大值: ' + param.data[1],
                    '上四分位数: ' + param.data[2],
                    '中位数: ' + param.data[3],
                    '下四分位数: ' + param.data[4],
                    '最小值: ' + param.data[5]
             ].join('<br/>')
         }
        //复合箱式图

        function initMultiColumnWithAverageChart(id,title,xdata,xname,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        top: '10%',
                        data:xname
                    },
                    dataZoom: [{
                            type: 'slider',
                            bottom:'0%'
                        }],
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                            left: '10%',
                            top: '25%',
                            right: '10%',
                            bottom: '15%'
                     },
                    /*dataZoom: [
                                {
                                    type: 'inside'
                                },
                                {
                                    show: true,
                                    height: 30,
                                    type: 'slider',
                                    top: '91%'
                                }
                            ],*/

                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : xdata
                        }
                    ],
                    yAxis : [
                        {
                            name:yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            min:0,
                            max:100
                        }
                    ],
                    series : [
                        {
                            name:xname[0],
                            type:'bar',
                            data:data[0],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[1],
                            type:'bar',
                            data:data[1],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[2],
                            type:'bar',
                            data:data[2],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[3],
                            type:'bar',
                            data:data[3],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[4],
                            type:'bar',
                            data:data[4],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[5],
                            type:'bar',
                            data:data[5],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[6],
                            type:'bar',
                            data:data[6],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[7],
                            type:'bar',
                            data:data[7],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        function initMultiColumnWithAverageChartNoDatazoom(id,title,xdata,xname,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        top: '10%',
                        data:xname
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                            left: '10%',
                            top: '25%',
                            right: '10%',
                            bottom: '10%'
                     },
                    /*dataZoom: [
                                {
                                    type: 'inside'
                                },
                                {
                                    show: true,
                                    height: 30,
                                    type: 'slider',
                                    top: '91%'
                                }
                            ],*/

                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : xdata
                        }
                    ],
                    yAxis : [
                        {
                            name:yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value',
                            min:0,
                            max:100
                        }
                    ],
                    series : [
                        {
                            name:xname[0],
                            type:'bar',
                            data:data[0],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[1],
                            type:'bar',
                            data:data[1],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[2],
                            type:'bar',
                            data:data[2],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[3],
                            type:'bar',
                            data:data[3],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[4],
                            type:'bar',
                            data:data[4],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[5],
                            type:'bar',
                            data:data[5],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[6],
                            type:'bar',
                            data:data[6],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[7],
                            type:'bar',
                            data:data[7],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //带平均线的复合柱形图

        function initMultiPointsChart(id,title,xdata,yname,ydata) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                title : {
                    text : title,
                    textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                    padding: 0,
                    x:'center'
                },
                legend: {
                    top: '10%',
                    data: xdata
                },
                xAxis: {
                    type:'category'
                },
                yAxis: {
                    type:'category',
                    data:yname
                },
                toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                dataZoom: [
                    {
                        bottom:'-1%',
                        show: true,
                        realtime: true,
                    },
                    {
                        type: 'inside',
                        realtime: true,
                    }
                ],
                grid: {
                            left: '5%',
                            top: '20%',
                            right: '5%',
                            bottom: '12%'
                     },
                series: [{
                    name: xdata[0],
                    data: ydata[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                }, {
                    name: xdata[1],
                    data: ydata[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                },{
                    name: xdata[2],
                    data: ydata[2],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                },
                {
                    name: xdata[3],
                    data: ydata[3],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                },
                {
                    name: xdata[4],
                    data: ydata[4],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                },
                {
                    name: xdata[5],
                    data: ydata[5],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                },
                {
                    name: xdata[6],
                    data: ydata[6],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                },
                {
                    name: xdata[7],
                    data: ydata[7],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.round(data[2]) / 2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[0]+'年'+param.data[3]+param.data[1]+'占比'+param.data[2]+'%';
                            },
                            position: 'top'
                        }
                    }
                }]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //气泡图

        function initTwoClomnChart(id,title,xdata,xname,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            option = {
                    title : {
                            text: title,
                            textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                            padding: 0,
                            x:'center'
                        },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        top: '10%',
                        data:xname
                    },
                    dataZoom: [{
                            type: 'slider',
                            bottom:'0%'
                        }],
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                            left: '10%',
                            top: '25%',
                            right: '10%',
                            bottom: '15%'
                     },
                    /*dataZoom: [
                                {
                                    type: 'inside'
                                },
                                {
                                    show: true,
                                    height: 30,
                                    type: 'slider',
                                    top: '91%'
                                }
                            ],*/

                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : xdata
                        }
                    ],
                    yAxis : [
                        {
                            name:yname,
                            nameGap:30,
                            nameLocation:"center",
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:xname[0],
                            type:'bar',
                            data:data[0],
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:xname[1],
                            type:'bar',
                            data:data[1],
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
            };

            myChart.setOption(option,true);
            window.onresize = myChart.resize;
      }
        //双元素对比条形图

        function initSingleLineChart(id,title,xname,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            myChart.setOption(option = {
                title : {
                    text : title,
                    textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                    padding: 0,
                    x:'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: data.map(function (item) {
                        return item[0];
                    })
                },
                yAxis: {
                    name:yname,
                    nameGap:40,
                    nameLocation:"center"
                },
                toolbox: {
                    left: 'right',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: '2018春',
                }, {
                    type: 'inside'
                }],

                series: {
                    name: xname,
                    type: 'line',
                    data: data.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 200
                        }, {
                            yAxis: 300
                        }]
                    }
                }
            });
      }
        //单色折线图

        function initRadialChart(id,title,legend,xname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            myChart.setOption(option = {
                title : {
                    text : title,
                    textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                    padding: 0,
                    x:'center'
                },
                angleAxis: {
                    type: 'category',
                    data: xname,
                    z: 10
                },
                radiusAxis: {
                },
                polar: {
                },
                dataZoom: [
                        {
                            show: true,
                            start: 0
                        }
                    ],
                series: [{
                    type: 'bar',
                    data: data[0],
                    coordinateSystem: 'polar',
                    name: legend[0],
                    stack: 'a'
                }, {
                    type: 'bar',
                    data: data[1],
                    coordinateSystem: 'polar',
                    name: legend[1],
                    stack: 'a'
                }],
                legend: {
                    show: true,
                    top:'4%',
                    data: legend
                }
            });
      }
        //极坐标柱形图

        function initNormalLineChart(id,title,legend,xname,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            myChart.setOption(option = {
                title : {
                    text : title,
                    textStyle:{ //设置主标题风格
                                fontSize: 16,
                                fontWeight: 'normal',
                            },
                    padding: 0,
                    x:'center'
                },
                tooltip: {
                    trigger: 'axis'
                },

                legend: {
                    top: '6%',
                    data:legend
                },
                grid: {
                            left: '10%',
                            top: '25%',
                            right: '10%',
                            bottom: '15%'
                     },
                dataZoom: [{
                    startValue: '2018春',
                }, {
                    type: 'inside'
                }],
                toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xname
                },
                yAxis: {
                    name: yname,
                    nameGap:50,
                    nameLocation:"center",
                    type : 'value'
                },
                series: [
                    {
                        name:legend[0],
                        type:'line',
                        stack: '总量',
                        data:data[0]
                    },
                    {
                        name:legend[1],
                        type:'line',
                        stack: '总量',
                        data:data[1]
                    },
                    {
                        name:legend[2],
                        type:'line',
                        stack: '总量',
                        data:data[2]
                    },
                    {
                        name:legend[3],
                        type:'line',
                        stack: '总量',
                        data:data[3]
                    },
                    {
                        name:legend[4],
                        type:'line',
                        stack: '总量',
                        data:data[4]
                    },
                    {
                        name:legend[5],
                        type:'line',
                        stack: '总量',
                        data:data[5]
                    },
                    {
                        name:legend[6],
                        type:'line',
                        stack: '总量',
                        data:data[6]
                    },
                    {
                        name:legend[7],
                        type:'line',
                        stack: '总量',
                        data:data[7]
                    }
                ]
            });
      }
        //堆积型折线图

        //------------------------运行统计用表---------------------------------------//
        function initProcessLineChart(id,title,xname,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();
            myChart.setOption(option = {
                title : {
                    text : title,
                    textStyle:{
                        fontSize:20,
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: data.map(function (item) {
                        return item[0];
                    })
                },
                yAxis: {
                    name:yname,
                    nameGap:40,
                    nameLocation:"center"
                },
                toolbox: {
                    left: 'right',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: '',
                }, {
                    type: 'inside'
                }],

                series: {
                    name: xname,
                    type: 'line',
                    data: data.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 200
                        }, {
                            yAxis: 300
                        }]
                    }
                }
            });
      }
        //折线图

        function initProcessMultiLineChart(id,text,legend,data) {//pH、溶解氧、COD、氨氮、TP、电导率、浊度
            let myChart = echarts.init(document.getElementById(id),'light');
            myChart.clear();
                myChart.setOption(option = {
                    title: {
                        text: text,
                        textStyle:{
                            fontSize:20
                        }
                    },
                     tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                //color: ['#87CEFF','#00FFFF','#00BFFF','#00C5CD','#1E90FF','#7AC5CD','#4169E1','#6C7B8B','#0000FF'],

                legend: {
                    data:legend,
                    width:800,
                    height:50
                },
                toolbox: {
                        left: 'right',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data :data.map(function (item) {
                            return item[0];
                        })
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [//pH、溶解氧、COD、氨氮、TP、电导率、浊度
                    {
                        name:legend[0],
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:data.map(function (item) {
                            return item[1];
                        })
                    },
                    {
                        name:legend[1],
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:data.map(function (item) {
                            return item[2];
                        })
                    },
                    {
                        name:legend[2],
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:data.map(function (item) {
                            return item[3];
                        })
                    },
                    {
                        name:legend[3],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[4];
                        })
                    },
                    {
                        name:legend[4],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[5];
                        })
                    },
                    {
                        name:legend[5],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[6];
                        })
                    },
                    {
                        name:legend[6],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[7];
                        })
                    },
                    {
                        name:legend[7],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[8];
                        })
                    },
                    {
                        name:legend[8],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[9];
                        })
                    },
                    {
                        name:legend[9],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[10];
                        })
                    },
                    {
                        name:legend[10],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[11];
                        })
                    },
                    {
                        name:legend[11],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[12];
                        })
                    },
                    {
                        name:legend[12],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[13];
                        })
                    },
                    {
                        name:legend[13],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[14];
                        })
                    },
                    {
                        name:legend[14],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[15];
                        })
                    },
                    {
                        name:legend[15],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[16];
                        })
                    },
                    {
                        name:legend[16],
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[17];
                        })
                    }
                ],
                    dataZoom: [{
                        startValue: '',
                    },{
                        type: 'inside'
                    }]
                });
      }
      //折线图去掉面积
       function initProcessMultiLineWithOutAreaChart(id,text,legend,data) {
            let myChart = echarts.init(document.getElementById(id),'light');
            myChart.clear();
                myChart.setOption(option = {
                    title: {
                        text: text,
                        textStyle:{
                            fontSize:20
                        }
                    },
                     tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter: function (params, ticket, callback) {
                        console.log(params)
                        tip = params[0].name + '<br>'
                        params.forEach(function(p){
                            status = ''
                            if(p.data==1){
                                status = '运行'
                            }
                            if(p.data==2){
                                status = '停机'
                            }
                            if(p.data==3){
                                status = '离线'
                            }
                            tip += p.marker + p.seriesName+':'+p.data+' '+status+'<br>'
                        })
                        
                        return tip;
                    }
                },

                legend: {
                    data:legend,
                    width:800,
                    height:50
                },
                toolbox: {
                        left: 'right',
                        feature: {
                            
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data :data.map(function (item) {
                            return item[0];
                        })
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:legend[0],
                        type:'line',
                        data:data.map(function (item) {
                            return item[1];
                        })
                    },
                    {
                        name:legend[1],
                        type:'line',
                        data:data.map(function (item) {
                            return item[2];
                        })
                    },
                    {
                        name:legend[2],
                        type:'line',
                        data:data.map(function (item) {
                            return item[3];
                        })
                    },
                    {
                        name:legend[3],
                        type:'line',
                        data:data.map(function (item) {
                            return item[4];
                        })
                    },
                    {
                        name:legend[4],
                        type:'line',
                        data:data.map(function (item) {
                            return item[5];
                        })
                    },
                    {
                        name:legend[5],
                        type:'line',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[6];
                        })
                    },
                    {
                        name:legend[6],
                        type:'line',
                        data:data.map(function (item) {
                            return item[7];
                        })
                    },
                    {
                        name:legend[7],
                        type:'line',
                        stack: '总量',
                        data:data.map(function (item) {
                            return item[8];
                        })
                    },
                    {
                        name:legend[8],
                        type:'line',
                        data:data.map(function (item) {
                            return item[9];
                        })
                    },
                    {
                        name:legend[9],
                        type:'line',
                        stack: '总量',
                        data:data.map(function (item) {
                            return item[10];
                        })
                    },
                    {
                        name:legend[10],
                        type:'line',
                        data:data.map(function (item) {
                            return item[11];
                        })
                    },
                    {
                        name:legend[11],
                        type:'line',
                        data:data.map(function (item) {
                            return item[12];
                        })
                    },
                    {
                        name:legend[12],
                        type:'line',
                        data:data.map(function (item) {
                            return item[13];
                        })
                    },
                    {
                        name:legend[13],
                        type:'line',
                        data:data.map(function (item) {
                            return item[14];
                        })
                    },
                    {
                        name:legend[14],
                        type:'line',
                        data:data.map(function (item) {
                            return item[15];
                        })
                    },
                    {
                        name:legend[15],
                        type:'line',
                        areaStyle: {normal: {}},
                        data:data.map(function (item) {
                            return item[16];
                        })
                    },
                    {
                        name:legend[16],
                        type:'line',
                        data:data.map(function (item) {
                            return item[17];
                        })
                    }
                ],
                    dataZoom: [{
                        startValue: '',
                    },{
                        type: 'inside'
                    }]
                });
      }

        //复合式折线图

        function initLineAndRectagleChart(id,title,legend,unit,max1,max2,data) {
            let myChart = echarts.init(document.getElementById(id));
            myChart.clear();
            myChart.setOption(option = {
                title: {
                    text: title,//用电量-处理水量关系趋势
                    textStyle: {
                        fontSize: 20
                    }
                },
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
                color:['#0000EE',"#3c99f5"],
                legend: {
                    data:legend//['用电量', '水量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: {
                    show: false,
                    start: 0,
                    end: 100
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data:  data.map(function (item) {
                                return item[0];
                      })
                    },
                    {
                        type: 'category',
                        show: false,
                        boundaryGap: true,
                        data: data.map(function (item) {
                                return item[0];
                      })
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: unit[0],//'用电量(kWh)'
                        max: max1,//30,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: unit[1],//'水量(吨)',
                        max: max2,//1200,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name:legend[0],
                        type:'line',
                        data:data.map(function (item) {
                                return item[1];
                      })
                    },
                    {
                        name:legend[1],
                        type:'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data:data.map(function (item) {
                                return item[2];
                      })
                    }
                ]
            })
        }
        //柱形和折线复合图

        function initBlueFiveColomnChart(id,title,legend,yname,data) {
            let myChart = echarts.init(document.getElementById(id));
            myChart.clear();


            option = {
                 title : {
                    text: title,
                    subtext: '',
                    x:'left'
                    },
                     toolbox: {
                         // y: 'bottom',
                         feature: {
                             dataView: {},
                             saveAsImage: {
                                 pixelRatio: 2
                             }
                         },
                         right:"40px"
                     },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color: ['#60acfc','#32d3eb','#5bc49f','#feb64d','#ff7c7c'],
                legend: {
                    data:legend
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : data.map(function (item) {
                                    return item[0];
                             })
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:yname,
                        nameGap:40,
                        nameLocation:"center"
                    }
                ],
                series : [
                    {
                        name:legend[0],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[1];
                             })
                    },
                    {
                        name:legend[1],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[2];
                             })
                    },
                    {
                        name:legend[2],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[3];
                             })
                    },
                    {
                        name:legend[3],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[4];
                             })
                    },
                    {
                        name:legend[4],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[5];
                             })

                    }
                ]
            };


            myChart.setOption(option,true);
      }
        //五相对比柱形图

        function initBlueFiveColomnChart10(id,title,legend,yname,data) {
            let myChart = echarts.init(document.getElementById(id), 'light');
            myChart.clear();


            option = {
                 title : {
                    text: title,
                    subtext: '',
                    x:'left'
                    },
                     toolbox: {
                         // y: 'bottom',
                         feature: {
                             dataView: {},
                             saveAsImage: {
                                 pixelRatio: 2
                             }
                         },
                         right:"40px"
                     },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                //color: ['#60acfc','#32d3eb','#5bc49f','#feb64d','#ff7c7c'],
                legend: {
                    data:legend,
                    width:700,
                    height:50
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : data.map(function (item) {
                                    return item[0];
                             })
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:yname,
                        nameGap:40,
                        nameLocation:"center"
                    }
                ],
                series : [
                    {
                        name:legend[0],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[1];
                             })
                    },
                    {
                        name:legend[1],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[2];
                             })
                    },
                    {
                        name:legend[2],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[3];
                             })
                    },
                    {
                        name:legend[3],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[4];
                             })
                    },
                    {
                        name:legend[4],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[5];
                             })

                    },
                    {
                        name:legend[5],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[6];
                             })
                    },
                    {
                        name:legend[6],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[7];
                             })
                    },
                    {
                        name:legend[7],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[8];
                             })
                    },
                    {
                        name:legend[8],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[9];
                             })

                    },
                    {
                        name:legend[9],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[10];
                             })
                    },
                    {
                        name:legend[10],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[11];
                             })
                    },
                    {
                        name:legend[11],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[12];
                             })
                    },
                    {
                        name:legend[12],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[13];
                             })

                    },
                    {
                        name:legend[13],
                        type:'bar',
                        data:data.map(function (item) {
                                    return item[14];
                             })
                    }
                ]
            };


            myChart.setOption(option,true);
      }
        //10相对比柱形图