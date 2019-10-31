<template name="sunui-checkbox">
	<view>
		<view>
			<view class="sunui-checkbox-group">
				<checkbox-group @change="checkboxChange" class="sunui-checkbox-group">
					<label v-for="(item,index) in checkboxData" :key="index" :class="[item.checked ? 'sunui-checkbox-checkd' : '']" class="sunui-chekcbox-label">
						<checkbox :value="item[value]" :checked="item.checked" />
						<text>{{item[name]}}</text>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		name: 'sunui-checkbox',
		props: {
			name: {
				type: String,
				default:function(){
					return `name`
				}
			},
			value: {
				type: String,
				default:function(){
					return `value`
				}
			},
			checkboxData: {
				type: Array
			}
		},
		methods: {
			checkboxChange(e) {
				for (let i = 0, len = this.checkboxData.length; i < len; i++) {
					e.detail.value.includes(this.checkboxData[i].value) ? this.checkboxData[i].checked = true : this.checkboxData[i].checked =
						false;
				}
				this.$emit('sendCheckboxData', e.detail.value);
				// console.log('checkbox-group:', e.detail.value)
			}
		}
	}
</script>

<style scoped>
	/* 	
		sunui-chekcbox-label
		这里修改成你需要的样式,譬如边框,背景颜色(Step.1)
	*/
	.sunui-chekcbox-label {
		font-size: .7em;
		height: 30upx;
		line-height: 30upx;
		padding: 2.5%;
		margin: 12upx;
		text-align: center;
		background-color: #eee;
		border-radius: 5upx;
		width: 50%;

	}

	.sunui-checkbox-group {
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
				display: flex;
		flex-direction: row;
	}

	/* 
		sunui-checkbox-checkd
		这里修改成你需要的样式,譬如激活边框以及背景颜色(Step.2)
	 */
	.sunui-checkbox-checkd {
		color: #fff;
		background-color: #00C777;
	}

	.sunui-checkbox-group checkbox {
		display: none;
	}

	.sunui-checkbox-group {
		display: flex;
		flex-wrap: wrap;
		width: 100vw;
	}
</style>
