<template>
  <div>
    <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="选择日期">
    </el-date-picker>
    <el-input v-model="eventtype" placeholder="技术类型" clearable style="width:200px;margin-left: 15px;"></el-input>
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
         prop="eventtype"
         label="技术类型"
         width="180">
       </el-table-column>
       <el-table-column
         prop="feel"
         label="感受"
         width="500">
       </el-table-column>
     </el-table>
    <el-dialog
      title="添加学习记录"
      :visible.sync="dialogVisible"
      width="70%"
      center
      :before-close="handleClose">
      <el-date-picker
           v-model="adate"
           type="datetime"
           placeholder="选择日期">
         </el-date-picker>
      <el-input
        style="width: 150px;margin-left: 15px;"
        placeholder="姓名"
        v-model="aname"
        clearable>
      </el-input>
      <el-input
        style="width: 150px;margin-left: 15px;"
        placeholder="技术类型"
        v-model="aeventtype"
        clearable>
      </el-input>
      <el-input
        style="width: 600px;margin-top: 10px;"
        placeholder="感受"
        v-model="afeel"
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
        date: null,
        eventtype: '',
        adate: '',
        aname: '',
        aeventtype: '',
        afeel: '',
        tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    techType: 'html',
                    techDetail: '使用html搭建网页'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    techType: 'js',
                    techDetail: '使用js实现分页'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    techType: 'node',
                    techDetail: '使用node搭建服务器'
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
          url: '/studyplate/getinit',
          data: {}
        })
        this.tableData = rest.data
      },
      async add () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.adate === null || this.aname === '' || this.aeventtype === '' || this.afeel === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/studyplate/add',
             data: {
               date: this.adate,
               name: this.aname,
               eventtype: this.aeventtype,
               feel: this.afeel
             }
        })
        this.dialogVisible = false
        this.$message.success(rest.data.msg)
        this.aname = ''
        this.adate = ''
        this.aeventtype = ''
        this.afeel = ''
        this.init()
      },
      async search (){
        console.log(this.date)
        const rest = await this.$axios({
          method: 'post',
                 url: '/studyplate/search',
                 data: {
                   eventtype: this.eventtype,
                   date: this.date
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
      }
    }
  }
  
</script>