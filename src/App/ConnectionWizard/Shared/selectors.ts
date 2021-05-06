import { State } from 'store/types';

export const getEnvironmentsStatuses = (state: State) => state.wizard.shared.environmentsStatuses;
