import {
  SAVE_CURRENCIES,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  updateExpense: {
    update: false,
    id: 999,
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      updateExpense: {
        update: true,
        id: action.payload,
      },
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      updateExpense: {
        update: false,
        id: 999,
      },
      expenses: state.expenses.map((expense, index) => {
        if (action.payload.id === index) return { ...expense, ...action.payload };
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
