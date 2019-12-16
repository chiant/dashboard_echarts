var serverLink = 'http://sascs:7980/SASStoredProcess/do?_action=execute,nobanner'
var jsonProgram = '&_program=%2FProjects%2FP001%2FSTP%2Fprj1_json';
var serverParameter = '';

var savStructure = null;
var loanStructure = null;
var mapData = null;
var gaugeData = null;
var grpBarOptData = null;
var mainTSOptData = null;
var grpTSOptData = null;

var curBizData = null;
var curMapData = null;
var countySorted = [];


function simulateOfflineData() {
    //量具数据，指标名称+指标值+单位+最小值+最大值+最小阀值+中间阀值+最大阀值
    gaugeData = {
        "name": "年初比",
        "value": Math.floor(Math.random() * 50) + 30,
        "unit": "%",
        "min": 0,
        "max": 100,
        "scaleSt": 0.30,
        "scaleMi": 0.70,
        "scaleEd": 1

    };


    //趋势图数据，指标名称+日期序列+指标值+单位+y轴刻度最大值+y轴刻度最小值    
    mainTSOptData = {
        "name": "当前余额",
        "date": function () {
            var list = [];
            for (var i = 1; i <= 30; i++) {
                list.push('2018-09-' + i);
            }
            return list;
        }(),
        "value": function () {
            var list = [];
            for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 30));
            }
            //                console.log(list);
            return list;
        }(),
        "max": 40,
        "min": 0,
        "unit": "亿元"

    }

    //结构图数据，指标名称+子类+指标值+单位   
    grpTSOptData = {
        "name": "存款大类",
        "series": [{
                "type": "line",
                "name": '零售类存款',
                "symbol": "circle",
                "symbolSize": 8,
                "data": function () {
                    var list = [];
                    for (var i = 1; i <= 30; i++) {
                        list.push(Math.round(Math.random() * 30));
                    }
                    return list;
                }()
    },
            {
                "type": "line",
                "name": '对公类存款',
                "symbol": "circle",
                "symbolSize": 8,
                "data": function () {
                    var list = [];
                    for (var i = 1; i <= 30; i++) {
                        list.push(Math.round(Math.random() * 30));
                    }
                    return list;
                }()

    },
            {
                "type": "line",
                "name": '同业类存款',
                "symbol": "circle",
                "symbolSize": 8,
                "data": function () {
                    var list = [];
                    for (var i = 1; i <= 30; i++) {
                        list.push(Math.round(Math.random() * 30));
                    }
                    return list;
                }()
    }],
        "date": function () {
            var list = [];
            for (var i = 1; i <= 30; i++) {
                list.push('2018-09-' + i);
            }
            return list;
        }(),
        "max": 40,
        "min": 0,
        "unit": "亿元"
    };

    //饼图数据，指标名称+子类+指标值+单位 
    pieOptData = {
        "name": "存款大类",
        "unit": "亿元",
        "series": [
                {
                "name": '零售类存款',
                "value": Math.floor(Math.random() * 100 + 200)
                },
                {
                "name": '对公类存款',
                "value": Math.floor(Math.random() * 100 + 300)
                },
                {
                "name": '同业类存款',
                "value": Math.floor(Math.random() * 100 + 100)
                }
        ]

    };
    
    grpBarOptData = {
        "name": "存款大类",
        "unit": "亿元",
        "axisData": ['零售类存款', '对公类存款', '同业类存款'],
        "data": [Math.floor(Math.random() * 100 + 200), Math.floor(Math.random() * 100 + 200), Math.floor(Math.random() * 100 + 200)]
    };
    mapData = {
        "重庆全境": [{
                value: 451 + Math.floor(Math.random() * 500),
                name: "渝中支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 376 + Math.floor(Math.random() * 500),
                name: "大渡口支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 868 + Math.floor(Math.random() * 500),
                name: "江北支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 563 + Math.floor(Math.random() * 500),
                name: "沙坪坝支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 591 + Math.floor(Math.random() * 500),
                name: "九龙坡支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 447 + Math.floor(Math.random() * 500),
                name: "南岸支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 228 + Math.floor(Math.random() * 500),
                name: "北碚支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 789 + Math.floor(Math.random() * 500),
                name: "渝北支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 301 + Math.floor(Math.random() * 500),
                name: "巴南支行",
                rankAll: 1,
                rankRegion: 1
                    },
            {
                value: 482 + Math.floor(Math.random() * 200),
                name: "万州分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 228 + Math.floor(Math.random() * 200),
                name: "涪陵分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 194 + Math.floor(Math.random() * 200),
                name: "永川支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 249 + Math.floor(Math.random() * 200),
                name: "璧山支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 209 + Math.floor(Math.random() * 200),
                name: "大足支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 137 + Math.floor(Math.random() * 200),
                name: "綦江支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 256 + Math.floor(Math.random() * 200),
                name: "江津分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 159 + Math.floor(Math.random() * 200),
                name: "合川分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 129 + Math.floor(Math.random() * 200),
                name: "黔江分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 277 + Math.floor(Math.random() * 200),
                name: "长寿支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 146 + Math.floor(Math.random() * 50),
                name: "南川支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 135 + Math.floor(Math.random() * 50),
                name: "铜梁支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 151 + Math.floor(Math.random() * 50),
                name: "潼南支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 276 + Math.floor(Math.random() * 50),
                name: "荣昌支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 68 + Math.floor(Math.random() * 50),
                name: "开州支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 163 + Math.floor(Math.random() * 50),
                name: "梁平支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 91 + Math.floor(Math.random() * 100),
                name: "武隆支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 151 + Math.floor(Math.random() * 50),
                name: "城口支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 76 + Math.floor(Math.random() * 50),
                name: "丰都支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 68 + Math.floor(Math.random() * 100),
                name: "垫江支行",
                rankAll: 1,
                rankRegion: 1
                    },
            {
                value: 163 + Math.floor(Math.random() * 100),
                name: "忠县支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 91 + Math.floor(Math.random() * 50),
                name: "云阳支行",
                rankAll: 1,
                rankRegion: 1
                    },
            {
                value: 47 + Math.floor(Math.random() * 50),
                name: "奉节支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 128 + Math.floor(Math.random() * 50),
                name: "巫山支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 89 + Math.floor(Math.random() * 50),
                name: "巫溪支行",
                rankAll: 1,
                rankRegion: 1
                    },
            {
                value: 101 + Math.floor(Math.random() * 50),
                name: "石柱支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 182 + Math.floor(Math.random() * 100),
                name: "秀山支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 128 + Math.floor(Math.random() * 50),
                name: "酉阳支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 94 + Math.floor(Math.random() * 50),
                name: "彭水支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    }

            ],
        "主城区": [{
                value: 451 + Math.floor(Math.random() * 500),
                name: "渝中支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 376 + Math.floor(Math.random() * 500),
                name: "大渡口支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 868 + Math.floor(Math.random() * 500),
                name: "江北支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 563 + Math.floor(Math.random() * 500),
                name: "沙坪坝支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 591 + Math.floor(Math.random() * 500),
                name: "九龙坡支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 447 + Math.floor(Math.random() * 500),
                name: "南岸支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 228 + Math.floor(Math.random() * 500),
                name: "北碚支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 789 + Math.floor(Math.random() * 500),
                name: "渝北支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 301 + Math.floor(Math.random() * 500),
                name: "巴南支行",
                rankAll: 1,
                rankRegion: 1
                    }

            ],
        "主城外圈": [
            {
                value: 228 + Math.floor(Math.random() * 200),
                name: "涪陵分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 194 + Math.floor(Math.random() * 200),
                name: "永川支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 249 + Math.floor(Math.random() * 200),
                name: "璧山支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 209 + Math.floor(Math.random() * 200),
                name: "大足支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 137 + Math.floor(Math.random() * 200),
                name: "綦江支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 256 + Math.floor(Math.random() * 200),
                name: "江津分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 159 + Math.floor(Math.random() * 200),
                name: "合川分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },

            {
                value: 277 + Math.floor(Math.random() * 200),
                name: "长寿支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 146 + Math.floor(Math.random() * 50),
                name: "南川支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 135 + Math.floor(Math.random() * 50),
                name: "铜梁支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 151 + Math.floor(Math.random() * 50),
                name: "潼南支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 276 + Math.floor(Math.random() * 50),
                name: "荣昌支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    }

            ],
        "渝东北翼": [
            {
                value: 482 + Math.floor(Math.random() * 200),
                name: "万州分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },

            {
                value: 68 + Math.floor(Math.random() * 50),
                name: "开州支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 163 + Math.floor(Math.random() * 50),
                name: "梁平支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },

            {
                value: 151 + Math.floor(Math.random() * 50),
                name: "城口支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 76 + Math.floor(Math.random() * 50),
                name: "丰都支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 68 + Math.floor(Math.random() * 100),
                name: "垫江支行",
                rankAll: 1,
                rankRegion: 1
                    },
            {
                value: 163 + Math.floor(Math.random() * 100),
                name: "忠县支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 91 + Math.floor(Math.random() * 50),
                name: "云阳支行",
                rankAll: 1,
                rankRegion: 1
                    },
            {
                value: 47 + Math.floor(Math.random() * 50),
                name: "奉节支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 128 + Math.floor(Math.random() * 50),
                name: "巫山支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 89 + Math.floor(Math.random() * 50),
                name: "巫溪支行",
                rankAll: 1,
                rankRegion: 1
                    }

            ],
        "渝东南翼": [
            {
                value: 129 + Math.floor(Math.random() * 200),
                name: "黔江分行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 101 + Math.floor(Math.random() * 50),
                name: "石柱支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 91 + Math.floor(Math.random() * 100),
                name: "武隆支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 182 + Math.floor(Math.random() * 100),
                name: "秀山支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 128 + Math.floor(Math.random() * 50),
                name: "酉阳支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    },
            {
                value: 94 + Math.floor(Math.random() * 50),
                name: "彭水支行",
                rankAll: 1,
                rankRegion: 1,
                unit: "亿元"
                    }

            ],
        "min": 100,
        "max": 900
    };    
     savStructure = {
        "name": "各项存款",
        "value": 999,
        "unit": "亿元",
        "children": [
            {
                "name": "一般类存款",
                "value": 220,
                "unit": "亿元",
                "children": [
                    {
                        "name": "零售存款",
                        "value": 320,
                        "unit": "亿元",
                        "children": [
                            {
                                "name": "零售定期",
                                "value": 170,
                                "unit": "亿元",
                                "children": [
                                    {
                                        "name": "定存宝(五年期)",
                                        "value": 55,
                                        "unit": "亿元"
                                },
                                    {
                                        "name": "定存宝(三年期)",
                                        "value": 98,
                                        "unit": "亿元"
                                },
                                    {
                                        "name": "金鸡宝",
                                        "value": 32,
                                        "unit": "亿元"
                                },
                                    {
                                        "name": "其他零售定期",
                                        "value": 42,
                                        "unit": "亿元"
                                }
                                       ]
                        },
                            {
                                "name": "零售活期",
                                "value": 310,
                                "unit": "亿元"
                        }
                                 ]
                },
                    {
                        "name": "公司存款",
                        "value": 220,
                        "unit": "亿元",
                        "children": [
                            {
                                "name": "公司定期",
                                "value": 300,
                                "unit": "亿元",
                        },
                            {
                                "name": "公司活期",
                                "value": 200,
                                "unit": "亿元"
                        },
                            {
                                "name": "公司保证金",
                                "value": 120,
                                "unit": "亿元"
                        }
         ]
                },
        ]
        },
            {
                "name": "同业类存款",
                "value": 125,
                "unit": "亿元"
        }
    ]
    };

    //贷款科目数据，科目名称+指标值+指标单位；   
    loanStructure = {
        "name": "各项贷款",
        "value": 220,
        "unit": "亿元",
        "children": [
            {
                "name": "一般类贷款",
                "value": 120,
                "unit": "亿元",
                "children": [
                    {
                        "name": "一般贷款",
                        "value": 80,
                        "unit": "亿元"
                },
                    {
                        "name": "贴现",
                        "value": 40,
                        "unit": "亿元"
                }

                ]
        },
            {
                "name": "同业类贷款",
                "value": 100,
                "unit": "亿元"
        }
        ]
    };
   
}
