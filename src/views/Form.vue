<template>
  <div>
    <body id="app">
      <form
        class="container"
        @submit.prevent="checkForm"
        action="/sonwhere"
        method="post"
      >
        <div class="formTitle">
          <h3>填寫募資方案資料</h3>
        </div>
        <div class="row-cols-md-1 text-left">
          <p>募資方案名稱：</p>
          <input class="name" v-model="name" placeholder="請輸入募資方案名稱" />
          <p>類別：</p>
          <select class="type" v-model="type">
            <option v-for="type in types" :key="type.id" :type="type">{{
              type
            }}</option>
          </select>
          <p>目標金額(元)：</p>
          <input
            class="amount"
            v-model.number="amount"
            type="number"
            placeholder="請輸入目標金額"
          />
          <p>募資期間(天)：</p>
          <input
            class="period"
            v-model.number="period"
            type="number"
            placeholder="請輸入募資期間"
          />
          <p>回饋方案數(種)：</p>
          <input
            class="feedback_num"
            v-model.number="feedback_num"
            type="number"
            placeholder="請輸入回饋方案數"
          />
          <p>內容簡介：</p>
          <textarea
            class="content"
            v-model="content"
            placeholder="請輸入募資方案內容簡介"
          ></textarea>
          <div class="error" v-if="errors.length">
            <img class="error_img" src="https://i.imgur.com/nYqtCEr.png" /><span
              class="error_msg"
              >請輸入<span v-for="(error, index) in errors" :key="error.id"
                ><span>{{ error }}</span
                ><span v-if="index+1 &lt; errors.length">、</span></span
              ></span
            >
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-1">
          <div>
            <input
              class="purple_button btn_confirm"
              type="submit"
              value="確認"
              @click="showLoading"
            />
            <input
              class="purple_button btn_cancel"
              type="reset"
              value="取消"
              @click="goHome"
            />
          </div>
          <div class="loading" id="loading" style="display: none;">
            <div class="loadingContent">
              <div class="loadingCircle"></div>
              <img
                class="loadingImg"
                src="https://i.imgur.com/Xj4d0iN.png"
                width="100%"
                height=""
              />
              <div class="loadingText">loading</div>
              <div class="loadingPoint1"></div>
              <div class="loadingPoint2"></div>
              <div class="loadingPoint3"></div>
            </div>
          </div>
        </div>
      </form>
    </body>
  </div>
</template>

<style>
@keyframes scaleDraw {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
}

@keyframes ShowDraw1 {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.2;
  }
  50% {
    vopacity: 0.2;
  }
  75% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.2;
  }
}

@keyframes ShowDraw2 {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.2;
  }
}

@keyframes ShowDraw3 {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.2;
  }
  75% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

* {
  /* border: solid 1px; */
  font-family: "微軟正黑體";
  position: relative;
  transition-duration: 0.3s;
  list-style-type: none;
  letter-spacing: 1.5px;
  line-height: 25px;
  color: #41404b;
  vertical-align: top;
  font-size: 14px;
}

/* loading */
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 99;
}

.loadingContent {
  width: 150px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -75px 0 0 -75px;
}

.loadingCircle {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: linear-gradient(to right, #be78d1 0%, #281483 100%);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -70px 0 0 -50px;
  /* 動畫 */
  -webkit-animation-name: scaleDraw;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 5s;
}

.loadingImg {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -70px 0 0 -50px;
}

.loadingText {
  width: 100px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 50px 0 0 -65px;
  font-weight: 550;
  color: #281483;
}

.loadingPoint1 {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #281483;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 65px 0 0 20px;
  /* 動畫 */
  -webkit-animation-name: ShowDraw1;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 1.5s;
  /* animation-delay: 1s; */
}

.loadingPoint2 {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #281483;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 65px 0 0 30px;
  /* 動畫 */
  -webkit-animation-name: ShowDraw2;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 1.5s;
  /* animation-delay: 1s; */
}

.loadingPoint3 {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #281483;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 65px 0 0 40px;
  /* 動畫 */
  -webkit-animation-name: ShowDraw3;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 1.5s;
  /* animation-delay: 1s; */
}

.bg {
  margin: 0;
  padding-top: 30px;
  background-color: #f5f5f5;
}

.formTitle > h3 {
  font-weight: 550;
  padding: 110px 60px 30px 60px;
}

.name,
.amount,
.type,
.period,
.feedback_num,
.content {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.2);
  border: 0px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 30px;
}

.name,
.amount {
  width: 50%;
}

.type {
  cursor: pointer;
}

.content {
  width: 100%;
  height: 300px;
}

.purple_button {
  background: #281483;
  border: 0px;
  border-radius: 30px;
  color: white;
  font-weight: 550;
  padding: 10px 40px;
  margin: 30px 40px 40px 40px;
  outline: none;
}

.purple_button:hover {
  background: linear-gradient(to right, #281483 0%, #be78d1 100%);
}

.purple_button:active {
  background: linear-gradient(to right, #281483 0%, #be78d1 100%);
}

.error {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: #fcd4dc;
  font-weight: 550px;
}
.error_img {
  width: 20px;
  height: 20px;
  top: -2px;
}

.error_img,
.error_msg {
  margin: 0px 5px;
}
</style>

<script>
import jQuery from "jquery";
import $ from "jquery";
// loading
// var $loading = $("#loading");
// window.onload = () => {
//   $loading.hide();
// };

export default {
  data() {
    return {
      name: null,
      amount: null,
      types: [
        "音樂",
        "攝影",
        "出版",
        "時尚",
        "設計",
        "表演",
        "藝術",
        "科技",
        "教育",
        "遊戲",
        "飲食",
        "空間",
        "社會",
        "在地",
        "公共",
        "影視",
        "休閒",
        "運動",
        "旅行",
        "插畫漫畫",
        "電影動畫",
        "地方創生"
      ],
      type: null,
      content: null,
      projects: [],
      errors: [],
      period: null,
      feedback_num: null
    };
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    showLoading() {
      $("#loading").show();
    },
    checkForm: function(e) {
      //拿到資料跳到結果頁面
      if (
        this.name &&
        this.amount &&
        this.type &&
        this.content &&
        this.period &&
        this.feedback_num
      ) {
        let project_data = {
          name: this.name,
          amount: this.amount,
          type: this.type,
          content: this.content,
          period: this.period,
          feedback_num: this.feedback_num
        };
        this.projects.push(project_data);
        // 跳轉至最後一頁
        this.$router.push({ path: "/result" });
      }
      //資料有缺則跳出警告
      this.errors = [];
      if (!this.name) this.errors.push("募資方案");
      if (!this.type) this.errors.push("類別");
      if (!this.amount) this.errors.push("目標金額");
      if (!this.period) this.errors.push("募資期間");
      if (!this.feedback_num) this.errors.push("回饋方案數");
      if (!this.content) this.errors.push("內容簡介");

      e.preventDefault();
    }
  }
};
</script>
