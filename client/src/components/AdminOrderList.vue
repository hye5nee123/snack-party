<template>
	<div>
		<p v-for="(item, idx) in articles?.slice(pageStartIdx, pageStartIdx + ITEM_PER_PAGE)" :key="idx">
			{{ item }}
		</p>

		<PaginationTest :list="articles" v-bind="{ ITEM_PER_PAGE, PAGE_PER_SECTION }" @change-page="onChangePage" />
	</div>
</template>

<script>
import PaginationTest from './PaginationTest.vue';
import { ref, computed } from 'vue';

export default {
	components: { PaginationTest },
	setup() {
		const articles = new Array(111);
		for (let i = 0; i < articles.length; i++) {
			articles[i] = `Article ${i + 1}`;
		}

		const ITEM_PER_PAGE = ref(10);
		const PAGE_PER_SECTION = ref(5);
		let curPage = ref(1);

		const pageStartIdx = computed(() => {
			return (curPage.value - 1) * ITEM_PER_PAGE.value;
		});

		const onChangePage = (data) => {
			curPage.value = data;
		};

		return {
			ITEM_PER_PAGE,
			PAGE_PER_SECTION,
			articles,
			pageStartIdx,
			//
			onChangePage,
		};
	},
};
</script>