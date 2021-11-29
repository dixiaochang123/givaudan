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
  //4、	获取留样柜类型
export function getComboxFromJson() {
    return request({
      url: `/qc_web/sys/getComboxFromJson`,
      method: 'post',
      data:{
        "TABLE":"t_sys_data",
        "WHERE":"pid=SARK",	
        "ORDERBY":"sorder asc",
        "FIELD":"",			
        "GROUPBY":""	
    
      }
    })
  }
  //4、	获取留样柜类型 三级联动 1级
export function getSarkList(data) {
    return request({
      url: `/qc_web/mobile/getSarkList`,
      method: 'post',
      data
    })
  }
  //4、	获取留样柜类型 三级联动 2级
export function getTrayList(data) {
    return request({
      url: `/qc_web/mobile/getTrayList`,
      method: 'post',
      data
    })
  }
  //4、	获取留样柜类型 三级联动 3级
export function getSmallTrayList(data) {
    return request({
      url: `/qc_web/mobile/getSmallTrayList`,
      method: 'post',
      data
    })
  }
  //4、	样本列表
export function getSampleList(data) {
    return request({
      url: `/qc_web/mobile/getSampleList`,
      method: 'post',
      data
    })
  }
  //4、	样本详情
export function getSampleMap(data) {
    return request({
      url: `/qc_web/mobile/getSampleMap`,
      method: 'post',
      data
    })
  }
  //4、	样本操作
export function updateSample(data) {
    return request({
      url: `/qc_web/mobile/updateSample`,
      method: 'post',
      data
    })
  }