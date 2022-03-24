<template>

<div class="alert alert-danger" role="alert" >
  A simple danger alert—check it out!
</div>
  <div class="container">
    <div class="row">
      <div class="col"><StatementOfCashFlows></StatementOfCashFlows></div>
      <div class="col">col</div>
      <div class="col">col</div>
      <div class="col">col</div>
    </div>
    <div class="row">
      <div class="col-8"><IncomeStatement></IncomeStatement></div>
      <div class="col-4"><Assets></Assets></div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/runtime-core';
import IncomeStatement from "../mychart/IncomeStatement.vue";
import Assets from "../mychart/Assets.vue";
import StatementOfCashFlows from '../mychart/StatementOfCashFlows.vue'


export default {
  components: {
    // 挂载组件
    Assets,
    IncomeStatement,
    StatementOfCashFlows
  },
  setup() {

    const showAlert = ref({ display: "none" });
    return {
      showAlert,
    };
  },
};
</script>
