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
<!--      <el-input-->
<!--        class="moneyinput"-->
<!--        placeholder="是否在保修期内"-->
<!--        suffix-icon="el-icon-plus"-->
<!--        v-model="computerFailure.warrantyFlag">-->
<!--      </el-input>-->
<!--      <el-input-->
<!--        class="moneyinput"-->
<!--        placeholder="故障状态"-->
<!--        suffix-icon="el-icon-plus"-->
<!--        v-model="computerFailure.failureStatus">-->
<!--      </el-input>-->
<!--      <el-input-->
<!--        class="moneyinput"-->
<!--        placeholder="维修状态"-->
<!--        suffix-icon="el-icon-plus"-->
<!--        v-model="computerFailure.maintenanceStatus">-->
<!--      </el-input>-->

      <div class="div-yxg-input" style="width: 1000px">
        是否在保修期内：
        <template>
          <el-radio v-model="computerFailure.warrantyFlag" label="0">否</el-radio>
          <el-radio v-model="computerFailure.warrantyFlag" label="1">是</el-radio>
        </template>
      </div>
      <div class="div-yxg-input"  style="width: 1000px">
        故障状态：
        <template>
          <el-radio v-model="computerFailure.failureStatus" label="1">一般</el-radio>
          <el-radio v-model="computerFailure.failureStatus" label="2">困难</el-radio>
          <el-radio v-model="computerFailure.failureStatus" label="3">严重</el-radio>
          <el-radio v-model="computerFailure.failureStatus" label="4">大修</el-radio>
        </template>
      </div>
      <div class="div-yxg-input" style="width: 1000px">
        维修状态：
        <template>
          <el-radio v-model="computerFailure.maintenanceStatus" label="1">排队中</el-radio>
          <el-radio v-model="computerFailure.maintenanceStatus" label="2">维修中</el-radio>
          <el-radio v-model="computerFailure.maintenanceStatus" label="3">已维修</el-radio>
          <el-radio v-model="computerFailure.maintenanceStatus" label="4">已报废</el-radio>
        </template>
      </div>



      <el-button icon="el-icon-plus" @click="addComputerFailureShowEditView" type="primary">添加</el-button>
      <el-button    type="primary">搜索</el-button>

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
          prop="warrantyFlagName"
          label="是否在保修期内"
          width="180">
        </el-table-column>


        <el-table-column
          prop="failureStatusName"
          label="故障状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="maintenanceEngineerName"
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
    >
      <div class="div-yxg-input">
        电脑品牌型号：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerFailure.brandModels">
        </el-input>
      </div>
      <div class="div-yxg-input">
        快速服务代码：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerFailure.quickServiceCode">
        </el-input>
      </div>
      <div class="div-yxg-input">
        客户姓名：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerFailure.computerUserName">
        </el-input>
      </div>
      <div class="div-yxg-input" style="width: 400px">
        是否在保修期内：
        <template>
          <el-radio-group v-model="updateComputerFailure.warrantyFlag">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </template>
      </div>
      <div class="div-yxg-input">
        故障状态：
        <template>
          <el-radio-group v-model="updateComputerFailure.failureStatus">
            <el-radio :label="1">一般</el-radio>
            <el-radio :label="2">困难</el-radio>
            <el-radio :label="3">严重</el-radio>
            <el-radio :label="4">大修</el-radio>
          </el-radio-group>
        </template>
      </div>
      <div class="div-yxg-input">
        维修状态：
        <template>
          <el-radio-group v-model="updateComputerFailure.maintenanceStatus">
            <el-radio :label="1">排队中</el-radio>
            <el-radio :label="2">维修中</el-radio>
            <el-radio :label="3">已维修</el-radio>
            <el-radio :label="4">已报废</el-radio>
          </el-radio-group>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
    >
      <div class="div-yxg-input">
        客户姓名：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.computerUserName">
        </el-input>
      </div>
      <div class="div-yxg-input">
        电脑客户联系方式：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.computerUserContact">
        </el-input>
      </div>
      <div class="div-yxg-input">
        电脑客户住址：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.computerUserAddress">
        </el-input>
      </div>
      <div class="div-yxg-input">
        电脑品牌型号：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.brandModels">
        </el-input>
      </div>
      <div class="div-yxg-input">
        服务编号：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.serveSerial">
        </el-input>
      </div>

      <div class="div-yxg-input">
        快速服务代码：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.failureInformation">
        </el-input>
      </div>
      <div class="div-yxg-input">
        故障信息详细描述：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.failureInformationDetailed">
        </el-input>
      </div>
      <div class="div-yxg-input" style="width: 331px">
        是否在保修期内：
        <template>
          <el-radio v-model="addComputerFailure.warrantyFlag" label="0">否</el-radio>
          <el-radio v-model="addComputerFailure.warrantyFlag" label="1">是</el-radio>
        </template>
      </div>
      <div class="div-yxg-input">
        故障状态：
        <template>
          <el-radio v-model="addComputerFailure.failureStatus" label="1">一般</el-radio>
          <el-radio v-model="addComputerFailure.failureStatus" label="2">困难</el-radio>
          <el-radio v-model="addComputerFailure.failureStatus" label="3">严重</el-radio>
          <el-radio v-model="addComputerFailure.failureStatus" label="4">大修</el-radio>
        </template>
      </div>
      <div class="div-yxg-input">
        维修状态：
        <template>
          <el-radio v-model="addComputerFailure.maintenanceStatus" label="1">排队中</el-radio>
          <el-radio v-model="addComputerFailure.maintenanceStatus" label="2">维修中</el-radio>
          <el-radio v-model="addComputerFailure.maintenanceStatus" label="3">已维修</el-radio>
          <el-radio v-model="addComputerFailure.maintenanceStatus" label="4">已报废</el-radio>
        </template>
      </div>
      <div class="div-yxg-input">
        维修工程师员工姓名：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.maintenanceEngineerName">
        </el-input>
      </div>
      <div class="div-yxg-input">
        维修工程师联系电话：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerFailure.maintenanceEngineerContact">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="insertComputerFailure">确 定</el-button>
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
      addDialogVisible: false,//弹出框默认不显示
      //修改对象
      updateComputerFailure: {
        brandModels: '',//电脑品牌型号
        quickServiceCode: '',//快速服务代码
        computerUserName: '',//客户姓名
        warrantyFlag: '',//是否在保修期内
        warrantyFlagName: '',//是否在保修期内
        failureStatus: '',//故障状态
        failureStatusName: '',//故障状态
        maintenanceStatus: '',//维修状态
        maintenanceEngineerName: '',//维修状态
        computerFailureId: ''//维修id
      },
      //添加数据初始化
      addComputerFailure: {
        computerUserName: '',//客户姓名
        computerUserContact: '',//电脑客户联系方式
        computerUserAddress: '',//电脑客户住址
        computerUserFaultyStatus: '',//电脑客户故障状态
        brandModels: '',//电脑品牌型号
        serveSerial: '',//服务编号
        quickServiceCode: '',//快速服务代码
        failureInformation: '',//故障信息
        failureInformationDetailed: '',//故障信息详细描述
        warrantyFlag: '',// 是否在保修期内（0 否 1是）
        failureStatus: '',//故障状态 （1 一般 2 困难 3 严重 4 大修）
        maintenanceStatus: '1',//维修状态（1.排队中 2 维修中 3已维修 4 已报废）
        maintenanceEngineerName: '',//维修工程师员工姓名
        maintenanceEngineerContact: ''//维修工程师联系电话
      }
    }
  },
  mounted() {
    this.queryAllComputerFailure();//页面初始化加载的方法
  },
  //方法
  methods: {

    //编辑
    doUpdate() {
      const data = {
        brandModels: this.updateComputerFailure.brandModels,
        quickServiceCode: this.updateComputerFailure.quickServiceCode,
        computerUserName: this.updateComputerFailure.computerUserName,
        warrantyFlag: this.updateComputerFailure.warrantyFlag,
        failureStatus: this.updateComputerFailure.failureStatus,
        maintenanceStatus: this.updateComputerFailure.maintenanceStatus,
        computerFailureId: this.updateComputerFailure.computerFailureId
      };
      postRequest("/api/computerFailure/updateComputerFailureInfoMaintenanceStatus", data).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          this.queryAllComputerFailure();

        }
      })
    },
    insertComputerFailure() {

      const data = {
        computerUserName: this.addComputerFailure.computerUserName,
        computerUserContact: this.addComputerFailure.computerUserContact,
        computerUserAddress: this.addComputerFailure.computerUserAddress,
        computerUserFaultyStatus: this.addComputerFailure.computerUserFaultyStatus,
        brandModels: this.addComputerFailure.brandModels,
        serveSerial: this.addComputerFailure.serveSerial,
        quickServiceCode: this.addComputerFailure.quickServiceCode,
        failureInformation: this.addComputerFailure.failureInformation,
        failureInformationDetailed: this.addComputerFailure.failureInformationDetailed,
        warrantyFlag: this.addComputerFailure.warrantyFlag,
        failureStatus: this.addComputerFailure.failureStatus,
        maintenanceStatus: this.addComputerFailure.maintenanceStatus,
        maintenanceEngineerName: this.addComputerFailure.maintenanceEngineerName,
        maintenanceEngineerContact: this.addComputerFailure.maintenanceEngineerContact
      }
      postRequest("/api/computerFailure/saveComputerFailure", data).then(resp => {
        if (resp) {
          this.addComputerFailure.computerUserName = '';//客户姓名
          this.addComputerFailure.computerUserContact = '';//电脑客户联系方式
          this.addComputerFailure.computerUserAddress = '';//电脑客户住址
          this.addComputerFailure.computerUserFaultyStatus = '';//电脑客户故障状态
          this.addComputerFailure.brandModels = '';//电脑品牌型号
          this.addComputerFailure.serveSerial = '';//服务编号
          this.addComputerFailure.quickServiceCode = '';//快速服务代码
          this.addComputerFailure.failureInformation = '';//故障信息
          this.addComputerFailure.failureInformationDetailed = '';//故障信息详细描述
          this.addComputerFailure.warrantyFlag = '';// 是否在保修期内（0 否 1是）
          this.addComputerFailure.failureStatus = '';//故障状态 （1 一般 2 困难 3 严重 4 大修）
          this.addComputerFailure.maintenanceStatus = '';//维修状态（1.排队中 2 维修中 3已维修 4 已报废）
          this.addComputerFailure.maintenanceEngineerName = '';//维修工程师员工姓名
          this.addComputerFailure.maintenanceEngineerContact = '';//维修工程师联系电话
          this.addDialogVisible = false;
          this.queryAllComputerFailure();

        }
      })
    },
    addComputerFailureShowEditView() {
      this.addDialogVisible = true;
    },


    //查询列表、初始化列表
    queryAllComputerFailure() {
      postRequest("/api/computerFailure/queryAllPageComputerFailure", {money: '11', name: '2222'}).then(resp => {
        if (resp) {
          this.computerFailureTable = resp.data;
        }
      })
    },
    showEditView(index, data) {
      this.dialogVisible = true;//显示弹框
      this.updateComputerFailure.brandModels = data.brandModels;//电脑品牌型号
      this.updateComputerFailure.quickServiceCode = data.quickServiceCode;//快速服务代码
      this.updateComputerFailure.computerUserName = data.computerUserName;//客户姓名
      this.updateComputerFailure.warrantyFlag = data.warrantyFlag;//是否在保修期内
      this.updateComputerFailure.warrantyFlagName = data.warrantyFlagName;//是否在保修期内
      this.updateComputerFailure.failureStatus = data.failureStatus;//故障状态
      this.updateComputerFailure.failureStatusName = data.failureStatusName;//故障状态
      this.updateComputerFailure.maintenanceStatus = data.maintenanceStatus;//维修状态
      this.updateComputerFailure.maintenanceEngineerName = data.maintenanceEngineerName;//维修状态
      this.updateComputerFailure.computerFailureId = data.computerFailureId;//维修id
    },
    //删除
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        postRequest("/api/computerFailure/updateComputerFailureInfoDeleteFlag", {
          computerFailureId: this.updateComputerFailure.computerFailureId,
          deleteFlag: 1
        }).then(resp => {
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

<style>
.el-input {
  margin-left: 48px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 320px;
}

.div-yxg-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
}


</style>
