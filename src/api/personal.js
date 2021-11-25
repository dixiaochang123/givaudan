import request1 from '@/utils/request1'
import request from '@/utils/request'

//个人信息
export function GetUserInfo(data) {
    return request1({
        url: `/api/public/?service=User.GetUserInfo&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
//修改昵称
export function UpdateNickname(data) {
    return request1({
        url: `/api/public/?service=User.UpdateNickname&uid=${data.uid}&token=${data.token}&nickname=${data.nickname}`,
        method: 'get'
    })
}
//修改性别
export function UpdateSex(data) {
    return request1({
        url: `/api/public/?service=User.UpdateSex&uid=${data.uid}&token=${data.token}&sex=${data.sex}`,
        method: 'get'
    })
}
//修改年龄
export function UpdateBirthday(data) {
    return request1({
        url: `/api/public/?service=User.UpdateBirthday&uid=${data.uid}&token=${data.token}&birthday=${data.birthday}`,
        method: 'get'
    })
}

//通知信息
export function GetUserNotice(data) {
    return request1({
        url: `/api/public/?service=User.GetUserNotice&uid=${data.uid}&token=${data.token}&p=${data.page}`,
        method: 'get'
    })
}
//获取信息
export function GetBaseInfo(data) {
    return request1({
        url: `/api/public/?service=User.GetBaseInfo&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}

//获取手机验证码 修改手机
export function GetBindMobileCode(data) {
    return request1({
        url: `/api/public/?service=User.GetBindMobileCode&mobile=${data.mobile}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}

//修改手机
export function UpdateMobile(data) {
    return request1({
        url: `/api/public/?service=User.UpdateMobile&mobile=${data.mobile}&code=${data.code}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
//获取手机验证码  修改密码
export function GetForgetCode(data) {
    return request1({
        url: `/api/public/?service=Login.GetForgetCode&mobile=${data.mobile}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}

//获取手机验证码  修改密码
export function UserForget(data) {
    return request1({
        url: `/api/public/?service=Login.UserForget&mobile=${data.mobile}&password=${data.password}&uid=${data.uid}&token=${data.token}&code=${data.code}`,
        method: 'get'
    })
}

//上传
export function Examples_Upload(data) {
    return request1({
        url: `/api/public/?service=App.Examples_Upload.GoFtp`,
        method: 'post',
        data
    })
}

//反馈
export function CreateData(data) {
    return request1({
        url: `/api/public/?service=App.FeedBack.CreateData`,
        method: 'post',
        data
    })
}

//积分
export function GetIntegral(mobile) {
    return request1({
        url: `/api/public/?service=App.User_User.GetIntegral&mobile=${mobile}`,
        method: 'get'
    })
}
//政策解读
export function getOrganList(data) {
    return request({
        url: `/wjyql/mobile/getOrganList`,
        method: 'post',
        data
    })
}
//政策解读列表
export function getPolicyList(data) {
    return request({
        url: `/wjyql/mobile/getPolicyList`,
        method: 'post',
        data
    })
}
//政策解读详情
export function getPolicyMap(data) {
    return request({
        url: `/wjyql/mobile/getPolicyMap`,
        method: 'post',
        data
    })
}

//政策解读详情附件下载
export function uploadFile(id) {
    return request({
        url: `/wjyql/uploadFile/downloadFile?attachId=${id}`,
        method: 'get',
    })
}


//获取问题列表
export function getProblemList(data) {
    return request({
        url: `/wjyql/mobile/getProblemList`,
        method: 'post',
        data
    })
}

//获取问题详情
export function getProblemMap(data) {
    return request({
        url: `/wjyql/mobile/getProblemMap`,
        method: 'post',
        data
    })
}

//获取帖子列表
export function getPostList(data) {
    return request({
        url: `/wjyql/mobile/getPostList`,
        method: 'post',
        data
    })
}
//获取我的帖子列表
export function getMyPostList(data) {
    return request({
        url: `/wjyql/mobile/getMyPostList`,
        method: 'post',
        data
    })
}
//获取帖子详情
export function getPostMap(data) {
    return request({
        url: `/wjyql/mobile/getPostMap`,
        method: 'post',
        data
    })
}
//	帖子保存或修改
export function postSave(data) {
    return request({
        url: `/wjyql/mobile/postSave`,
        method: 'post',
        data
    })
}

//	获取通知列表
export function getNoticeList(data) {
    return request({
        url: `/wjyql/mobile/getNoticeList`,
        method: 'post',
        data
    })
}

//	获取通知列表
export function messagegetProblemMap(data) {
    return request({
        url: `/wjyql/mobile/getNoticeMap`,
        method: 'post',
        data
    })
}


//	首页
export function getHomeList(data) {
    return request({
        url: `/wjyql/mobile/getHomeList`,
        method: 'post',
        data
    })
}

//	注册
export function doRegister(data) {
    return request({
        url: `/wjyql/mobile/doRegister`,
        method: 'post',
        data
    })
}

//	5、	获取账号属性
export function getCombox(data) {
    return request({
        url: `/wjyql/sys/getCombox?table=t_sys_data&where=pid=ISFR&orderby=sorder asc`,
        method: 'post',
        data
    })
}
//	5、	获取账号属性
export function getgridCombox(data) {
    return request({
        url: `/wjyql/sys/getCombox?table=t_sys_grid&where=delete_mark=1&orderby=createtime asc`,
        method: 'post',
        data
    })
}
//	5、	修改
export function doUpdate(data) {
    return request({
        url: `/wjyql/mobile/doUpdate`,
        method: 'post',
        data
    })
}
//	诉求表单提交
export function appealSave(data) {
    return request({
        url: `/wjyql/mobile/appealSave`,
        method: 'post',
        data
    })
}
// 获取服务类型
export function getsysCombox(data) {
    return request({
        url: `/wjyql/sys/getCombox?table=t_sys_data&where=pid=SER_TYPE&orderby=sorder asc`,
        method: 'post',
        data
    })
}
// 23、	获取我的诉求列表
export function getMyAppealList(data) {
    return request({
        url: `/wjyql/mobile/getMyAppealList`,
        method: 'post',
        data
    })
}

// 23、	诉求详情
export function getAppealMap(data) {
    return request({
        url: `/wjyql/mobile/getAppealMap`,
        method: 'post',
        data
    })
}

// 23、评价
export function appealAssess(data) {
    return request({
        url: `/wjyql/mobile/appealAssess`,
        method: 'post',
        data
    })
}
// 23、获取个人信息
export function getUserInfo(data) {
    return request({
        url: `/wjyql/mobile/getUserInfo`,
        method: 'post',
        data
    })
}
// 23、删除帖子
export function doDelete(id) {
    return request({
        url: `/wjyql/sys/doDelete?id=${id}&table=t_post_post&delete_mark=update`,
        method: 'post'
    })
}

