import {useLocalize} from '@/composables/useLocalize';
import {Actions} from './useFundingManagerActions';

export function useFundingManagerConfig() {
	const {t} = useLocalize();

	function getColumns() {
		const columns = [];

		columns.push({
			header: t('submission.funding.title'),
			component: 'FundingManagerCellFunder',
		});

		columns.push({
			header: '',
			component: 'FundingManagerCellActions',
		});

		return columns;
	}

	function getTopItems() {
		const items = []

		items.push({
			component: 'FundingManagerActionButton',
			props: {
				label: t('grid.action.addDataCitation'),
				action: Actions.FUNDING_ADD_FUNDER,
			},
			isLink: true,
		})

		return items
	}

	function getItemActions() {
		const actions = [];

		actions.push({
			label: t('common.edit'),
			name: Actions.FUNDING_EDIT_FUNDER,
			icon: 'Edit',
		});

		actions.push({
			label: t('common.delete'),
			name: Actions.FUNDING_DELETE_FUNDER,
			icon: 'Cancel',
			isWarnable: true,
		});

		return actions;
	}

	return {
		getColumns,
		getTopItems,
		getItemActions,
	};
}
