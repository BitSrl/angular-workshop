import { createAction, props } from "@ngrx/store";

export const StartLoading = createAction('[System] Start loading');
export const StopLoading = createAction('[System] Stop loading');
export const Redirect = createAction('[System] Redirect to', props<{ url: string }>());
