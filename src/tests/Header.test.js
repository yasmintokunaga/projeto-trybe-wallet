import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('2-Teste Componente Header', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);
  });

  test('Verificar se o e-mail do usuário aparece na tela', () => {
    const emailUser = screen.getByText('teste@teste.com');
    expect(emailUser).toBeInTheDocument();
  });
  test('Verificar se o campo de gastos é igual a zero', () => {
    const totalField = screen.getByTestId('total-field');
    expect(totalField.innerHTML).toBe('0.00');
  });
  test('Verificar se aparece a moeda BRL na tela', () => {
    const currency = screen.getByText('BRL');
    expect(currency).toBeInTheDocument();
  });
});
