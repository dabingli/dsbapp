<template name="sunui-radio">
	<view>
		<view>
			<view class="sunui-radio-group">
				<radio-group @change="radioChange" class="sunui-radio-group">
					<label v-for="(item,index) in radioData" :key="index" :class="[item.checked ? 'sunui-radio-checkd' : '']" class="sunui-radio-label">
						<radio :value="item[value]" :checked="item.checked" />
						<text>{{item[name]}}</text>
					</label>
				</radio-group>
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
		name: 'sunui-radio',
		props: {
			name: {
				type: String,
				default: function() {
					return `name`
				}
			},
			value: {
				type: String,
				default: function() {
					return `value`
				}
			},
			radioData: {
				type: Array
			}
		},
		methods: {
			radioChange(e) {
				for (let i = 0, len = this.radioData.length; i < this.radioData.length; i++) {
					this.radioData[i].value == e.detail.value ? this.radioData[i].checked = true : this.radioData[i].checked = false;
				}
				this.$emit('sendRadioData', e.detail.value);
				// console.log('radio-group:', e.detail.value);
			}
		}
	}
</script>

<style scoped>
	/* 
		这里修改成你需要的样式,譬如边框,背景颜色(Step.1)
	*/
	.sunui-radio-label {
		font-size: .7em;
		padding: 2.5%;
		margin: 7upx;
		text-align: center;
		background-color: #eee;
		border-radius: 5upx;
		width: 100%;
	}
	/* 
		这里修改成你需要的样式,譬如激活边框以及背景颜色(Step.2)
	 */
	.sunui-radio-checkd {
		color: #fff;
		background-color: #00C777;
	}

	.sunui-radio-group {
		display: flex;
		flex-wrap: wrap;
		width: 100vw;
	}

	.sunui-radio-group radio {
		display: none;
	}
</style>
