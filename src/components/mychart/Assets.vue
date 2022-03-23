<template>
  <div class="card" style="width: 25rem; position: relative">
    <div class="card-body" id="assets" :style="{ width: '25rem', height: '400px' }"></div>
  </div>
</template>

<script>

import { onMounted, reactive, toRefs } from '@vue/runtime-core';
import { MyEcharts } from "../../js/MyEcharts";
export default {
  name: "assets",
  setup() {

    onMounted(() => { // 挂载函数，当实例挂载完成后被调用
      run ()
    })

    const show_field = reactive({
      option: {
        title: { text: "账户余额" },

        // 配置柱图
        series: [
          {
            data: [
                {
                    value: 335,
                    name: "支付宝"
                }
            ],
            type: "pie",
            smooth: true,
            // 柱图样式
            itemStyle: {
              color: "#89B0AE",
              /**
               * 描边样式
               */
              // borderWidth: "2", // 宽度
              borderColor: "#D4ECE8", // 颜色
              borderType: "solid", // 样式
              // barCategoryGap: "1%", // 柱间距离
              borderRadius: 5, // 圆角半径
            },
            barWidth: "20%", // 宽度
            barGap: "-100%", // 不同系列的柱间距离，-100时重叠，且只对 bar 生效
          },
        ],
      },
    });

    var Assets = new MyEcharts(show_field.option, 'assets')
    
    function run () {
        Assets.initChart()
    }
  
  return {
      ...toRefs(show_field),
      run
  }
  
  },
};
</script>
