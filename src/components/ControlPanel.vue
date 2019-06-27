<template>
  <a-layout id="conrolpanel">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo"/>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>Dashboad</span>
          </span>
          <a-menu-item key="1">
            <router-link :to="'/A'">分析页</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="'/B'">工作台</router-link>
          </a-menu-item>
          <a-menu-item key="3">监控页</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>表单页</span>
          </span>
          <a-menu-item key="4">基础表单</a-menu-item>
          <a-menu-item key="5">分步表单</a-menu-item>
          <a-menu-item key="6">高级表单</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>列表页</span>
          </span>
          <a-sub-menu key="sub3" title="搜索列表">
            <a-menu-item key="7">搜索列表（文章）</a-menu-item>
            <a-menu-item key="8">搜索列表（项目）</a-menu-item>
            <a-menu-item key="9">搜索列表（应用）</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="10">查询表格</a-menu-item>
          <a-menu-item key="11">标准列表</a-menu-item>
          <a-menu-item key="12">卡片列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>详情页</span>
          </span>
          <a-menu-item key="13">基础详情页</a-menu-item>
          <a-menu-item key="14">高级详情页</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>结果页</span>
          </span>
          <a-menu-item key="15">成功页</a-menu-item>
          <a-menu-item key="16">失败页</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub6">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>异常页</span>
          </span>
          <a-menu-item key="17">成功页</a-menu-item>
          <a-menu-item key="18">失败页</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub7">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>个人页</span>
          </span>
          <a-menu-item key="19">成功页</a-menu-item>
          <a-menu-item key="20">失败页</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub8">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>圆形编辑器</span>
          </span>
          <a-menu-item key="21">成功页</a-menu-item>
          <a-menu-item key="22">失败页</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "ControlPanel",
  props: {},
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#conrolpanel .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#conrolpanel .trigger:hover {
  color: #1890ff;
}

#conrolpanel .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
