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
          @change="handleChange(index)"
          v-model="index"
        >
          <a-select-option v-for="index in department" :key="index">{{index}}</a-select-option>
        </a-select>
        <span>Selected: {{ index }}</span>
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
          @change="handleChange(item)"
          v-model="item"
        >
          <a-select-option v-for="item in category_eng" :key="item">{{item}}</a-select-option>
        </a-select>
        <span>Selected: {{ item }}</span>
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
          @change="handleChange(value)"
          v-model="value"
        >
          <a-select-option v-for="value in group_eng" :key="value">{{value}}</a-select-option>
        </a-select>
        <span>Selected: {{ value }}</span>
      </div>
      <div>
        <a type="primary" @click="showModalNew" @PostNew="PostNew" href="javascript:;">+New</a>
        <a-modal title="Basic Modal" v-model="visibleNew" @ok="handleOkNew(New)">
          <p>brand_chn:{{New}}</p>
          <a-input size="large" placeholder="large size" v-model="New" />
        </a-modal>
      </div>
      <div>
        <a-button type="primary" icon="search" @click="search(index,item,value)" @getsearch="getsearch">Search</a-button>
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
          <div>
            <a type="primary" @click="showModal(record.uuid)" @edit="edit" href="javascript:;">Edit</a>
            <a-modal title="Basic Modal" v-model="visible" @ok="handleOk(res)">
              <p>brand_chn:{{res.brand_chn}}</p>
              <a-input size="large" placeholder="large size" v-model="res.brand_chn" />
            </a-modal>
          </div>
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
      columns,
      visible: false,
      visibleNew: false,
      res: {},
      New: "",
      index: "",
      item: "",
      value: ""
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
      return value;
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
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
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
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
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
    onDelete(uuid) {
      axios
        .delete(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/" +
            uuid +
            "/",
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
            }
          }
        )
        .then(response => {
          this.getProdmap();
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    showModal(uuid) {
      this.visible = true;
      this.edit(uuid);
      // this.New();
    },
    edit(uuid) {
      axios
        .get(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/" +
            uuid +
            "/",
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
            }
          }
        )
        .then(response => {
          this.res = response.data;
          // this.dataSource = response.data.results;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    put(data) {
      axios
        .put(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/" +
            data.uuid +
            "/",
          data,
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.getProdmap();
          // this.dataSource = response.data.results;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    showModalNew() {
      this.visibleNew = true;
    },
    handleOkNew(data) {
      this.visibleNew = false;
      const dataNew = {
        brand_chn: data,
        brand_eng: "Clarins",
        category_eng: "Skincare",
        department: "FBP",
        group_chn: "娇韵诗集团",
        group_eng: "Clarins Group",
        product_chn: "娇韵诗 黄金双瓶双萃焕活修护精华露",
        product_eng: "Clarins Double Serum Essence",
        segment_eng: "Facecare",
        subsegment_eng: "Facecare: Anti-Aging",
        tags: [],
        index: ""
      };
      this.PostNew(dataNew);
    },
    PostNew(data) {
      axios
        .post(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/",
          data,
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.getProdmap();
          // this.dataSource = response.data.results;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
      this.put(e);
    },
    search(index,item,value) {
      this.getsearch(index,item,value);
    },
    getsearch(index,item,value) {
      axios
        .get(
          "http://adopt-api-dev.azurewebsites.net/api/v1/competitive/prodmap/",
          {
            headers: {
              Authorization:
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMjQ5NzEzLCJvcmlnX2lhdCI6MTU2MjIzMTcxM30.1pcaJkFKyHe5dhbce8pEva5dXdMn_gQuWAo6yRVduNg"
            },
            params: {
              limit: 500,
              offset: 0,
              ordering: "",
              search: "",
              product_chn__icontains: "",
              newprod: "",
              department: index,
              category_eng: item,
              group_eng: value
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