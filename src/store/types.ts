import { LayoutState } from "./layout";
import { UserState } from "./user";

export interface RootState {
  user: UserState;
  layout: LayoutState;
}

export type { UserState, LayoutState };
