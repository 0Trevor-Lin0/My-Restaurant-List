function initMap (coordinate) {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15, // 放大的倍率
    center: coordinate || { lat: 25.0338041, lng: 121.5623674 }// 初始化的地圖中心位置
  })
  // 製作一個標記點
  const marker = new google.maps.Marker({
    position: coordinate || { lat: 25.0338041, lng: 121.5623674 }, // marker的放置位置
    map: map // 這邊的map指的是第四行的map變數
  })
  return marker
}
