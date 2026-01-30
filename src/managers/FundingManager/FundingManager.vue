<template>
	<PkpTable :aria-label="t('submission.funding')">
		<template #label>
			<h3 class="text-4 font-semibold">
				{{ t('submission.funding') }}
			</h3>
			<span class="text-lg-normal">
				{{ t('submission.funding.description') }}
			</span>
		</template>
		<template #top-controls>
			<div class="flex gap-x-2">
				<component
					:is="Components[action.component] || action.component"
					v-bind="action.props || {}"
					v-for="(action, i) in fundingManagerStore.topItems"
					:key="i"
				></component>
			</div>
		</template>
		<TableHeader>
			<TableColumn
				v-for="(column, i) in fundingManagerStore.columns"
				:key="i"
				:class="i > 0 ? '!w-16 !text-center' : ''"
			>
				<span v-if="column.isHeaderComponent">
					<component :is="Components[column.header] || column.header" />
				</span>
				<span v-else :class="column.headerSrOnly ? 'sr-only' : ''">
					{{ column.header }}
				</span>
			</TableColumn>
		</TableHeader>
		<TableBody
			:empty-text="t('submission.funding.emptyFunders')"
		>
			<TableRow
			v-for="funder in fundingManagerStore.funding"
			:key="funder.id"
			>
			<component
				:is="Components[column.component] || column.component"
				v-for="(column, index) in fundingManagerStore.columns"
				:key="index"
				:funder="funder"
			/>
			</TableRow>
		</TableBody>
	</PkpTable>
</template>

<script setup>
import {useLocalize} from '@/composables/useLocalize';
import {useFundingManagerStore} from './fundingManagerStore.js';

import PkpTable from '@/components/Table/Table.vue';
import TableColumn from '@/components/Table/TableColumn.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableRow from '@/components/Table/TableRow.vue';

import FundingManagerCellFunder from '@/managers/FundingManager/FundingManagerCellFunder.vue';
import FundingManagerCellActions from '@/managers/FundingManager/FundingManagerCellActions.vue';
import FundingManagerActionButton from '@/managers/FundingManager/FundingManagerActionButton.vue'

const Components = {
	FundingManagerCellFunder,
	FundingManagerCellActions,
	FundingManagerActionButton,
};

const props = defineProps({
	publication: {type: Object, required: true},
	submission: {type: Object, required: true},
	funderEditForm: {type: Object, required: true},
});

const {t} = useLocalize();
const fundingManagerStore = useFundingManagerStore(props);
</script>
