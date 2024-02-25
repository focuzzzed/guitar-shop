import { State } from '../../hooks/use-app-selector';
import { NameSpace } from '../../types/enums';

export const getPaginationState = (state: Pick<State, typeof NameSpace.Pagination>) => state.PAGINATION;
