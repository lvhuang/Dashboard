<template>
  <div class="pageA">
    <div>
      <ve-line :data="chartData"  width = '100%' :judge-width = 'judgeWidth'></ve-line>
    </div>
    <div>
    <ve-pie :data="chartData2" width = '100%' :judge-width = 'judgeWidth'></ve-pie>
    </div>
    <div>
      <ve-line :data="chartData3" width = '100%' :judge-width = 'judgeWidth'></ve-line>
    </div>
    <div>
      <ve-line :data="chartData4" width = '100%' :judge-width = 'judgeWidth'></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageA",
  props: {
    
  },
  data: function() {
    return {
      judgeWidth:true,
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      chartData2: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },
      chartData3: {
        columns: ["日期", "访问用户", "下单用户", "年龄"],
        rows: [
          { 日期: "1/1", 访问用户: 123, 年龄: 3, 下单用户: 1244 },
          { 日期: "1/2", 访问用户: 1223, 年龄: 6, 下单用户: 2344 },
          { 日期: "1/3", 访问用户: 7123, 年龄: 9, 下单用户: 3245 },
          { 日期: "1/4", 访问用户: 4123, 年龄: 12, 下单用户: 4355 },
          { 日期: "1/5", 访问用户: 3123, 年龄: 15, 下单用户: 4564 },
          { 日期: "1/6", 访问用户: 2323, 年龄: 20, 下单用户: 6537 }
        ]
      },
      chartData4: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageA {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 500px 500px;
  grid-gap: 20px 20px;

  background: gray;
}
.pageA div{
  background: white
}
</style>
