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
         label="特殊事件"
         width="500">
       </el-table-column>
     </el-table>

     <el-dialog
       title="添加日历记录"
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
         placeholder="特殊事件"
         v-model="aincident"
         clearable>
       </el-input>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="add">确 定</el-button>
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
        adate: null,
        aname: '',
        aincident: '',
        tableData: [{
                    date: '2016-05-01',
                    name: '王小虎',
                    incident: '回家娶媳妇'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    incident: '老婆过生日'
                  },{
                    date: '2016-05-03',
                    name: '王小虎',
                    incident: '老婆生娃了'
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
          url: '/calendarplate/getinit',
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
             url: '/calendarplate/add',
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
      async search (){
        const rest = await this.$axios({
          method: 'post',
          url: '/calendarplate/search',
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
      }
    }
  }
  
</script>