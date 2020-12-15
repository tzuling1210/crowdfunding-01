import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import format from "vue-text-format";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
Vue.use(BootstrapVue);
Vue.use(format);
Vue.use(Highcharts);
Vue.use(HighchartsVue);

// 讓瀏覽器的全域環境可以使用到 $
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

// 千位數
Vue.filter("point", function(num) {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + parts.join(".");
});

// loading
var $loading = $("#loading");
window.onload = () => {
  $loading.hide();
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
