import { INVEST_AMOUNT, INCREASE_BALANCE, DECREASE_BALANCE, BUY_BUSINESS, SET_LAST_RUN, HIRE_MANAGER } from './actionTypes';

export const setInvestmentAmount = amount =>({

  type: INVEST_AMOUNT,
  payload: {
    amount
  }

});

export const increaseBalance = amount => ({
  type: INCREASE_BALANCE,
  payload: {
    amount
  }
});

export const decreaseBalance = amount => ({
  type: DECREASE_BALANCE,
  payload: {
    amount
  }
});

export const buyBusiness = (businessId, qty) => ({
  type: BUY_BUSINESS,
  payload: {
    businessId,
    qty
  }
});

export const setLastRun = (businessId) => ({
  type: SET_LAST_RUN,
  payload: {
    businessId
  }
});

export const hireManager = (manager) => ({
  type: HIRE_MANAGER,
  payload: {
    manager
  }
});