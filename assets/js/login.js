$(function () {
  // 点击去注册，则登录隐藏，注册显示
  $(".res-link").on("click", function () {
    $(".log").hide();
    $(".res").show();
  });

  // 点击去登录，则登录隐藏，注册显示
  $(".login-link").on("click", function () {
    $(".res").hide();
    $(".log").show();
  });

  // 点击注册按钮验证表单
  // 从layui中获取layer对象
  var layer = layui.layer;
  // 从layui中获取form对象
  var form = layui.form;
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // value是拿到调用函数输入的值
      // 再拿第一个密码
      var pwd = $(".res-from [name=password]").val();
      if (pwd !== value) return "两次输入的密码不一致";
    },
  });

  // 调用注册接口，进行账号注册
  $(".res-from").submit(function (e) {
    // 阻止a链接默认事件行为的触发
    e.preventDefault();
    // 获取注册表单提交的数据
    var resData = $(this).serialize();
    // 发送ajsx请求获取响应
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: resData,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录！");
        // 注册成功后模拟人的点击去注册跳转打登录页面
        $(".login-link").click();
      },
    });
  });

  // 调用登录接口进行登录
  $(".login-from").submit(function (e) {
    e.preventDefault();
    // 获取登表单提交的数据
    var loginData = $(this).serialize();
    // 发送ajax请求调用登录接口
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: loginData,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功！");
        // 登录成功将token字段保存在localStroge中
        localStorage.setItem("token", res.token);
        // 登录成功之后跳转到index页面
        location.href = "/bigThing/index.html";
      },
    });
  });
});
