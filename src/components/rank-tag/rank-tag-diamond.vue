<template>
	<div class="rank-tag-diamond" :class="rank">
		<span class="num">{{num}}</span>
	</div>
</template>

<script>
	export default {
		name: 'rank-tag-diamond',
		props: {
			num: {
				type: String,
				default: '1',
			}
		},
		computed: {
			rank: function() {
				var rank = parseInt(this.num);
				var rankName = '';
				if (rank > 0 && rank <= 10) {
					rankName = 'rank1';
				} else if (rank > 10 && rank <= 30) {
					rankName = 'rank2';
				} else if (rank > 30 && rank <= 50) {
					rankName = 'rank3';
				} else if (rank > 50 && rank <= 70) {
					rankName = 'rank4';
				} else if (rank > 70 && rank <= 100) {
					rankName = 'rank5';
				}
				return rankName;
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
	.rank-tag-diamond {
		font-size: 24px;
		line-height: 30px;
		font-weight: bold;
		color: #FFFFFF;
		.num {
			font-size: 24px;
		}

		&.rank1 {
			width: 72px;
			height: 32px;
			background-image: url('../../assets/rank/rank-d-1.png');

			.num {
				margin-left: 40px;
				// float: right;
			}
		}

		&.rank2 {
			width: 72px;
			height: 32px;
			background-image: url('../../assets/rank/rank-d-2.png');

			.num {
				margin-left: 34px;
				// float: right;
			}
		}

		&.rank3 {
			width: 72px;
			height: 32px;
			background-image: url('../../assets/rank/rank-d-3.png');

			.num {
				margin-left: 34px;
				// float: right;
			}
		}

		&.rank4 {
			width: 72px;
			height: 32px;
			background-image: url('../../assets/rank/rank-d-4.png');

			.num {
				margin-left: 34px;
				// float: right;
			}
		}

		&.rank5 {
			width: 86px;
			height: 32px;
			background-image: url('../../assets/rank/rank-d-5.png');

			.num {
				margin-left: 34px;
				// float: right;
			}
		}

	}
</style>
