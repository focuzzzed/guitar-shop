import { State } from '../../hooks/use-app-selector';
import { NameSpace } from '../../types/enums';

type PaginationProcessState = Pick<State, typeof NameSpace.Pagination>

export const getPaginationState = (state: PaginationProcessState) => state.PAGINATION;
