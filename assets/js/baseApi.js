// 调用ajaxprefilter()来统一拼接请求的根路径
// 每次发送ajax请求之前都会自动调用该函数,并且将配置对象通过参数传递进来
// 然后将url进行拼接
$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  // 判断用户的请求路径中是否包含了/my/
  // 如果包含就添加请求头
  if (options.url.indexOf("/my/") !== -1)
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };

  // 控制用户访问权限，
  options.complete = function (res) {
    // console.log(res.responseJSON);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 认证失败就清楚token跳转首页
      localStorage.removeItem("token");
      location.href = "/bigThing/login.html";
    }
  };
});
