import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('3-Teste formulário para adicionar as despesas', () => {
  // const currencies = Object.keys(mockData).filter((currency) => currency !== 'USDT');

  beforeEach(() => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);
  });
  test('Um campo para adicionar o valor da despesa', () => {
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
  });
  test('Um campo para adicionar a descrição da despesa', () => {
    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();
  });
  test('Um campo para selecionar a moeda', () => {
    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();
  });
  test('Um campo para selecionar a categoria', () => {
    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
  });
  test('Um campo para selecionar o método de pagamento', () => {
    const inputMethod = screen.getByTestId('method-input');
    expect(inputMethod).toBeInTheDocument();
  });
  test('A chave currencies no estado global deve ser um array de siglas puxadas através de uma requisição à API', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });
});
