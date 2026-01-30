import {useForm} from '@/composables/useForm';
import FundingEditModal from '@/managers/FundingManager/modals/FundingEditModal.vue';
import {useModal} from '@/composables/useModal';
import {useLocalize} from '@/composables/useLocalize';
import {useUrl} from '@/composables/useUrl';
import {cloneDeep} from 'lodash';
import {useFetch} from '@/composables/useFetch';

export const Actions = {
	FUNDING_ADD_FUNDER: 'fundingAddFunder',
	FUNDING_EDIT_FUNDER: 'fundingEditFunder',
	FUNDING_DELETE_FUNDER: 'fundingDeleteFunder',
};
export function useFundingManagerActions() {
	const {openDialog, openSideModal} = useModal();
	const {t} = useLocalize();

	function fundingAddFunder(
		{publication, funderEditForm},
		finishedCallback,
	) {

		const {apiUrl} = useUrl(`funding/publications/${publication.id}`);
		const addForm = cloneDeep(funderEditForm);

		const {form, setAction} = useForm(addForm);
		setAction(apiUrl.value);
		openSideModal(FundingEditModal, {
			title: t('submission.funding.addModal.title'),
			form: form,
			onSuccess: () => {
				finishedCallback();
			},
		});
	}

	function fundingEditFunder(
		{publication, funderEditForm, funder},
		finishedCallback,
	) {
		if (!funder.authors) {
			funder.authors = [];
		}
		
		const {apiUrl} = useUrl(`funding/publications/${publication.id}/${funder.id}`);
		const editForm = cloneDeep(funderEditForm);

		const {form, set, setValues, setAction, setMethod} = useForm(editForm);
		setValues(funder);
		setAction(apiUrl.value);
		setMethod('PUT');
		openSideModal(FundingEditModal, {
			title: t('submission.funding.editModal.title'),
			form: form,
			funder: funder,
			onSet: set,
			onSuccess: () => {
				finishedCallback();
			},
		});
	}

	function fundingDeleteFunder(
		{publication, funder},
		finishedCallback,
	) {
		openDialog({
			title: t('common.delete'),
			message: t('common.confirmDelete'),
			modalStyle: 'negative',
			actions: [
				{
					label: t('common.ok'),
					isWarnable: true,
					callback: async (close) => {
						const {apiUrl} = useUrl(`funding/publications/${publication.id}`);
						const {fetch} = useFetch(`${apiUrl.value}/${funder.id}`, {
							method: 'DELETE',
						});
						await fetch();
						finishedCallback();
						close();
					},
				},
				{
					label: t('common.cancel'),
					isSecondary: true,
					callback: (close) => {
						close();
					},
				},
			],
		});
	}

	return {
		fundingAddFunder,
		fundingEditFunder,
		fundingDeleteFunder,
	};
}
