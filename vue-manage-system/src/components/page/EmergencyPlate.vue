<template>
  <div>
    <el-input v-model="task" placeholder="紧急事件" clearable style="width:200px;margin-left: 15px;"></el-input>
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
         label="紧急事件"
         width="180">
       </el-table-column>
    </el-table>
    <el-dialog
      title="添加紧急事件"
      :visible.sync="dialogVisible"
      width="50%"
      center
      :before-close="handleClose">
      <el-date-picker
           v-model="date"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
      <el-input
        style="width: 150px;margin-left: 15px;"
        placeholder="姓名"
        v-model="name"
        clearable>
      </el-input>
      <el-input
        style="width: 250px;margin-left: 15px;"
        placeholder="紧急事件"
        v-model="atask"
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
        task: "",
        dialogVisible: false,
        name: '',
        atask: '',
        date: null,
        tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    task: '赶飞机',
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    task: '赶飞机',
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    task: '赶飞机',
                  }]
      }
    },
    created(){
      this.init()
    },
    methods:{
      async init() {
        const rest = await this.$axios({
          method: 'post',
          url: '/emergencyplate/getinit',
          data: {}
        })
        console.log(rest)
        this.tableData = rest.data
      },
      async search (){
        console.log(this.date)
        const rest = await this.$axios({
          method: 'post',
                 url: '/emergencyplate/search',
                 data: {
                   task: this.task
                 }
        })
        this.tableData = rest.data
        console.log(rest.data)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      async add () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.date === null || this.name === '' || this.atask === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/emergencyplate/add',
             data: {
               name: this.name,
               date: this.date,
               task: this.atask
             }
        })
        this.dialogVisible = false
        this.$message.success(rest.data.msg)
        this.name = ''
        this.date = ''
        this.atask = ''
        this.init()
      }
    }
  }
  
</script>