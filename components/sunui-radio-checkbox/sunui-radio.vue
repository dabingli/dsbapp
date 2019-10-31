<template name="sunui-radio">
	<view>
		<view>
			<view class="sunui-radio-group">
				<radio-group @change="radioChange" class="sunui-radio-group">
					<label v-for="(item,index) in radioData" :key="index" class="sunui-radio-label" :class="item.checked ? 'sunui-radio-checkd' : ''">
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
					console.log(this.radioData)
				}
				this.$emit('sendRadioData', e.detail.value);
				// console.log('radio-group:', e.detail.value);
			}
		}
	}
</script>

<style>
	.sunui-radio-label {
		font-size: .7em;
		padding: 2.5% 0;
		margin: 7upx;
		text-align: center;
		border-radius: 5px;
		width: 16%;
		color: #9c9c9c;
		background-color: #fff;
		border: 1px solid #9c9c9c;
		margin-top: 40px;
	}
	.sunui-radio-checkd {
		color: #4c83ff;
		background-color: #fff;
		border: 1px solid #4c83ff;
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
