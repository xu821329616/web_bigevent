$(function () {
  // 调用渲染头像函数
  renderAvater();

  // 实现退出功能
  $(".quit").on("click", function () {
    quit();
  });
});

// 渲染头像的函数
function renderAvater() {
  // 发起请求获取用户信息
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: {},
    // 该接口请求头要携带从本地缓存中获取的token()
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      // 调用获取用户信息函数
      getUserInfo(res.data);
    },

    // 控制用户访问权限
    // complete: function (res) {
    //   console.log(res.responseJSON);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 认证失败就清楚token跳转首页
    //     localStorage.removeItem("token");
    //     location.href = "/bigThing/login.html";
    //   }
    // },
  });
}

// 获取用户信息函数
function getUserInfo(user) {
  // 获取用户的昵称和id
  var name = user.nickname || user.username;
  // 将用户的昵称渲染到页面
  $(".text-avater").html("欢迎&nbsp;&nbsp;" + name);
  // 判断个人信息中有没有用户头像，如果有用户头像就渲染到页面
  if (user.user_pic !== null) {
    $(".avater").hide();
    $(".layui-nav-img").attr("src", user.user_pic).show;
  } else {
    $(".layui-nav-img").hide();
    // 如果没有用户头像，就取名称的第一个字母自定义个头像
    $(".avater").html(name[0].toUpperCase()).show();
  }
}

// 退出函数
function quit() {
  // 弹出提示框
  layui.layer.confirm("您真的要退出吗?", { icon: 3, title: "提示" }, function (
    index
  ) {
    // 先清空缓存
    localStorage.removeItem("token");
    // 然后跳转到首页
    location.href = "/bigThing/login.html";

    layer.close(index);
  });
}
