<script>
import Siteinfo from "siteinfo";
export default {
  onLaunch: function() {
	  setTimeout(function(){
	  	plus.navigator.closeSplashscreen(); 
	  },2000)
		plus.screen.lockOrientation('portrait-primary');
		//监听click事件，用户从消息中心点击触发的
		plus.push.addEventListener(
			"click",
			function(msg) {
				//根据payload传递过来的数据，打开一个详情
				// var payload = msg.payload;
				// 	if (typeof payload === 'string') {  
				// 		payload = JSON.parse(payload);  
				// 	}
				// 	setTimeout(function(a) {
				// 		uni.navigateTo({
				// 			url: `/pages/pushMessageDetail/pushMessageDetail?id=${payload.id}`
				// 		});
				// 	}, 1000);
				var payload = msg.payload;
				if (typeof payload === 'string') {  
					payload = JSON.parse(payload);  
				}
				if(payload.type == 1 || payload.type == 2 || payload.type == 5){
					setTimeout(function(a) {
						uni.navigateTo({
							url: `/pages/pushMessageDetail/pushMessageDetail?id=${payload.id}`
						});
					}, 1000);
				}else{
					setTimeout(function(a) {
						uni.navigateTo({
							url: `/pages/BillDetail/BillDetail`
						});
					}, 1000);
				}
			},
			false
		);
		//监听receive事件
		// plus.push.addEventListener(
		// 	"receive",
		// 	function(msg) {
		// 		var payload = msg.payload;
		// 		if (typeof payload === 'string') {  
		// 			payload = JSON.parse(payload);  
		// 		}
		// 		uni.showModal({
		// 			title: '12323',
		// 			content: payload
		// 		})
		// 		if(payload.type == 1 || payload.type == 2 || payload.type == 5){
		// 			setTimeout(function(a) {
		// 				uni.navigateTo({
		// 					url: `/pages/pushMessageDetail/pushMessageDetail?id=${payload.id}`
		// 				});
		// 			}, 1000);
		// 		}else{
		// 			setTimeout(function(a) {
		// 				uni.navigateTo({
		// 					url: `/pages/billDetail/billDetail`
		// 				});
		// 			}, 1000);
		// 		}
		// 			
		// 		
		// 	},
		// 	false
		// );
  },
  onShow: function() {
		
	},
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "./common/css/uni.css";
@import "./common/css/iconfont.css";
@import "./common/css/common.less";

page{
	padding-bottom: 30px;
}
view{
	color: #474A4D;
}
</style>
