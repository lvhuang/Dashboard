<template>
  <div class="pageB">
    <div class="components-input-demo-size">
      <div class="put">
        <p>Product：</p>
        <a-input placeholder="Input a Product" />
      </div>
      <div class="put">
        <p>Department:</p>
        <a-select
          showSearch
          placeholder="Select a Department"
          optionFilterProp="children"
          style="width: 200px"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option v-for="index in department" :key="index">{{index}}</a-select-option>
        </a-select>
      </div>
      <div class="put">
        <p>Category:</p>
        <a-select
          showSearch
          placeholder="Select a Category"
          optionFilterProp="children"
          style="width: 200px"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option v-for="index in category_eng" :key="index">{{index}}</a-select-option>
        </a-select>
      </div>
      <div class="put">
        <p>Group(ENG):</p>
        <a-select
          showSearch
          placeholder="Select a Group(ENG)"
          optionFilterProp="children"
          style="width: 200px"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option v-for="index in group_eng" :key="index">{{index}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div>
      <a-table
        :columns="columns"
        :rowKey="record => record.uuid"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
      >
        <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.uuid)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>



<script>
import axios from "axios";

const columns = [
  {
    title: "Product(CHN)",
    dataIndex: "product_chn",
    width: "20%",
    scopedSlots: { customRender: "product_chn" }
  },
  {
    title: "Segment",
    dataIndex: "segment_eng",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "segment_eng" }
  },
  {
    title: "Group(ENG)",
    dataIndex: "group_eng",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "group_eng" }
  },
  {
    title: "Brand(ENG)",
    dataIndex: "brand_chn",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "brand_chn" }
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "20%",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "pageB",
  data() {
    return {
      department: Array,
      category_eng: Array,
      group_eng: Array,
      dataSource: [],
      pagination: {},
      loading: false,
      columns
    };
  },
  props: {},
  components: {},
  mounted() {
    this.getQuery();
    this.getProdmap();
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    getQuery() {
      axios
        .get(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/query/",
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMTU3MzUzLCJvcmlnX2lhdCI6MTU2MjEzOTM1M30.410_5THlsdLZQJDc-KPtGNLtbaeAEFd5LiFBxmx8i9U"
            }
          }
        )
        .then(response => {
          this.department = response.data.department;
          this.category_eng = response.data.category_eng;
          this.group_eng = response.data.group_eng;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    getProdmap() {
      axios
        .get(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/",
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMTU3MzUzLCJvcmlnX2lhdCI6MTU2MjEzOTM1M30.410_5THlsdLZQJDc-KPtGNLtbaeAEFd5LiFBxmx8i9U"
            },
            params: {
              limit: 500,
              offset: 0,
              ordering: "",
              search: "",
              product_chn__icontains: "",
              newprod: "",
              department: "",
              category_eng: "",
              group_eng: ""
            }
          }
        )
        .then(response => {
          // console.log(response);
          this.dataSource = response.data.results;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    onDelete (uuid) {
      const dataSource = [...this.dataSource]
      console.log(dataSource);
      this.dataSource = dataSource.filter(item => item.uuid!== uuid)
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.components-input-demo-size .ant-input {
  width: 200px;
  margin: 0 8px 8px 0;
}
.components-input-demo-size {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.put {
  display: flex;
}
p {
  margin-right: 15px;
}
</style>