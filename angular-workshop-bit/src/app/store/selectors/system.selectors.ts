import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { SystemState } from "../states/system.state";

const systemState = (state: AppState): SystemState => state.system;
export const getLoading = createSelector(systemState, (state: SystemState): boolean => state.loading);
