<template>
  <div>
    <el-input v-model="task" placeholder="工作任务" clearable style="width:200px;margin-left: 15px;"></el-input>
    <el-button type="primary" style="margin-left: 15px;" @click="dialogVisible = true">添加</el-button>
    <el-button type="primary" style="margin-left: 15px;" @click="search">搜索</el-button>
     <el-table
       :data="tableData"
       style="width: 100%;margin-top: 20px;">
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
         prop="task"
         label="工作任务"
         width="180">
       </el-table-column>
       <el-table-column
         prop="job_schedule"
         label="工作进度"
         width="180">
       </el-table-column>
       <el-table-column
         prop="working_diary"
         label="工作日记">
       </el-table-column>
     </el-table>
     <el-dialog
       title="添加工作记录"
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
         style="width: 250px;margin-left: 15px;"
         placeholder="紧急事件"
         v-model="atask"
         clearable>
       </el-input>
       <el-input
         style="width: 250px;margin-left: 15px;"
         placeholder="工作进度"
         v-model="ajobSchedule"
         clearable>
       </el-input>
       <el-input
         style="width: 250px;margin-top: 10px;"
         placeholder="工作日记"
         v-model="aworkingDiary"
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
        dialogVisible: false,
        name: '',
        task: '',
        adate: null,
        atask: '',
        aname: '',
        ajobSchedule: '',
        aworkingDiary: '',
        tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    task: '挖矿',
                    job_schedule: '30%',
                    working_diary: '今天挖了好多好多矿'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    task: '挖矿',
                    job_schedule: '30%',
                    working_diary: '今天挖了好多好多矿'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    task: '挖矿',
                    job_schedule: '30%',
                    working_diary: '今天挖了好多好多矿'
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
          url: '/workplate/getinit',
          data: {}
        })
        this.tableData = rest.data
      },
      async search () {
        const rest = await this.$axios({
          method: 'post',
                 url: '/workplate/search',
                 data: {
                   task: this.task
                 }
        })
        this.tableData = rest.data
        console.log(rest.data)
      },
      async add () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.adate === null || this.aname === '' || this.atask === '' || this.ajobSchedule === '' || this.aworkingDiary === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/workplate/add',
             data: {
               name: this.aname,
               date: this.adate,
               task: this.atask,
               job_schedule: this.ajobSchedule,
               working_diary: this.aworkingDiary
             }
        })
        this.dialogVisible = false
        this.$message.success(rest.data.msg)
        this.aname = ''
        this.date = null
        this.atask = ''
        this.ajobSchedule = ''
        this.aworkingDiary = ''
        this.init()
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