//日期变量，日期最大值
var maxDate = "2018年10月18日";

//指定初始选项
var pageTheme = "infographic";
var pageMap = "重庆全境";
var pageMetrics = "当前余额";
var Mapview = 1;
var curBizType = "资产规模";
var curBizSel = "";
var countySel = "";


//控制图表标题
var financeTitle = null;
var mapTitle = null;
var metricsTitle = null;

var refreshRightFlag = 1;

if (countySel == "") {
    mapTitle = pageMap;
} else {
    mapTitle = countySel;
}

if (curBizSel == "") {
    financeTitle = curBizType;
} else {
    financeTitle = curBizSel;
}

metricsTitle = pageMetrics;

var mapStatChart = null;
var gaugeChart = null;
var mainTSChart = null;
var grpTSChart = null;
var grpBarChart = null;

var bizTreeOpt = null;
var mapStatOpt = null;
var branchRankOpt = null;
var gaugeOpt = null;
var mainTSOpt = null;
var grpTSOpt = null;
var grpBarOpt = null;

var bizTreeDataOpt = null;
var saveTreeDataOpt = null;
var loanTreeDataOpt = null;

var mapStatDataOpt = null;
var branchRankDataOpt = null;
var gaugeDataOpt = null;
var mainTSDataOpt = null;
var grpTSDataOpt = null;
var grpBarDataOpt = null;

var bizTreeThemeOpt = null;
var mapStatThemeOpt = null;
var branchRankThemeOpt = null;
var gaugeThemeOpt = null;
var mainTSThemeOpt = null;
var grpTSThemeOpt = null;
var grpBarThemeOpt = null;


document.getElementById(pageTheme).className = "a-selected";

//定义颜色变量

var deepColor = null;
var middleColor = null;
var lightColor = null;
var fouthColor = null;

var transColor = null;
var fontColor = null;
var bColor = null;



function sortBranch() {
    curMapData.sort(function (o1, o2) {
        if (isNaN(o1.value) || o1.value == null) return -1;
        if (isNaN(o2.value) || o2.value == null) return 1;
        return o1.value - o2.value;
    });
    countySorted = [];
    for (var i = 0; i < curMapData.length; i++) {
        countySorted.push(curMapData[i].name);
    }
}

