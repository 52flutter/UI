import 'babel-polyfill';
import dva from 'dva';
//import './index.less';
import './utils/index.js';
import { browserHistory } from 'dva/router';
String.prototype.startsWith=function(str){
  var reg=new RegExp("^"+str);
  return reg.test(this);
}
String.prototype.endWith=function(str){
  var reg=new RegExp(str+"$");
  return reg.test(this);
}
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

