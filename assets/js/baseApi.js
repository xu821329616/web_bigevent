// 调用ajaxprefilter()来统一拼接请求的根路径
// 每次发送ajax请求之前都会自动调用该函数,并且将配置对象通过参数传递进来
// 然后将url进行拼接
$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
});
