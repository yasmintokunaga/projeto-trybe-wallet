import { fetchAPICurrencies } from '../../services/fetchAPI';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const saveUser = (email) => ({
  type: SAVE_USER,
  payload: email,
});

export const saveCurrencies = (listCurrencies) => ({
  type: SAVE_CURRENCIES,
  payload: listCurrencies,
});

export const saveExpenses = (expense) => ({
  type: SAVE_EXPENSES,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEditExpense = (updates) => ({
  type: UPDATE_EXPENSE,
  payload: updates,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  const result = await fetchAPICurrencies();
  const arrayOfCodes = Object.keys(result);
  dispatch(saveCurrencies(
    arrayOfCodes.filter((code) => code !== 'USDT'),
  ));
};
