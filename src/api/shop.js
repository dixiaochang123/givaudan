import request1 from '@/utils/request1'

//轮播图
export function getBanner1() {
    return request1({
        url: '/api/public/?service=PcHome.GetTjMatch&cid=14',
        method: 'get'
    })
}
//商品详情
export function GetGoodsDetail(id) {
    return request1({
        url: `/api/public/?service=Mall.GetGoodsDetail&goods_id=${id}`,
        method: 'get'
    })
}
//热门城市
export function GetHotCities() {
    return request1({
        url: `/api/public/?service=Area.GetHotCities`,
        method: 'get'
    })
}
//省市区
export function GetDefaultAreaInfo() {
    return request1({
        url: `/api/public/?service=Area.GetDefaultAreaInfo`,
        method: 'get'
    })
}
//省市区
export function GetShoppingAddress(data) {
    return request1({
        url: `/api/public/?service=Mall.GetShoppingAddress&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
//市区信息
export function GetCity(provinceID) {
    return request1({
        url: `/api/public/?service=Area.GetCity&provinceID=${provinceID}`,
        method: 'get'
    })
}
//添加地址
export function SetShoppingAddress(data) {
    let params = "";
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            params+=`&${key}=${data[key]}`
            
        }
    }
    return request1({
        url: `/api/public/?service=Mall.SetShoppingAddress${params}`,
        method: 'get'
    })
}
//获取火花币
export function GetUserAccount(data) {
    return request1({
        url: `/api/public/?service=User.GetUserAccount&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
