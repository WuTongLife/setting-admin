export interface IUserReducer {}

const initState: IUserReducer = {};

export const userReducer = <T, P = {}>(state: IUserReducer = initState, action: IReducer.IAction<P>) => {
  switch (action.type) {
    case '':
      break;

    default:
      break;
  }
};