function chartsInitialOpt() {
    //资产类型树的配置项
    bizTreeOpt = {
        title: {
            //            text: "▌" + mapTitle + financeTitle + metricsTitle,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                //                color: fontColor,
                fontFamily: 'Yahei'
            },
            subtext: "点选可查看该业务数据",
            left: "1%",
            top: "1%"
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                name: '科目结构',
                data: [],
                top: '2%',
                bottom: '2%',
                symbol: 'roundRect',
                symbolSize: 16,
                //                itemStyle: {
                //                    color: middleColor,
                //                    borderColor: middleColor
                //                },


                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left',
                        formatter: "{b} {c}",
                        textStyle: {
                            //                            color: fontColor,
                            fontSize: 14,
                            fontFamily: 'Yahei'

                        }
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },
                expandAndCollapse: false


            }
        ]
    };

    //分支行排名的配置项
    branchRankOpt = {
        title: {
            textStyle: {
                fontWeight: 'bold'
            },
            subtext: "点选横柱可查看对应分支行数据",
            left: "5%",
            top: "2%"
        },

        tooltip: {
            trigger: "item",
            axisPointer: {
                type: 'shadow'
            },
        },

        grid: {
            left: '5%',
            right: '5%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: true,
                interval: 0
            }
        },
        yAxis: {
            type: 'category',
            data: [],
            nameGap: 10,
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                interval: 0
            }
        },
        series: [
            {
                name: '分支行排名',
                type: 'bar',
                label: {
                    show: true,
                    position: "right"
                },
                selectedMode: "single",
                data: []

            }
        ]
    };

    //重庆热力图的配置项
    mapStatOpt = {
        title: {
            textStyle: {
                fontWeight: 'bold'
            },
            subtext: "点选地图上区县可查看该区县数据",
            left: "5%",
            top: "2%"
        },
        tooltip: {
            trigger: "item"
        },
        dataRange: {
            left: "4%",
            top: "center",
            text: ["高", "低"],
            calculable: true

        },
        toolbox: {
            show: true,
            orient: "vertical",
            left: "4%",
            bottom: "center",
            feature: {
                restore: {
                    show: true
                }

            }
        },
        grid: {
            top: 0,
            bottom: 0
        },
        series: [{
                type: "map",
                data: [],
                roam: true,
                mapValueCalculation: "sum",
                top: "15%",
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 10,
                                fontStyle: "normal",
                                align: "center",
                                baseline: "middle"
                            },
                            formatter: function (params) {
                                var shortnm = params.name.replace("支行", "");
                                shortnm = shortnm.replace("分行", "");
                                return shortnm;
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                selectedMode: "single",
                showLegendSymbol: false,
                hoverable: true
                }
                ]
    };


    // 刻度盘的配置项
    gaugeOpt = {

        title: {
            left: "left",
            top: '5%'
        },
        //刻度盘的数据已在盘中
        //    tooltip: {
        //        formatter: "{a} <br/>{b} : {c}%"
        //    },

        series: [
            {
                title: {
                    show: "true",
                    offsetCenter: ['-59%', '-162%'],
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 18
                    }
                },
                detail: {
                    formatter: '{value}',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 35
                    },
                    offsetCenter: [0, '90%']
                },
                center: ['50%', '60%'],
                name: '',
                type: 'gauge',
                radius: '65%',
                min: 0,
                max: 100,

                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 15,
                        shadowBlur: 0,

                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        width: 1
                    },
                    length: -5,
                    splitNumber: 10
                },
                splitLine: {
                    show: true,
                    length: -14,
                    lineStyle: {
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    distance: -20,
                    formatter: '{value}',
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                },

                pointer: {
                    show: true,
                    length: '90%',
                    width: '10'
                },

                data: []
            }
        ]
    };

    // 主要指标的趋势图的配置项
    mainTSOpt = {
        title: {
            left: "left",
            top: '5%'
        },
        grid: {
            top: '25%',
            right: '0%'
        },

        tooltip: {
            show: true,
            trigger: "axis",
            formatter: "{a}<br/>{b}  {c}",
            axisPointer: {
                type: 'cross'
            },
        },
        toolbox: {
            show: true,
            orient: 'horizontal',
            right: '0%',
            top: '5%',
            borderWidth: 0, // 工具箱边框线宽，单位px，默认为0（无边框）
            padding: 5, // 工具箱内边距，单位px，默认各方向内边距为5，
            showTitle: true,
            feature: {
                magicType: {
                    show: true,
                    title: {
                        line: '动态类型切换-折线图',
                        bar: '动态类型切换-柱形图'
                    },
                    type: ['line', 'bar']
                },
                restore: {
                    show: true,
                    title: '还原',
                    color: 'black'
                }
            }
        },

        dataZoom: { //数据区域缩放控件
            show: true, //是否显示数据区域缩放
            realtime: true, //缩放变化是否实时显示
            start: 70, //数据缩放，选择开始比例，默认为0（%）
            end: 100 //数据缩放，选择结束比例，默认为100（%）
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [],

                    }
                ],
        yAxis: [
            {
                type: 'value'
                    }
                ],
        series: [
            {
                type: 'line',
                symbol: "emptyCircle",
                symbolSize: 8,
                areaStyle: {
                    normal: {}
                },
                itemStyle: {
                    label: {
                        show: true
                    }
                },
                data: []
                    }

                ]
    };

    // 主要指标结构的趋势图的配置项
    grpTSOpt = {
        title: {
            left: "left",
            top: '5%'

        },
        grid: {
            top: '28%',
            right: '0%'
        },

        legend: {
            top: '16%'
        },

        tooltip: {
            show: true,
            trigger: "axis",
            formatter: "{a}<br/>{b}  {c}",
            axisPointer: {
                type: 'cross'
            },
        },
        toolbox: {
            show: true,
            orient: 'horizontal',
            right: '0%',
            top: '5%',
            borderWidth: 0, // 工具箱边框线宽，单位px，默认为0（无边框）
            padding: 5, // 工具箱内边距，单位px，默认各方向内边距为5，
            showTitle: true,
            feature: {
                magicType: {
                    show: true,
                    title: {
                        line: '动态类型切换-折线图',
                        bar: '动态类型切换-柱形图'
                    },
                    type: ['line', 'bar']
                },
                restore: {
                    show: true,
                    title: '还原'
                    //                  color: 'black'
                }
            }
        },

        dataZoom: { //数据区域缩放控件
            show: true, //是否显示数据区域缩放
            realtime: true, //缩放变化是否实时显示
            start: 70, //数据缩放，选择开始比例，默认为0（%）
            end: 100 //数据缩放，选择结束比例，默认为100（%）
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []

                    }
                ],
        yAxis: [
            {
                type: 'value',
                max: 40,
                min: 0,
                name: "亿元",
                axisLabel: {
                    formatter: '{value}'
                }
                    }
                ],
        series: []
    };

    // 主要指标结构的饼图的配置项

    grpBarOpt = {
        title: {
            textStyle: {
                fontWeight: 'bold'
            },
            left: "left",
            top: "5%"
        },

        tooltip: {
            trigger: "item",
            axisPointer: {
                type: 'shadow'
            },
        },

        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: true,
                interval: 0
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            nameGap: 10,
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                interval: 0
            }
        },
        series: [
            {
                name: '结构柱形图',
                type: 'bar',
                label: {
                    show: true,
                    position: "top"
                },
                selectedMode: "single",
                data: []

            }
        ]
    };


}

