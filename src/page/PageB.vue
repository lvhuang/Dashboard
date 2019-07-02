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
  </div>
</template>



<script>
import axios from "axios";

const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
    scopedSlots: { customRender: "age" }
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

export default {
  name: "pageB",
  data() {
    return {
      department: Array,
      category_eng: Array,
      group_eng: Array
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
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMDkxNjk4LCJvcmlnX2lhdCI6MTU2MjA3MzY5OH0.St146QeiLcMANh7S2RmvaTd_Su2pwEHRPR594pQA89A"
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
                "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiY2xpZW50IjoiY2hhbmVsIiwiZXhwIjoxNTYyMDkxNjk4LCJvcmlnX2lhdCI6MTU2MjA3MzY5OH0.St146QeiLcMANh7S2RmvaTd_Su2pwEHRPR594pQA89A"
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