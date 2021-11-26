import request1 from '@/utils/request1'
import request from '@/utils/request'

//首页
export function getHomeList(data) {
    return request({
      url: `/qc_web/mobile/getHomeList`,
      method: 'post',
      data
    })
  }