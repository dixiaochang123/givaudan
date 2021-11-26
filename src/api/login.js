import request1 from '@/utils/request1'
import request from '@/utils/request'

//登录
export function Login(data) {
  return request1({
    url: `/api/public/?service=Login.UserLoginRong&user_login=${data.user_login}&user_pass=${data.user_pass}`,
    method: 'get',
  })
}
//手机验证码 登录
export function CodeLoginRong(data) {
  return request1({
    url: `/api/public/?service=Login.CodeLoginRong&mobile=${data.mobile}&code=${data.code}`,
    method: 'get',
  })
}
//获取手机验证码 登录
export function GetLoginCode(mobile) {
  return request1({
    url: `/api/public/?service=Login.GetLoginCode&mobile=${mobile}`,
    method: 'get',
  })
}
//获取手机验证码 注册
export function GetCode(mobile) {
  return request1({
    url: `/api/public/?service=Login.GetCode&mobile=${mobile}`,
    method: 'get',
  })
}
//注册
export function UserRegister(data) {
  return request1({
    url: `/api/public/?service=Login.UserRegister&user_login=${data.user_login}&code=${data.code}&user_pass=${data.user_pass}`,
    method: 'get',
  })
}
//重置密码发送短信接口
export function SendResetCode(mobile) {
  return request1({
    url: `/api/public/?service=User.SendResetCode&mobile=${mobile}`,
    method: 'get',
  })
}
//重置密码提交
export function ResetPassword(data) {
  return request1({
    url: `/api/public/?service=User.ResetPassword&mobile=${data.mobile}&newPassword=${data.newPassword}&mobileCode=${data.mobileCode}`,
    method: 'get',
  })
}
//登录
export function Login1(data) {
  return request({
    url: `/qc_web/mobile/doLogin`,
    method: 'post',
    data
  })
}