function chartsThemeOpt(theme) {

    if (theme == "shine") {
        $(".top-banner").css("background", "#5da1a4");
        $(".select-area").css("background-color", "#499094");
        $("#toggleMapView").css("color", "#333");
        $(".biz-panel").css("background-color", "#ebebeb");
        deepColor = "#499094";
        middleColor = "#b4ded4";
        lightColor = "#efe5a7";
        transColor = "rgba(73,144,148,0.25)";
        fontColor = "#333";
        bColor = "#f8f8f8";
    }
    if (theme == "dark") {
        $(".top-banner").css("background", "#3dacf3");
        $(".select-area").css("background-color", "#2294dd");
        $("#toggleMapView").css("color", "#fff");
        $(".biz-panel").css("background-color", "#444759");
        deepColor = "#0185d9";
        middleColor = "#50b7fa";
        lightColor = "#97d4fc";
        transColor = "rgba(34,148,221,0.25)";
        fontColor = "#f8f8f8";
        bColor = "#2f3243";
    }
    if (theme == "infographic") {
        $(".top-banner").css("background", "#b32c26");
        $(".select-area").css("background-color", "#ea8147");
        $("#toggleMapView").css("color", "#333");
        $(".biz-panel").css("background-color", "#ebebeb");
        deepColor = "#d95852";
        middleColor = "#ea8146";
        lightColor = "#ffb24a";
        transColor = "rgba(255,178,73,0.25)";
        fontColor = "#333";
        bColor = "#f8f8f8";
    }

    fouthColor = '#aaaaaa';

    document.body.style.backgroundColor = bColor;

    bizTreeThemeOpt = {
        title: {
            textStyle: {
                color: fontColor
            }
        },
        series: [
            {
                itemStyle: {
                    color: middleColor,
                    borderColor: middleColor
                },


                label: {
                    normal: {
                        textStyle: {
                            color: fontColor

                        }
                    }
                }
            }
        ]
    };

    branchRankThemeOpt = {
        title: {
            textStyle: {
                color: fontColor
            }
        },

        xAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: fontColor
                }
            }
        },
        yAxis: {
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            }
        },
        series: [
            {
                color: deepColor
            }
        ]
    };

    mapStatThemeOpt = {
        title: {
            textStyle: {
                color: fontColor
            }
        },
        tooltip: {
            backgroundColor: deepColor
        },
        dataRange: {
            color: [deepColor, lightColor]
        },
        visualMap: {
            inRange: {
                color: [lightColor, deepColor]
            }
        }
    };
    gaugeThemeOpt = {

        title: {
            textStyle: {
                color: fontColor
            }
        },

        series: [
            {
                title: {
                    textStyle: {
                        color: fontColor
                    }
                },
                detail: {
                    textStyle: {
                        color: fontColor
                    }
                },

                axisLine: {
                    lineStyle: {
                        color: [[0.3, lightColor], [0.7, middleColor], [1, deepColor]]
                    }
                }
            }
        ]
    };

    mainTSThemeOpt = {
        title: {
            textStyle: {
                color: fontColor
            }

        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: fontColor
                }
            }
        },
        tooltip: {
            backgroundColor: deepColor,
            axisPointer: {
                crossStyle: {
                    color: deepColor
                },
                label: {
                    backgroundColor: deepColor
                }
            }
        },

        toolbox: {
            feature: {
                magicType: {
                    iconStyle: {
                        borderColor: fontColor
                    }
                },
                restore: {
                    iconStyle: {
                        borderColor: fontColor
                    }
                }
            }
        },

        dataZoom: { //数据区域缩放控件
            backgroundColor: bColor,
            dataBackgroundColor: middleColor,
            fillerColor: transColor
        },
        series: [
            {

                itemStyle: {
                    color: deepColor
                }
            }

        ]
    };

    grpTSThemeOpt = {
        color: [deepColor, middleColor, lightColor, fouthColor],
        title: {
            textStyle: {
                color: fontColor
            }
        },
        legend: {
            textStyle: {
                color: fontColor
            }
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: fontColor
                }
            }
        },
        tooltip: {
            backgroundColor: deepColor,
            axisPointer: {
                crossStyle: {
                    color: deepColor
                },
                label: {
                    backgroundColor: deepColor
                }
            },
        },

        toolbox: {
            feature: {
                magicType: {
                    iconStyle: {
                        borderColor: fontColor
                    }
                },
                restore: {
                    iconStyle: {
                        borderColor: fontColor
                    }
                }
            }
        },

        dataZoom: { //数据区域缩放控件
            backgroundColor: bColor,
            dataBackgroundColor: middleColor,
            fillerColor: transColor
        }
    };


    grpBarThemeOpt = {
        color: [deepColor, middleColor, lightColor, fouthColor],
        title: {
            textStyle: {
                color: fontColor
            }
        },

        xAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: fontColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: fontColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: fontColor
                }
            }
        },
        series: [
            {
                itemStyle: {
                    show: true,
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                            deepColor,
                            middleColor,
                            lightColor,
                            fouthColor,
                            '#165868',
                            '#e76f00',
                            '#316194',
                            '#723761',
                            '#00b2f1',
                            '#4d6022',
                            '#4b83bf',
                            '#f9c813',
                            '#0176c0'
                        ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }
        ]
    };
};


