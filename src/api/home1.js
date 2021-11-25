import request1 from '@/utils/request1'

/*
*轮播图
*/
export function getBanner1() {
  return request1({
    url: '/api/public/?service=PcHome.GetBanner&cid=9',
    method: 'get'
  })
}

/*
* 赛程
* */
export function GetAllMatch(number) {
  return request1({
    url: `/api/public/?service=PcHome.GetTjMatch&state=${number}`,
    method: 'get'
  })
}

/*
* 推荐直播
* */
export function GetRecommend() {
  return request1({
    url: `/api/public/?service=PcLive.GetRecommend`,
    method: 'get'
  })
}

//主播排行榜
export function getRank() {
  return request1({
    // url: '/api/public/?service=PcHome.GetBanner&cid=9',
    url: '/api/public/?service=PcHome.GetRank&rank=4&type=1',
    method: 'get'
  })
}

//主播排行榜
export function GetTjMatch() {
  return request1({
    // url: '/api/public/?service=PcHome.GetBanner&cid=9',
    url: '/api/public/?service=PcHome.GetTjMatch',
    method: 'get'
  })
}
