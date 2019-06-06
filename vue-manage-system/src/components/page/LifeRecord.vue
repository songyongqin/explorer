<template>
  <div>
    <el-select v-model="eventType" clearable placeholder="请选择事件类型">
       <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value">
       </el-option>
     </el-select>
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
         prop="eventType"
         label="事件类型"
         width="180">
       </el-table-column>
       <el-table-column
         prop="feel"
         label="感受"
         width="180">
       </el-table-column>
       </el-table-column>
     </el-table>
     <el-dialog
       title="添加生活记录"
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
       <el-select style="width: 250px;margin-left: 15px;" v-model="aeventType" clearable placeholder="请选择事件类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
       <el-input
         style="width: 250px;margin-left: 15px;"
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
            adate: null,
            atask: '',
            aname: '',
            aeventType: '',
            afeel: '',
        options: [{
                  value: '运动',
                  label: '运动'
                }, {
                  value: '学习',
                  label: '学习'
                }, {
                  value: '工作',
                  label: '工作'
                }],
                eventType: '',
        tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    event: '挖矿',
                    eventType: '运动',
                    feel: '我挖到了一斤矿好开心'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    event: '挖矿',
                    eventType: '运动',
                    feel: '我挖到了一斤矿好开心'
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    event: '挖矿',
                    eventType: '运动',
                    feel: '我挖到了一斤矿好开心'
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
          url: '/lifeplate/getinit',
          data: {}
        })
        this.tableData = rest.data
      },
      async search () {
        const rest = await this.$axios({
          method: 'post',
                 url: '/lifeplate/search',
                 data: {
                   eventType: this.eventType
                 }
        })
        this.tableData = rest.data
        console.log(rest.data)
      },
      async add () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.adate === null || this.aname === '' || this.aeventType === '' || this.afeel === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/lifeplate/add',
             data: {
               name: this.aname,
               date: this.adate,
               eventType: this.aeventType,
               feel: this.afeel,
             }
        })
        this.dialogVisible = false
        this.$message.success(rest.data.msg)
        this.aname = ''
        this.adate = null
        this.aeventType = ''
        this.afeel = ''
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