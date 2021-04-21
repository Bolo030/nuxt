export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    var _hmt = _hmt || []
    ;(function() {
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?2ae3da1a7b612969874283a9a321407a'
      hm.id = 'baidu_tj'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  })
}
