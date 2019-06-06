<template>
  <div>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    <el-button type="primary" style="margin-left: 15px;" @click="dialogVisible = true">添加</el-button>
    <el-button type="primary" style="margin-left: 15px;" @click="search">搜索</el-button>
     <el-table
       :data="tableData"
       style="width: 100%;margin-top: 15px;">
       <el-table-column
         prop="date"
         label="日期"
         width="300">
       </el-table-column>
       <el-table-column
         prop="name"
         label="姓名"
         width="180">
       </el-table-column>
       <el-table-column
         prop="incident"
         style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
         label="事件"
         width="200">
       </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="mini"
             type="danger"
             :visible.sync="dialogVisible"
             @click="open(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
     <el-dialog
       title="添加便签记录"
       :visible.sync="dialogVisible"
       width="70%"
       center
       :before-close="handleClose">
       <el-date-picker
            v-model="adate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
       <el-input
         style="width: 150px;margin-left: 15px;"
         placeholder="姓名"
         v-model="aname"
         clearable>
       </el-input>
       <el-input
         style="width: 500px;margin-left: 15px;"
         placeholder="事件"
         v-model="aincident"
         clearable>
       </el-input>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="add">确 定</el-button>
       </span>
     </el-dialog>
     <el-dialog
       title="修改记录"
       :visible.sync="updateVisible"
       width="70%"
       center
       :before-close="handleClose">
       <el-date-picker
            v-model="udate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
       <el-input
         style="width: 150px;margin-left: 15px;"
         placeholder="姓名"
         v-model="uname"
         clearable>
       </el-input>
       <el-input
         style="width: 500px;margin-left: 15px;"
         placeholder="事件"
         v-model="uincident"
         clearable>
       </el-input>
       <span slot="footer" class="dialog-footer">
         <el-button @click="updateVisible = false">取 消</el-button>
         <el-button type="primary" @click="upd">确 定</el-button>
       </span>
     </el-dialog>
  </div>
</template>
<script>
  export default{
    data () {
      return{
        date: null,
        dialogVisible: false,
        updateVisible: false,
        adate: null,
        aname: '',
        aincident: '',
        udate: null,
        uname: '',
        uincident: '',
        uid: '',
        tableData: [{
                    date: '2016-05-01',
                    name: '王小虎',
                    incident: '打篮球',
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    incident: '打排球',
                  },{
                    date: '2016-05-03',
                    name: '王小虎',
                    incident: '打乒乓球',
                  }]
      }
    },
    created() {
      this.init()
    },
    methods:{
      async init() {
        const rest = await this.$axios({
          method: 'post',
          url: '/noteplate/getinit',
          data: {
          }
        })
        this.tableData = rest.data
      },
      async add () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.adate === null || this.aname === '' || this.aincident === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/noteplate/add',
             data: {
               date: this.adate,
               name: this.aname,
               incident: this.aincident
             }
        })
        this.dialogVisible = false
        this.$message.success(rest.data.msg)
        this.aname = ''
        this.adate = ''
        this.aincident = ''
        this.init()
      },
      async upd () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.udate === null || this.uname === '' || this.uincident === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/noteplate/upd',
             data: {
               id: this.uid,
               date: this.udate,
               name: this.uname,
               incident: this.uincident
             }
        })
        this.updateVisible = false
        this.$message.success(rest.data.msg)
        // this.aname = ''
        // this.adate = ''
        // this.aincident = ''
        this.init()
      },
      async search (){
        const rest = await this.$axios({
          method: 'post',
          url: '/noteplate/search',
          data: {
            date: this.date
          }
        })
        this.tableData = rest.data
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      open(index, row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(index, row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleEdit(index, row) {
        console.log(row)
        this.udate = row.date
        this.uname = row.name
        this.uincident = row.incident
        this.uid = row._id
        this.updateVisible = true
      },
      async handleDelete(index, row) {
        const rest = await this.$axios({
          method: 'post',
          url: '/noteplate/del',
          data: {
            id: row._id
          }
        })
        this.init()
        this.$message.success(rest.data.msg)
      }
    }
  }
  
</script>