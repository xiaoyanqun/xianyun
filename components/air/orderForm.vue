<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input
              placeholder="姓名"
              class="input-with-select"
              v-model="form.users[index].username"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input v-model="form.users[index].id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            @change="changeCheckbox(item.id)"
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <input type="hidden" :value="allPrice" />
          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        users: [{ username: "", id: "" }], //乘车人集合
        insurances: [], //保险集合
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        invoice: false, //是否需要发票
        seat_xid: "", //作为id
        air: "", //航班id
        captcha: "" //验证码
      },
      infoData: {
        insurances: []
      } // 机票信息数据
    };
  },
  computed: {
    allPrice() {
      let price = 0;

      if (!this.infoData.airport_tax_audlet) return 0;

      // 机票单价
      price += this.infoData.seat_infos.org_settle_price;

      // 基建燃油费
      price += this.infoData.airport_tax_audlet;

      // 保险
      price += this.form.insurances.length * 30;

      // 人数
      price *= this.form.users.length;

      this.$store.commit("air/setAllPrice", price);
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: { seat_xid }
    }).then(res => {
      console.log(res.data);
      this.infoData = res.data;
      this.$store.commit("air/setInfoData", this.infoData);
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },
    // 是否选择保险
    changeCheckbox(id) {
      const index = this.form.insurances.indexOf(id);
      if (index > -1) {
        this.form.insurances.splice(index, 1);
      } else {
        this.form.insurances.push(id);
      }
      console.log(this.form.insurances);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$store.dispatch("user/verification", this.form.contactPhone);
    },

    // 提交订单
    handleSubmit() {
      this.form.air = this.$route.query.id;
      this.form.seat_xid = this.$route.query.seat_xid;
      const rules = {
        users: {
          value: this.form.users[0].username && this.form.users[0].id,
          message: "乘机人不能为空"
        },
        contactName: {
          value: this.form.contactName,
          message: "请输入联系人"
        },
        contactPhone: {
          value: this.form.contactPhone,
          message: "请输入手机号码"
        },
        captcha: {
          value: this.form.captcha,
          message: "请输入验证码"
        }
      };
      let flag = true;
      Object.keys(rules).forEach(v => {
        if (!flag) return;
        if (!rules[v].value) {
          flag = false;
          this.$message.warning(rules[v].message);
        }
      });
      if (flag) {
        const token = this.$store.state.user.userInfo.token;
        this.$axios({
          url: "/airorders",
          method: "post",
          data: this.form,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then(res => {
          console.log(res);
          this.$message.success("订单提交成功");
          const {id} = res.data.data
          console.log(id)
          this.$router.push({ path: "/air/pay", query: { id } });
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>