function chartsDataOpt() {

    //资产类型树
    saveTreeDataOpt = {
        title: {
            text: "▌" + mapTitle + "各类存款" + metricsTitle
        },
        series: [
            {
                data: [savStructure]
             }
         ]
    };

    loanTreeDataOpt = {
        title: {
            text: "▌" + mapTitle + "各类贷款" + metricsTitle
        },
        series: [
            {
                data: [loanStructure]
             }
         ]
    };

    gaugeDataOpt = {

        title: {
            text: "▌" + mapTitle + financeTitle + metricsTitle
        },

        series: [
            {
                detail: {
                    formatter: '{value}' + gaugeData.unit,
                },
                name: gaugeData.name,
                min: gaugeData.min,
                max: gaugeData.max,
                axisLabel: {
                    formatter: '{value}' + gaugeData.unit
                },
                data: [{
                    value: gaugeData.value
            }]
        }
    ]
    };

    mainTSDataOpt = {
        title: {
            text: "▌" + mapTitle + financeTitle + metricsTitle + "近30天趋势图"
        },
        xAxis: [
            {
                data: mainTSOptData.date

                }
            ],
        yAxis: [
            {
                max: mainTSOptData.max,
                min: mainTSOptData.min,
                axisLabel: {
                    formatter: '{value}' + mainTSOptData.unit
                },
                name: mainTSOptData.unit
                }
            ],
        series: [
            {
                name: mainTSOptData.name,
                data: mainTSOptData.value
            }
        ]
    };


    grpTSDataOpt = {
        title: {
            text: "▌" + mapTitle + financeTitle + metricsTitle + "近30天趋势图"
        },

        legend: {
            data: function () {
                var list = [];
                for (var i = 0; i < grpTSOptData.series.length; i++) {
                    list.push(grpTSOptData.series[i].name);
                }
                return list;
            }()
        },

        xAxis: [
            {
                data: grpTSOptData.date
                }
            ],
        yAxis: [
            {
                max: grpTSOptData.max,
                min: grpTSOptData.min,
                axisLabel: {
                    formatter: '{value}' + mainTSOptData.unit
                },
                name: grpTSOptData.unit
                }
            ],
        series: grpTSOptData.series
    };


    grpBarDataOpt = {

        title: {
            text: "▌" + mapTitle + financeTitle + metricsTitle + "结构"
        },
        tooltip: {
            formatter: "{b} <br/>" + ": {c}"
        },
        xAxis: {
            data: grpBarOptData.axisData
        },
        series: [
            {
                data: grpBarOptData.data
            }
        ]
    }

	
    curMapData = mapData[pageMap];
    sortBranch();

    mapStatDataOpt = {
        title: {
            text: "▌" + mapTitle + financeTitle + metricsTitle + "分布图"
        },
        tooltip: {
            formatter: "{b} <br/>" + metricsTitle + ": {c}",
        },
        dataRange: {
            min: mapData.min,
            max: mapData.max
        },
        series: [{
                name: metricsTitle,
                type: "map",
                mapType: pageMap,
                data: mapData[pageMap]
                }
                ]
    };


    branchRankDataOpt = {
        title: {
            text: "▌" + mapTitle + financeTitle + metricsTitle + "排名"
        },
        tooltip: {
            formatter: "{b} <br/>" + metricsTitle + ": {c}"
        },
        yAxis: {
            data: countySorted
        },
        series: [
            {
                data: curMapData
            }
        ]
    };	
	
};

