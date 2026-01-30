<template>
	<TableCell :is-row-header="false">
		<div>
			<div class="text-lg-normal">
				<div class="pt-2 text-secondary">{{ funder.name }}</div>
			</div>
			<div>
				<span v-if="funder.identifier">{{ funder.identifier }}</span>
			</div>
		</div>
	</TableCell>
</template>

<script setup>
import {computed} from 'vue';
import TableCell from '@/components/Table/TableCell.vue';

const props = defineProps({
	funder: {type: Object, required: true},
});

const funder = computed(() => props.funder);

</script>
