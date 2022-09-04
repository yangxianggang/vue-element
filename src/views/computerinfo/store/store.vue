<template>
  <div>
    <div>
      <el-input
        class="门店座机"
        placeholder="门店座机"
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


      <el-button icon="el-icon-plus" @click="addShowEditView" type="primary">添加</el-button>
      <el-button icon="el-icon-plus" @click="queryAllPageStore" type="primary">搜索</el-button>
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
          prop="storeAddress"
          label="详细地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="storeEmployeesInfoCount"
          label="门店员工个数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <div>
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
              <el-button @click="queryAllStoreEmployeesInfo(scope.$index, scope.row)" size="mini">
                员工信息
              </el-button>

            </template>
          </el-table-column>
        </div>
      </el-table>
    </div>

    <!--门店员工信息抽屉 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》begin-->
    <el-drawer
      title="门店员工信息"
      :visible.sync="drawer"
      size='60%'
      :with-header="false">
      <span>员工信息,归属门店负责人：{{ storeEmployeesInfoStoreHead }},联系电话：{{ storeEmployeesInfoStoreHeadContact }}</span>
      <div>
        <el-table
          :data="storeEmployeesInfo"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="10">
          </el-table-column>
          <div>
            <el-table-column
              prop="storeEmployeesName"
              label="员工姓名"
            >
            </el-table-column>
            <el-table-column
              prop="storeEmployeesContact"
              label="员工联系方式"
            >
            </el-table-column>
          </div>
          <el-table-column
            prop="storeEmployeesAddress"
            label="员工住址"
          >
          </el-table-column>
          <el-table-column
            prop="storeEmployeesPositionName"
            label="员工职位"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="入职时间">
          </el-table-column>
          <div>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showEditViewStoreEmployeesInfo(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteStoreEmployeesInfo(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </div>
        </el-table>
        <el-button icon="el-icon-plus" @click="addStoreEmployeesInfoDialogVisible=true" type="primary">添加</el-button>
      </div>
    </el-drawer>
    <!--门店员工信息抽屉 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》End-->

    <!--门店员工信息修改弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》begin-->
    <el-dialog
      title="员工信息修改"
      :visible.sync="updateStoreEmployeesInfoDialogVisible"
    >
      <div class="div-store-yxg-input">
        员工姓名：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateStoreEmployeesInfo.storeEmployeesName">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        员工联系方式：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateStoreEmployeesInfo.storeEmployeesContact">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        员工住址：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateStoreEmployeesInfo.storeEmployeesAddress">
        </el-input>
      </div>

      <div class="div-store-yxg-input">
        员工职位：
        <template>
          <el-radio-group v-model="updateStoreEmployeesInfo.storeEmployeesPosition">
            <el-radio :label="1">前台</el-radio>
            <el-radio :label="2">工程师</el-radio>
            <el-radio :label="3">学徒</el-radio>

          </el-radio-group>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addStoreEmployeesInfoDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdateStoreEmployeesInfo">确 定</el-button>
  </span>
    </el-dialog>
    <!--门店员工信息修改弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》End-->


    <!--门店员工信息新增弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》Begin-->

    <el-dialog
      title="员工信息新增"
      :visible.sync="addStoreEmployeesInfoDialogVisible"
    >
      <div class="div-store-yxg-input">
        员工姓名：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="storeEmployeesInfo.storeEmployeesName">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        员工联系方式：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="storeEmployeesInfo.storeEmployeesContact">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        员工住址：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="storeEmployeesInfo.storeEmployeesAddress">
        </el-input>
      </div>

      <div class="div-store-yxg-input">
        员工职位：
        <template>
          <el-radio v-model="storeEmployeesInfo.storeEmployeesPosition" label="1">前台</el-radio>
          <el-radio v-model="storeEmployeesInfo.storeEmployeesPosition" label="2">工程师</el-radio>
          <el-radio v-model="storeEmployeesInfo.storeEmployeesPosition" label="3">学徒</el-radio>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addStoreEmployeesInfoDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doInserterStoreEmployeesInfo">确 定</el-button>
  </span>
    </el-dialog>

    <!--门店员工信息新增弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》End-->


    <!--门店信息修改弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》Begin-->

    <!--    弹出框展示数据，默认不展示-->
    <el-dialog
      title="门店基本信息登记"
      :visible.sync="dialogVisible"
    >
      <div class="div-store-yxg-input">
        门店负责人：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerStore.storeHead">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        门店负责人联系电话：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerStore.storeHeadContact">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        门店归属省：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerStore.attributionProvinces">
        </el-input>
      </div>

      <div class="div-store-yxg-input">
        详细地址：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="updateComputerStore.storeAddress">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        门店员工个数：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  disabled=false
                  v-model="updateComputerStore.storeEmployeesInfoCount">
        </el-input>


      </div>
      <div class="div-store-yxg-input">
        创建时间：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  disabled=false
                  v-model="updateComputerStore.createTime">
        </el-input>
      </div>


      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdateComputerStore">确 定</el-button>
  </span>
    </el-dialog>
    <!--门店信息修改弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》End-->

    <!--门店信息新增弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》Begin-->

    <!--    弹出框展示数据，默认不展示-->
    <el-dialog
      title="门店员工信息新增"
      :visible.sync="addDialogVisible"
    >
      <div class="div-store-yxg-input">
        门店负责人：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerStore.storeHead">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        门店负责人联系电话：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerStore.storeHeadContact">
        </el-input>
      </div>
      <div class="div-store-yxg-input">
        门店归属省：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerStore.attributionProvinces">
        </el-input>
      </div>

      <div class="div-store-yxg-input">
        详细地址：
        <el-input class="el-input"
                  placeholder="请输入内容"
                  v-model="addComputerStore.storeAddress">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doInserterComputerStore">确 定</el-button>
  </span>
    </el-dialog>
    <!--门店信息新增弹框 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》End-->

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
      drawer: false,
      storeEmployeesInfoStoreHead: '',
      storeEmployeesInfoStoreHeadContact: '',
      computerFailureTable: [],//列表赋值
      dialogVisible: false,//弹出框默认不显示
      addDialogVisible: false,//弹出框默认不显示
      addStoreEmployeesInfoDialogVisible: false,//弹出框默认不显示
      updateStoreEmployeesInfoDialogVisible: false,//弹出框默认不显示
      addStoreEmployeesInfoStoreId: '',//弹出框默认不显示
      updateComputerStore: { //更新数据对象
        storeLandline: '',//门店座机
        storeHead: '',//门店负责人
        storeHeadContact: '',//门店负责人联系电话
        attributionProvinces: '',//门店归属省
        storeAddress: '',//详细地址
        storeEmployeesInfoCount: '',//门店员工个数
        createTime: '',//创建时间
        storeId: ''
      },
      addComputerStore: {
        storeLandline: '',//门店座机
        storeHead: '',//门店负责人
        storeHeadContact: '',//门店负责人联系电话
        attributionProvinces: '',//门店归属省
        storeAddress: '',//详细地址
        storeEmployeesInfoCount: '',//门店员工个数
        createTime: '',//创建时间
        storeId: ''
      },
      //新增 列表显示
      storeEmployeesInfo: {
        storeEmployeesName: '',//员工姓名
        storeEmployeesContact: '',//员工联系方式
        storeEmployeesAddress: '',//员工住址
        storeEmployeesPositionName: '',//员工职位
        createTime: '',//入职时间
      },

      updateStoreEmployeesInfo: {
        storeEmployeesName: '',//员工姓名
        storeEmployeesContact: '',//员工联系方式
        storeEmployeesAddress: '',//员工住址
        storeEmployeesPositionName: '',//员工职位
        storeEmployeesPosition: '',//员工职位
        storeEmployeesId: '',//员工id
      }


    }
  },
  mounted() {
    //查询全部门店列表信息
    let data={};
    this.queryAllComputerStore(data);//页面初始化加载的方法
  },
  //方法
  methods: {
    //更新门店员工信息
    doUpdateStoreEmployeesInfo() {
      let data = {
        storeEmployeesName: this.updateStoreEmployeesInfo.storeEmployeesName,
        storeEmployeesContact: this.updateStoreEmployeesInfo.storeEmployeesContact,
        storeEmployeesAddress: this.updateStoreEmployeesInfo.storeEmployeesAddress,
        storeEmployeesId: this.updateStoreEmployeesInfo.storeEmployeesId,
        storeEmployeesPosition: this.updateStoreEmployeesInfo.storeEmployeesPosition
      }

      postRequest("/api/storeEmployees/updateStoreEmployeesInfo", data).then(resp => {
        if (resp) {
          this.updateStoreEmployeesInfoDialogVisible = false;

          this.drawer = false;
          let data={};
          this.queryAllComputerStore(data);//页面初始化加载的方法

        }
      })

    },
    //回显门店员工信息
    showEditViewStoreEmployeesInfo(index, data) {
      this.updateStoreEmployeesInfoDialogVisible = true;
      this.updateStoreEmployeesInfo.storeEmployeesName = data.storeEmployeesName;
      this.updateStoreEmployeesInfo.storeEmployeesContact = data.storeEmployeesContact;
      this.updateStoreEmployeesInfo.storeEmployeesAddress = data.storeEmployeesAddress;
      this.updateStoreEmployeesInfo.storeEmployeesPosition = data.storeEmployeesPosition;
      this.updateStoreEmployeesInfo.storeEmployeesId = data.storeEmployeesId;
    },

    //删除门店员工信息
    handleDeleteStoreEmployeesInfo(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        postRequest("/api/storeEmployees/updateStoreEmployeesInfoDeleteFlag", {storeEmployeesId: data.storeEmployeesId}).then(resp => {
          if (resp) {
            this.updateStoreEmployeesInfoDialogVisible = false;

            this.drawer = false;
            let data={};
            this.queryAllComputerStore(data);//页面初始化加载的方法
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

//添加门店员工信息
    doInserterStoreEmployeesInfo() {
      let data = {
        storeEmployeesName: this.storeEmployeesInfo.storeEmployeesName,
        storeEmployeesContact: this.storeEmployeesInfo.storeEmployeesContact,
        storeEmployeesAddress: this.storeEmployeesInfo.storeEmployeesAddress,
        storeId: this.addStoreEmployeesInfoStoreId,
        storeEmployeesPosition: this.storeEmployeesInfo.storeEmployeesPosition
      }
      postRequest("/api/storeEmployees/saveStoreEmployeesInfo", data).then(resp => {
        if (resp) {
          this.addStoreEmployeesInfoDialogVisible = false;
          this.drawer = false;
          let data={};
          this.queryAllComputerStore(data);//页面初始化加载的方法
        }
      })

    },

    //查询门店员工列表
    queryAllStoreEmployeesInfo(index,data) {
      this.drawer = true;
      this.storeEmployeesInfoStoreHead = data.storeHead;
      this.storeEmployeesInfoStoreHeadContact = data.storeHeadContact;
      this.addStoreEmployeesInfoStoreId = data.storeId;

      postRequest("/api/storeEmployees/queryAllStoreEmployeesInfo", {storeId: data.storeId}).then(resp => {
        if (resp) {
          this.storeEmployeesInfo = resp.data;
        }
      })

    },

    //查询门店列表信息
    queryAllPageStore() {
      let data = {
        storeLandline: this.computerStore.storeLandline,
        storeHead: this.computerStore.storeHead,
        storeHeadContact: this.computerStore.storeHeadContact,
        attributionProvinces: this.computerStore.attributionProvinces
      }
      this.queryAllComputerStore(data);
    },

    //编辑门店信息
    doUpdateComputerStore() {
      let data = {
        storeLandline: this.updateComputerStore.storeLandline,
        storeHead: this.updateComputerStore.storeHead,
        storeHeadContact: this.updateComputerStore.storeHeadContact,
        attributionProvinces: this.updateComputerStore.attributionProvinces,
        storeAddress: this.updateComputerStore.storeAddress,
        storeId: this.updateComputerStore.storeId
      }
      postRequest("/api/storeEmployees/updateStoreInfo", data).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          let data={};
          this.queryAllComputerStore(data);

        }
      })
    },
    //保存门店信息
    doInserterComputerStore() {
      let data = {
        storeLandline: this.addComputerStore.storeLandline,
        storeHead: this.addComputerStore.storeHead,
        storeHeadContact: this.addComputerStore.storeHeadContact,
        storeAddress: this.addComputerStore.storeAddress,
        attributionProvinces: this.addComputerStore.attributionProvinces
      }


      postRequest("/api/storeEmployees/saveStoreInfo", data).then(resp => {
        if (resp) {
          this.addDialogVisible = false;
          let data={};
          this.queryAllComputerStore(data);
          this.addComputerStore.storeLandline = '';
          this.addComputerStore.storeHead = '';
          this.addComputerStore.storeHeadContact = '';
          this.addComputerStore.attributionProvinces = '';
          this.addComputerStore.storeAddress = '';
        }
      })
    },
    //查询列表、初始化列表
    queryAllComputerStore(data) {
      postRequest("/api/storeEmployees/queryAllPageStoreInfo", data).then(resp => {
        if (resp) {
          this.computerStore = resp.data;
        }
      })
    },
    showEditView(index, data) {
      this.dialogVisible = true;
      this.updateComputerStore.storeLandline = data.storeLandline;
      this.updateComputerStore.storeHead = data.storeHead;
      this.updateComputerStore.storeHeadContact = data.storeHeadContact;
      this.updateComputerStore.attributionProvinces = data.attributionProvinces;
      this.updateComputerStore.storeAddress = data.storeAddress;
      this.updateComputerStore.storeEmployeesInfoCount = data.storeEmployeesInfoCount;
      this.updateComputerStore.createTime = data.createTime;
      this.updateComputerStore.storeId = data.storeId;
    },

    addShowEditView() {
      this.addDialogVisible = true;
    },
    //删除
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        postRequest("/api/storeEmployees/updateStoreInfoDeleteFlag", {storeId: data.storeId}).then(resp => {
          if (resp) {
            let data={};
            this.queryAllComputerStore(data);
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

.div-store-yxg-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
}


</style>
