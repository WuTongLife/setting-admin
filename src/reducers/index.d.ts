declare namespace IReducer {
  export interface IAction<P> {
    type: string;
    payload: P;
  }
}
