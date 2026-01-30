import {computed, toRefs} from 'vue';
import {defineComponentStore} from '@/utils/defineComponentStore';
import {useExtender} from '@/composables/useExtender';
import {useDataChanged} from '@/composables/useDataChanged';
import {useFundingManagerConfig} from './useFundingManagerConfig';
import {useFundingManagerActions} from './useFundingManagerActions';

export const useFundingManagerStore = defineComponentStore(
	'fundingManager',
	(props) => {
		const extender = useExtender();
		const fundingManagerConfig = extender.addFns(
			useFundingManagerConfig(),
		);
		const columns = computed(() => fundingManagerConfig.getColumns());
		const topItems = computed(() => fundingManagerConfig.getTopItems());

		function getItemActions() {
			return fundingManagerConfig.getItemActions();
		}

		const {submission, publication} = toRefs(props);

		// Get funding data from publication prop
		// Funding element contains one or more funder elements
		const funding = computed(
			() => publication.value?.funding ?? [],
		);

		// Use triggerDataChange to notify parent to refetch submission/publication
		const {triggerDataChange} = useDataChanged();

		/**
		 * Actions
		 */
		const fundingManagerActions = useFundingManagerActions();

		function dataUpdateCallback() {
			triggerDataChange();
		}

		function getActionArgs(additionalArgs = {}) {
			return {
				submission: props.submission,
				publication: props.publication,
				funderEditForm: props.funderEditForm,
				...additionalArgs,
			};
		}
		function fundingAddFunder() {
			fundingManagerActions.fundingAddFunder(
				getActionArgs({}),
				dataUpdateCallback,
			);
		}
		function fundingEditFunder({funder}) {
			fundingManagerActions.fundingEditFunder(
				getActionArgs({funder}),
				dataUpdateCallback,
			);
		}
		function fundingDeleteFunder({funder}) {
			fundingManagerActions.fundingDeleteFunder(
				getActionArgs({funder}),
				dataUpdateCallback,
			);
		}

		const store = {
			columns,
			topItems,
			getItemActions,

			submission,
			publication,

			funding,
			fundingAddFunder,
			fundingEditFunder,
			fundingDeleteFunder,
		};

		return store;
	},
);