function refreshCharts() {
    chartsDataOpt();
    gaugeChart.setOption(gaugeDataOpt);
    mainTSChart.setOption(mainTSDataOpt);
    grpTSChart.setOption(grpTSDataOpt);
    grpBarChart.setOption(grpBarDataOpt);

    if (refreshRightFlag == 1) {
        mapStatChart.clear();
        if (Mapview == 1) {
            mapStatChart.setOption(mapStatOpt);
            mapStatChart.setOption(mapStatDataOpt);
            mapStatChart.setOption(mapStatThemeOpt);
        } else {
            mapStatChart.setOption(branchRankOpt);
            mapStatChart.setOption(branchRankDataOpt);
            mapStatChart.setOption(branchRankThemeOpt);
        }
    }
}

function loadData() {
    jsonLink = serverLink + jsonProgram + "&area=" + mapTitle + "&subject=" + financeTitle + "&indicator=" + metricsTitle;
//    $.getJSON(jsonLink).done(function(data){
    simulateOfflineData();
    
    refreshCharts();  
//    });
}

chartsInitialOpt();
chartsThemeOpt(pageTheme);

$('#mapStat').height($('#mapStat').width());
$('#bizPanel').width($('#bizPanel').width());
$('#bizPanel').height($('#bizPanel').width() / 8);

bizTreeChart = echarts.init(document.getElementById('bizPanel'));
mapStatChart = echarts.init(document.getElementById('mapStat'));

gaugeChart = echarts.init(document.getElementById('gaugeData'));
mainTSChart = echarts.init(document.getElementById('TSData'));
grpTSChart = echarts.init(document.getElementById('grpTSData'));
grpBarChart = echarts.init(document.getElementById('grpBarData'));

gaugeChart.setOption(gaugeOpt);
mainTSChart.setOption(mainTSOpt);
grpTSChart.setOption(grpTSOpt);
grpBarChart.setOption(grpBarOpt);

gaugeChart.setOption(gaugeThemeOpt);
mainTSChart.setOption(mainTSThemeOpt);
grpTSChart.setOption(grpTSThemeOpt);
grpBarChart.setOption(grpBarThemeOpt);

refreshRightFlag = 1;
loadData();
