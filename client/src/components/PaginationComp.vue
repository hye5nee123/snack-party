<template>
	<div class="col-12">
		<div class="pagination d-flex justify-content-center mt-5">
			<span v-if="leftmostPage > PAGE_PER_SECTION">
				<router-link to="" class="rounded" @click="onPrevClick">&laquo;</router-link>
			</span>

			<span class="page" v-for="page in getPaginationArray(leftmostPage)" :key="page">
				<router-link to="" class="rounded" :class="{ active: page === curPage }"
					@click="onChangeCurPage(page)">{{ page }}</router-link>
			</span>

			<span v-if="leftmostPage + PAGE_PER_SECTION <= totalPage">
				<router-link to="" class="rounded" @click="onNextClick">&raquo;</router-link>
			</span>
		</div>
	</div>

	<!-- <p>totalArticles : {{ TOTAL_ARITCLES }}</p>
	<p>totalPage : {{ totalPage }}</p>
	<p>leftmostPage : {{ leftmostPage }}</p>
	<p>ITEM_PER_PAGE : {{ ITEM_PER_PAGE }}</p>
	<p>PAGE_PER_SECTION : {{ PAGE_PER_SECTION }}</p> -->
</template>

<script>
export default {
	props: {
		ITEM_PER_PAGE: Number,
		PAGE_PER_SECTION: Number,
		TOTAL_ARITCLES: Number,
		CURPAGE: Number,
	},
	data() {
		return {
			curPage: 1,
			leftmostPage: 1,
		};
	},
	watch: {
		CURPAGE() {
			this.curPage = this.CURPAGE;
			this.$emit('change-page', this.curPage);
		}
	},
	computed: {
		totalPage() {
			return Math.ceil(this.TOTAL_ARITCLES / (this.ITEM_PER_PAGE || 1));
		},
	},
	methods: {
		getPaginationArray(left) {
			const res = [];
			for (let i = left; i < Math.min(this.totalPage + 1, left + this.PAGE_PER_SECTION); i++) {
				res.push(i);
			}
			return res;
		},
		onChangeCurPage(page) {
			this.curPage = page;
			this.$emit('change-page', page);
		},
		onPrevClick() {
			this.leftmostPage -= this.PAGE_PER_SECTION;
			this.onChangeCurPage(this.leftmostPage + this.PAGE_PER_SECTION - 1);
		},
		onNextClick() {
			this.leftmostPage += this.PAGE_PER_SECTION;
			this.onChangeCurPage(this.leftmostPage);
		},
	},
};
</script>