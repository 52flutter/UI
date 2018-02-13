"use strict";

// 兼容浏览器IE
String.prototype.startsWith = function (str) {
  var reg = new RegExp("^" + str);
  return reg.test(this);
};
String.prototype.endWith = function (str) {
  var reg = new RegExp(str + "$");
  return reg.test(this);
};

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args[1].toUpperCase();
  });
};

Array.prototype.indexOf = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] == obj) {
      return i;
    }
  }
  return -1;
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};
// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, ("" + this.getFullYear()).substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
//# sourceMappingURL=index.js.map