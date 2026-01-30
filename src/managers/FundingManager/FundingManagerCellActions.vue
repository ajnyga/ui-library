<template>
	<TableCell>
		<DropdownActions
			button-variant="ellipsis"
			:label="t('common.moreActions')"
			:actions="fundingManagerStore.getItemActions()"
			@action="(actionName) => handleAction(actionName, funder)"
		/>
	</TableCell>
</template>

<script setup>
import {computed} from 'vue';
import {useLocalize} from '@/composables/useLocalize';
import TableCell from '@/components/Table/TableCell.vue';
import DropdownActions from '@/components/DropdownActions/DropdownActions.vue';
import {useFundingManagerStore} from './fundingManagerStore.js';

const {t} = useLocalize();

const props = defineProps({
	funder: {type: Object, required: true},
});

const funder = computed(() => props.funder);

const fundingManagerStore = useFundingManagerStore();

function handleAction(actionName, funder) {
	fundingManagerStore[actionName]({funder});
}
</script>
