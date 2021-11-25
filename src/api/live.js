import request1 from '@/utils/request1'

//直播间信息
export function LiveRoom(data) {
  return request1({
    url: `/api/public/?service=PcLive.LiveRoom&roomNum=${data.roomNum}&uid=${data.uid}&token=${data.token}`,
    method: 'get',
  })
}
//发弹幕
export function GetBlackList(data) {
  return request1({
    url: `/api/public/?service=SysConfig.GetBlackList&uid=${data.uid}&token=${data.token}`,
    method: 'get',
  })
}
//关注
export function SetAttent(data) {
  return request1({
    url: `/api/public/?service=User.SetAttent&touid=${data.touid}&uid=${data.uid}&token=${data.token}`,
    method: 'get',
  })
}
//关注
export function GetGuestRong(deviceKey) {
  return request1({
    url: `/api/public/?service=Login.GetGuestRong&deviceKey=${deviceKey}`,
    method: 'get',
  })
}

