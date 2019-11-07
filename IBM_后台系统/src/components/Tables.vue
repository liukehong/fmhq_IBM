<template>
<div class="two-table">
    <el-scrollbar style="height: 100%;">
    <el-table :header-row-style="getStyle" :header-cell-style="getStyle" :data="tableOneData" border stripe :default-sort="{prop: 'data', order: 'descending'}" >
      <el-table-column align="left" prop="price" label="价格" sortable :formatter="formatter"></el-table-column>
      <el-table-column align="left" prop="name" label="名称"></el-table-column>
      <el-table-column align="left" prop="address" label="厂商"></el-table-column>
      <el-table-column align="left" prop="address" label="厂商"></el-table-column>
      <el-table-column align="left" prop="address" label="厂商"></el-table-column>
      <el-table-column align="left" prop="address" label="厂商"></el-table-column>
      <el-table-column align="left" prop="address" label="厂商"></el-table-column>
    </el-table>
  </el-scrollbar>
</div>
</template>
<script>
export default {
  data () {
    return {
      tableOneData: [
        {
          price: '88',
          name: '巴斯光年',
          address: '美国'
        },
        {
          price: '66',
          name: '牛仔吴迪',
          address: '美国'
        },
        {
          price: '98',
          name: '翠丝',
          address: '美国'
        },
        {
          price: '55',
          name: '维和者',
          address: '美国'
        },
        {
          price: '00',
          name: '蜘蛛侠',
          address: '美国'
        }
      ],
      tableTwoData: [
        {
          date: '2018-02-20',
          name: '巴斯光年',
          address: '美国'
        },
        {
          date: '2018-02-21',
          name: '牛仔吴迪',
          address: '美国'
        },
        {
          date: '2018-02-22',
          name: '翠丝',
          address: '美国'
        },
        {
          price: '55',
          name: '维和者',
          address: '美国'
        },
        {
          price: '00',
          name: '蜘蛛侠',
          address: '美国'
        }
      ]
    }
  },
  methods: {
    formatter (row, column) {
      return row.price + '元'
    },
    getStyle ({row, rowIndex}) {
      return {
        'height': '50px'
      }
    },
    handleEdit (index, row) {
    },
    handleDelete (index, row) {
    }
  }
}
</script>

<style scoped lang="scss">
.two-table {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  overflow: auto;
}
</style>
