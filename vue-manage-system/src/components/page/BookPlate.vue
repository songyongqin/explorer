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
         prop="account"
         label="收入（元）"
         width="180">
       </el-table-column>
       <el-table-column
         prop="typedetail"
         label="描述"
         width="180">
       </el-table-column>
     </el-table>

     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

     <el-dialog
       title="添加学习记录"
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
         style="width: 150px;margin-left: 15px;"
         placeholder="收入"
         v-model="aaccount"
         clearable>
       </el-input>
       <el-input
         style="width: 600px;margin-top: 10px;"
         placeholder="描述"
         v-model="atypedetail"
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
        aaccount: '',
        atypedetail: '',
        currentPage: 1,
        pageSize: 10,
        total: 100,
        tableData: [{
                    date: '2016-05-01',
                    name: '王小虎',
                    account: '1000',
                    typedetail: '卖菜',
                  },{
                    date: '2016-05-02',
                    name: '王小虎',
                    account: '-100000',
                    typedetail: '买车',
                  },{
                    date: '2016-05-03',
                    name: '王小虎',
                    account: '-5000',
                    typedetail: '学费缴纳',
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
          url: '/bookplate/getinit',
          data: {
            date: this.date,
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        })
        this.tableData = rest.data.arr
        this.total = rest.data.num
      },
      async add () {
        let t1 = Number(this.date)
        console.log(t1)
        if (this.adate === null || this.aname === '' || this.aaccount === '' || this.atypedetail === '') {
          this.$message('请完善表单')
          return
        }
        const rest = await this.$axios({
          method: 'post',
             url: '/bookplate/add',
             data: {
               date: this.adate,
               name: this.aname,
               account: this.aaccount,
               typedetail: this.atypedetail
             }
        })
        this.dialogVisible = false
        this.$message.success(rest.data.msg)
        this.aname = ''
        this.adate = ''
        this.aaccount = ''
        this.atypedetail = ''
        this.init()
      },
      async search (){
        this.currentPage = 1
        this.init()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.init()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.init()
      }
    }
  }
  
</script>