import { createReducer, on } from "@ngrx/store";
import { SystemActions } from "../action-types/system.action-types";
import { SystemState } from "../states/system.state";

const INIT_STATE: SystemState = {
  loading: false
};

export const systemReducers = createReducer(
  INIT_STATE,
  on(SystemActions.StartLoading, (state: SystemState) => ({ ...state, loading: true })),
  on(SystemActions.StopLoading, (state: SystemState) => ({ ...state, loading: false }))
);