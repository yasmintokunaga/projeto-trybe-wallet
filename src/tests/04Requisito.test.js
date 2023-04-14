import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

xdescribe('4-Teste o salvamento do formulário', () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  test('Adiciona uma despesa e verifica se a soma de despesas do header foi atualizada e os inputs voltaram ao valor inicial', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(mockData),
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByRole('textbox', { name: /valor:/i });
    const inputDescription = screen.getByTestId('description-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const buttonAddField = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, 10);
    userEvent.type(inputDescription, 'Lanche');
    userEvent.selectOptions(
      inputTag,
      screen.getByRole('option', { name: 'Lazer' }),
    );
    userEvent.selectOptions(
      inputMethod,
      screen.getByRole('option', { name: 'Cartão de crédito' }),
    );
    userEvent.selectOptions(
      inputCurrency,
      await screen.findByRole('option', { name: 'USD' }),
    );
    userEvent.click(buttonAddField);

    expect(inputValue.value).toBe('');
    expect(inputDescription.innerHTML).toBe('');

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBe('490.55');
  });
});
