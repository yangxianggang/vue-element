<template>
  <div>
    <div>
      <el-input
        class="moneyinput"
        placeholder="电脑品牌型号"
        suffix-icon="el-icon-plus"
        v-model="computerFailure.brandModels">
      </el-input>
      <el-input
        class="moneyinput"
        placeholder="快速服务代码"
        suffix-icon="el-icon-plus"
        v-model="computerFailure.quickServiceCode">
      </el-input>
      <el-input
        class="moneyinput"
        placeholder="客户姓名"
        suffix-icon="el-icon-plus"
        v-model="computerFailure.computerUserName">
      </el-input>
      <el-input
        class="moneyinput"
        placeholder="是否在保修期内"
        suffix-icon="el-icon-plus"
        v-model="computerFailure.warrantyFlag">
      </el-input>
      <el-input
        class="moneyinput"
        placeholder="故障状态"
        suffix-icon="el-icon-plus"
        v-model="computerFailure.failureStatus">
      </el-input>
      <el-input

        class="moneyinput"
        placeholder="维修状态"
        suffix-icon="el-icon-plus"
        v-model="computerFailure.maintenanceStatus">
      </el-input>
      <el-button icon="el-icon-plus" @click="addComputerFailure" type="primary">添加</el-button>
    </div>
    <div>

      <el-table
        :data="computerFailureTable"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="10">
        </el-table-column>
        <div>
        <el-table-column
          prop="computerUserName"
          label="客户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="brandModels"
          label="电脑品牌型号"
          width="180">

        </el-table-column>
        </div>
        <el-table-column
          prop="quickServiceCode"
          label="快速服务代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="warrantyFlag"
          label="是否在保修期内"
          width="180">
        </el-table-column>
        <el-table-column
          prop="failureStatus"
          label="故障状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="maintenanceStatus"
          label="维修状态"
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
        <el-tag>电脑品牌型号</el-tag>
        <el-input v-model="updateComputerFailure.brandModels" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>快速服务代码</el-tag>
        <el-input v-model="updateComputerFailure.quickServiceCode" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>客户姓名</el-tag>
        <el-input v-model="updateComputerFailure.computerUserName" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>是否在保修期内</el-tag>
        <el-input v-model="updateComputerFailure.warrantyFlag" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>故障状态</el-tag>
        <el-input v-model="updateComputerFailure.failureStatus" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>维修状态</el-tag>
        <el-input v-model="updateComputerFailure.maintenanceStatus" class="updateinput"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>




    <el-dialog
      title="提示"
      :visible.sync="adddialogVisible"
      width="30%"
    >
      <div>
        <el-tag>电脑品牌型号</el-tag>
        <el-input v-model="updateComputerFailure.brandModels" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>快速服务代码</el-tag>
        <el-input v-model="updateComputerFailure.quickServiceCode" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>客户姓名</el-tag>
        <el-input v-model="updateComputerFailure.computerUserName" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>是否在保修期内</el-tag>
        <el-input v-model="updateComputerFailure.warrantyFlag" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>故障状态</el-tag>
        <el-input v-model="updateComputerFailure.failureStatus" class="updateinput"></el-input>
      </div>
      <div>
        <el-tag>维修状态</el-tag>
        <el-input v-model="updateComputerFailure.maintenanceStatus" class="updateinput"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import {postRequest} from "../../../utils/api";

export default {
  name: "failure",
  data() {
    return {
      //电脑故障搜索参数
      computerFailure: {
        brandModels: '',//电脑品牌型号
        quickServiceCode: '',//快速服务代码
        computerUserName: '',//客户姓名
        warrantyFlag: '',//是否在保修期内
        failureStatus: '',//故障状态
        maintenanceStatus: ''//维修状态
      },
      computerFailureTable: [],//列表赋值
      dialogVisible: false,//弹出框默认不显示
      adddialogVisible: false,//弹出框默认不显示
      //修改对象
      updateComputerFailure: {
        brandModels: '',//电脑品牌型号
        quickServiceCode: '',//快速服务代码
        computerUserName: '',//客户姓名
        warrantyFlag: '',//是否在保修期内
        failureStatus: '',//故障状态
        maintenanceStatus: '',//维修状态
        computerFailureId:''//维修id
      }
    }
  },
  mounted() {
    this.queryAllComputerFailure();//页面初始化加载的方法
  },
  //方法
  methods: {

    //编辑
    doUpdate(){
      const  data={brandModels:this.updateComputerFailure.brandModels ,
        quickServiceCode:this.updateComputerFailure.quickServiceCode,
        computerUserName:this.updateComputerFailure.computerUserName ,
        warrantyFlag:this.updateComputerFailure.warrantyFlag ,
        failureStatus:this.updateComputerFailure.failureStatus ,
        maintenanceStatus:this.updateComputerFailure.maintenanceStatus,
        computerFailureId:this.updateComputerFailure.computerFailureId};
      postRequest("/api/computerFailure/updateComputerFailureInfoMaintenanceStatus", data).then(resp => {
        if (resp) {
          this.dialogVisible=false;
          this.queryAllComputerFailure();

        }
      })
    },
    addComputerFailure() {
       postRequest("/api/account/insert", this.account).then(resp => {
        if (resp) {
          this.queryAllComputerFailure();
          this.account.name = '';
          this.account.money = '';
        }
      })
    },
    //查询列表、初始化列表
    queryAllComputerFailure() {
      postRequest("/api/computerFailure/queryAllPageComputerFailure", {money: '11', name: '2222'}).then(resp => {
        if (resp) {
          this.computerFailureTable = resp.data;
        }
      })
    },
    showEditView(index,data){
       this.dialogVisible=true;//显示弹框
      this.updateComputerFailure.brandModels=data.brandModels;//电脑品牌型号
      this.updateComputerFailure.quickServiceCode=data.quickServiceCode;//快速服务代码
        this.updateComputerFailure.computerUserName=data.computerUserName;//客户姓名
        this.updateComputerFailure.warrantyFlag=data.warrantyFlag;//是否在保修期内
        this.updateComputerFailure.failureStatus=data.failureStatus;//故障状态
        this.updateComputerFailure.maintenanceStatus=data.maintenanceStatus;//维修状态
        this.updateComputerFailure.computerFailureId=data.computerFailureId;//维修id
    },
    //删除
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        postRequest("/api/computerFailure/updateComputerFailureInfoDeleteFlag", {computerFailureId:this.updateComputerFailure.computerFailureId,deleteFlag:1}).then(resp => {
          if (resp) {
            this.queryAllComputerFailure();
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
