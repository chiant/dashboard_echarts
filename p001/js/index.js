//为三个主题定义颜色
function changeTheme(theme) {
    if (theme != pageTheme) {
        document.getElementById(pageTheme).className = "a-unselected";
        document.getElementById(theme).className = "a-selected";
        chartsThemeOpt(theme);
        if (Mapview == 1) {
            mapStatChart.setOption(mapStatThemeOpt);
        } else {
            mapStatChart.setOption(branchRankThemeOpt);
        }        
        gaugeChart.setOption(gaugeThemeOpt);
        mainTSChart.setOption(mainTSThemeOpt);
        grpTSChart.setOption(grpTSThemeOpt);
        grpBarChart.setOption(grpBarThemeOpt);
        document.getElementById("bizPanel").style.display = "none";
        pageTheme = theme;
    }
}

//区县的选择操作
function changeMap(mapNm) {
	if (mapNm != pageMap && countySel == '') {
		if (pageMap != "" ) {
			document.getElementById(pageMap).className = "a-unselected";
		}
		document.getElementById(mapNm).className = "a-selected";
		document.getElementById("选中区县").innerHTML = "";
		document.getElementById("选中区县").className = "a-unselected";
		countySel = "";

		document.getElementById("bizPanel").style.display = "none";
		mapTitle = mapNm;
		pageMap = mapNm;

		refreshRightFlag = 1;
		loadData();
	}
};

function toggleMapView() {
    mapStatChart.clear();
    if (Mapview == 1) {
        mapStatChart.setOption(branchRankOpt);
        mapStatChart.setOption(branchRankDataOpt);
        mapStatChart.setOption(branchRankThemeOpt);
        Mapview = 0;
        document.getElementById("toggleMapView").innerHTML = "切换为分支行地图视图";
    } else {
        mapStatChart.setOption(mapStatOpt);
        mapStatChart.setOption(mapStatDataOpt);
        mapStatChart.setOption(mapStatThemeOpt);
        Mapview = 1;
        document.getElementById("toggleMapView").innerHTML = "切换为分支行排名视图";
    }
}

//选择指标区域的显示操作
function changeMetrics(metricsNm) {
    if (metricsNm != pageMetrics) {

        if (metricsNm == "当前余额") {
            var alink1 = document.getElementById(metricsNm);
            alink1.className = "a-selected";
            document.getElementById("选中指标").innerHTML = "";
        } else {
            document.getElementById("当前余额").className = "a-unselected";
            document.getElementById("选中指标").innerHTML = metricsNm;

        }

        pageMetrics = metricsNm;
        metricsTitle = pageMetrics;
        document.getElementById("bizPanel").style.display = "none";
        refreshRightFlag = 1;
        loadData();
    }
    document.getElementById("增量指标").selectedIndex = 0;
    document.getElementById("比率指标").selectedIndex = 0;
};
//选择科目区域的显示情况
function selBiz(biztype) {
    if (biztype != "选中资产") {
        if (biztype != curBizType) {
            document.getElementById(biztype).className = "a-selected";
            document.getElementById(curBizType).className = "a-unselected";
        }
        if (biztype == "资产规模") {
            document.getElementById("选中资产").innerHTML = "";
            document.getElementById("选中资产").className = "a-unselected";
            curBizSel = biztype;
        }
        if ((document.getElementById("bizPanel").style.display == "flex" &&
                biztype == curBizType) || biztype == "资产规模") {
            document.getElementById("bizPanel").style.display = "none";
            if (financeTitle == "资产规模") {
                document.getElementById(biztype).className = "a-unselected";
                document.getElementById("资产规模").className = "a-selected";
                curBizType = "资产规模";
            }
            if (biztype == "资产规模" && curBizSel != "") {
                financeTitle = "资产规模";
                curBizSel = "";
                refreshRightFlag = 1;
                loadData();
            }
        } else {
            document.getElementById("bizPanel").style.display = "flex";
            if (biztype == "各项存款") bizTreeDataOpt = saveTreeDataOpt;
            else bizTreeDataOpt = loanTreeDataOpt;
            bizTreeChart.clear();
            bizTreeChart.setOption(bizTreeOpt);
            bizTreeChart.setOption(bizTreeThemeOpt);
            bizTreeChart.setOption(bizTreeDataOpt);
            curBizType = biztype;
        }

    } else {
        document.getElementById("bizPanel").style.display = "none";
    }
};


mapStatChart.on('click', function (parmas) {
    if (parmas.componentType == "series") {
        countySel = parmas.name;
        document.getElementById("选中区县").innerHTML = countySel;
        document.getElementById("选中区县").className = "a-selected";
        document.getElementById("重庆全境").className = "a-unselected";
        document.getElementById("主城区").className = "a-unselected";
        document.getElementById("主城外圈").className = "a-unselected";
        document.getElementById("渝东北翼").className = "a-unselected";
        document.getElementById("渝东南翼").className = "a-unselected";
    }
    //将分支行名称传到各个图表标题
    mapTitle = countySel;
    refreshRightFlag = 0;
    loadData();
});


//将树状中的科目name回传到科目选择区域
bizTreeChart.on('click', function (parmas) {

    if (parmas.componentType == "series") {
        var selData = parmas.data;
        curBizSel = selData.name;
        if (curBizSel != "各项贷款" && curBizSel != "各项存款") {
            document.getElementById("选中资产").innerHTML = curBizSel;
            document.getElementById("选中资产").className = "a-selected";
            document.getElementById("各项贷款").className = "a-unselected";
            document.getElementById("各项存款").className = "a-unselected";
            document.getElementById("资产规模").className = "a-unselected";
        } else {
            document.getElementById("选中资产").innerHTML = "";
            document.getElementById("选中资产").className = "a-unselected";
            document.getElementById(curBizSel).className = "a-selected";
        }
        document.getElementById("bizPanel").style.display = "none";
    }
    financeTitle = curBizSel;
    
    refreshRightFlag = 1;
    loadData();
});