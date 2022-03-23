
import * as echarts from 'echarts'

var echart = echarts;

export class MyEcharts {
    constructor (option, id) {
        this.option = option;
        this.id = id;
    }

    initChart() {
        let chart = echart.getInstanceByDom(document.getElementById(this.id)); // 如果存在，则获取 DOM 节点
        if (chart == null) { // 如果不存在就初始化
            chart = echart.init(document.getElementById(this.id), "light");
        }
        chart.showLoading() // 启用加载动画
        chart.setOption(this.option)
        chart.hideLoading() // 关闭加载动画
        window.onresize = function() {
            //自适应大小
            chart.resize();
        };
    } 
}