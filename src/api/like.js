import request1 from '@/utils/request1'

//关注
export function GetFollow(data) {
    return request1({
        url: `/api/public/?service=Adsspj.GetFollow&uid=${data.uid}&page=${data.page}`,
        method: 'get'
    })
}
//关注主播
export function GetNewFollow(data) {
    return request1({
        url: `/api/public/?service=Home.GetNewFollow&uid=${data.uid}&token=${data.token}`,
        method: 'get'
    })
}
