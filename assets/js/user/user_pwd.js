$(function () {
  // 定义验证规则
  var layer = layui.form;
  layer.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    newPwd: function (value) {
      if (value === $("input[name='oldPwd']").val()) {
        return "新密码不能与原密码相同";
      }
    },
    rePwd: function (value) {
      if (value !== $("input[name='newPwd']").val()) {
        return "两次新密码应该输入一致";
      }
    },
  });

  // 监听表单提交发起重置密码请求
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return "更新密码失败";
        }
        layui.layer.msg("更新密码成功");
        $(".layui-form")[0].reset();
      },
    });
  });
});
