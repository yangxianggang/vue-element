<template>
  <div>
    <div>
      <el-input
        class="门店座机"
        placeholder="电脑品牌型号"
        suffix-icon="el-icon-plus"
        v-model="computerStore.storeLandline">
      </el-input>
      <el-input
        class="moneyinput"
        placeholder="门店负责人"
        suffix-icon="el-icon-plus"
        v-model="computerStore.storeHead">
      </el-input>

      <el-input
        class="moneyinput"
        placeholder="门店负责人联系电话"
        suffix-icon="el-icon-plus"
        v-model="computerStore.storeHeadContact">
      </el-input>
      <el-input
        class="moneyinput"
        placeholder="门店归属省"
        suffix-icon="el-icon-plus"
        v-model="computerStore.attributionProvinces">
      </el-input>

      <el-button icon="el-icon-plus" @click="addComputerFailure" type="primary">添加</el-button>
    </div>
    <div>

      <el-table
        :data="computerStore"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="10">
        </el-table-column>
        <div>
          <el-table-column
            prop="storeHead"
            label="门店负责人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="storeHeadContact"
            label="门店负责人联系电话"
            width="180">
          </el-table-column>
        </div>
        <el-table-column
          prop="attributionProvinces"
          label="所属省市"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEditView(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    弹出框展示数据，默认不展示-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <el-tag>金额</el-tag>
        <el-input v-model="updatemoney.money" class="updateinput"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import {postRequest} from "../../../utils/api";

export default {
  name: "store",
  data() {
    return {
      //电脑故障搜索参数
      computerStore: {
        storeLandline: '',//门店座机
        storeHead: '',//门店负责人
        storeHeadContact: '',//门店负责人联系电话
        attributionProvinces: '',//门店归属省
      },
      computerFailureTable: [],//列表赋值
      dialogVisible: false,//弹出框默认不显示
      updatemoney: {
        money: '',
        name: ''
      }
    }
  },
  mounted() {
    this.queryAllComputerStore();//页面初始化加载的方法
  },
  //方法
  methods: {

    //编辑
    doUpdate(){

      postRequest("/api/account/update", {name:this.updatemoney.name,money:this.updatemoney.money}).then(resp => {
        if (resp) {
          this.dialogVisible=false;
          this.queryAll();

        }
      })
    },
    addComputerFailure() {
      postRequest("/api/account/insert", this.account).then(resp => {
        if (resp) {
          this.queryAll();
          this.account.name = '';
          this.account.money = '';
        }
      })
    },
    //查询列表、初始化列表
    queryAllComputerStore() {
      postRequest("/api/storeEmployees/queryAllPageStoreInfo", {money: '11', name: '2222'}).then(resp => {
        if (resp) {
          this.computerStore = resp.data;
          console.log(resp)
          console.log(resp.data);//后台返回参数
        }
      })
    },
    showEditView(index,data){
      this.updatemoney.money=data.money;//弹框回显信息\
      this.updatemoney.name=data.name;
      this.dialogVisible=true;

    },
    //删除
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        postRequest("/api/account/delete", {name: data.name}).then(resp => {
          if (resp) {
            this.queryAll();
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style scoped>

</style>
