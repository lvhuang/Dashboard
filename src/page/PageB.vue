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
        :rowKey="record => record.login.uuid"
        :dataSource="SS"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
      </a-table>
    </div>
  </div>
</template>



<script>
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" }
    ],
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];

export default {
  name: "pageB",
  data() {
    return {
      department: Array,
      category_eng: Array,
      group_eng: Array,
      SS: [],
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
    this.tablelist();
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getQuery() {
      axios
        .get(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/query/",
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMTM5MDA3LCJvcmlnX2lhdCI6MTU2MjEyMTAwN30.2T54Qf9byx-exCWTDNbtqCHf2J91AjNHi-4OQMP9UnI"
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
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMTM5MDA3LCJvcmlnX2lhdCI6MTU2MjEyMTAwN30.2T54Qf9byx-exCWTDNbtqCHf2J91AjNHi-4OQMP9UnI"
            },
            params: {
              limit: 10,
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
        .then(response => console.log(response))
        .catch(function(error) {
          console.error(error);
        });
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.tablelist({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    tablelist(params = {}) {
      this.loading = true;
      // reqwest({
      //   url: 'https://randomuser.me/api',
      //   method: 'get',
      //   data: {
      //     results: 10,
      //     ...params,
      //   },
      //   type: 'json',
      // }).then((data) => {
      //   const pagination = { ...this.pagination };
      //   // Read total count from server
      //   // pagination.total = data.totalCount;
      //   pagination.total = 200;
      //   this.loading = false;
      //   this.data = data.results;
      //   this.pagination = pagination;
      // });
      axios
        .get("https://randomuser.me/api", {
          headers: {
            Authorization:
              "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMTM5MDA3LCJvcmlnX2lhdCI6MTU2MjEyMTAwN30.2T54Qf9byx-exCWTDNbtqCHf2J91AjNHi-4OQMP9UnI"
          },

          params: {
            results: 10
          }
        })
        .then(SS => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.SS = SS.data.results;
          this.pagination = pagination;
        });
    }
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