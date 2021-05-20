import Vue from 'vue'
import App from './components/App.vue'
import ApolloClient from 'apollo-boost'
import VueApollo from "vue-apollo";

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: '/localhost'
  })
});

Vue.config.productionTip = false
Vue.use(VueApollo);

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
})
