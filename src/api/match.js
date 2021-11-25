import request1 from '@/utils/request1'

//全部赛程
export function GetAllMatch(state) {
    return request1({
        url: `/api/public/?service=Match.GetAllMatch&state=${state}`,
        method: 'get'
    })
}
//足球
export function GetFootball(data) {
    return request1({
        url: `/api/public/?service=Football.GetMatch&date=${data.date}&page=${data.page}`,
        method: 'get'
    })
}
//篮球
export function GetBasketball(data) {
    return request1({
        url: `/api/public/?service=Basketball.GetMatch&date=${data.date}&page=${data.page}`,
        method: 'get'
    })
}
//预约
export function GetReservationList(data) {
    return request1({
        url: `/api/public/?service=Match.GetReservationList&date=${data.date}&page=${data.page}&size=15&${data.page}&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
// export function GetReservationList(data) {
//     return request1({
//         url: `/api/public/?service=Match.GetMatchList&type=${data.type}&date=${data.date}&page=${data.page}&token=${data.token}&uid=${data.uid}`,
//         method: 'get'
//     })
// }
//添加预约
export function Reservation(data) {
    let params = "";
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            params+=`&${key}=${data[key]}`
            
        }
    }
    return request1({
        url: `/api/public/?service=Match.Reservation${params}`,
        method: 'get'
    })
}
//赛事详情
export function GetMatchDetail(data) {
    return request1({
        url: `/api/public/?service=Match.GetDetail&type=${data.liveType}&matchId=${data.matchId}`,
        method: 'get'
    })
}
//时间
export function GetDate() {
    return request1({
        url: `/api/public/?service=Home.GetDate`,
        method: 'get'
    })
}
//主播
export function GetHot() {
    return request1({
        url: `/api/public/?service=Home.GetHot`,
        method: 'get'
    })
}