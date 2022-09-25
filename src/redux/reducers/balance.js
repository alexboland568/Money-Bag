import { round } from '../../utils/number';
import { INVEST_AMOUNT, INCREASE_BALANCE, DECREASE_BALANCE } from "../actionTypes";


const initialState = {
  amount: 0
};

export default function(state = initialState, action) {

  console.log(action);
  switch (action.type) {

    case INVEST_AMOUNT: {

      return {

        amount: action.payload.amount

      };

    }
    case INCREASE_BALANCE: {
      return {
        amount: round(state.amount + action.payload.amount)
      };
    }
    case DECREASE_BALANCE: {
      return {
        amount: round(state.amount - action.payload.amount)
      };
    }
    default:
      return state;
  }
}
