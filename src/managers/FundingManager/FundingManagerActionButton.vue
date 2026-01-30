<template>
	<PkpButton
		:is-primary="isPrimary"
		:is-secondary="isSecondary"
		:is-warnable="isWarnable"
		:is-link="isLink"
		@click="() => fundingManagerStore[action](actionArgs)"
	>
		{{ label }}
	</PkpButton>
</template>
<script setup>
import PkpButton from '@/components/Button/Button.vue';
import {useFundingManagerStore} from './fundingManagerStore';

const fundingManagerStore = useFundingManagerStore();

defineProps({
	isPrimary: { type: Boolean, default: false },
	isSecondary: { type: Boolean, default: false },
	isWarnable: { type: Boolean, default: false },
	action: { type: String, required: true },
	actionArgs: { type: Object, default: () => ({}) },
	isLink: { type: Boolean, default: false },
	label: { type: String, required: true },
})
</script>