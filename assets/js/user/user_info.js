$(function () {
  // 验证表单
  var form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });

  // 初始化用户基本信息
  initUserInfo();

  // 监听表单的提交事件调用更新接口更新用户的基本信息
  $(".layui-form").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    // 发起请求更新用户的信息
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("更新用户信息失败");
        }
        layui.layer.msg("更新用户信息成功");
        // // 如果更新用户信息成功，重新调用父亲的获取用户信息函数
        window.parent.renderAvater();
      },
    });
  });

  // 实现表单的重置效果
  $("#resetForm").on("click", function (e) {
    e.preventDefault;
    initUserInfo();
  });
});

function initUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) {
        return "获取用户信息失败";
      }
      // 使用layui的方法给表单赋值
      var form = layui.form;
      form.val("userInfoForm", res.data);
    },
  });
}
