import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('1-Teste página de Login', () => {
  test('A rota para a página de Login é `/`', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('O botão deve ser habilitado apenas com email e senhas corretos', () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe('Entrar');

    userEvent.type(inputEmail, 'teste');
    userEvent.type(inputPassword, '123456');
    expect(button.disabled).toBe(true);

    userEvent.clear(inputEmail);
    userEvent.type(inputEmail, 'teste@teste@');
    expect(button.disabled).toBe(true);

    userEvent.clear(inputEmail);
    userEvent.type(inputEmail, 'teste@testecom');
    expect(button.disabled).toBe(true);

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12');
    expect(button.disabled).toBe(true);

    userEvent.clear(inputPassword);
    userEvent.type(inputPassword, '123456');
    expect(button.disabled).toBe(false);

    userEvent.click(button);

    expect(store.getState().user.email).toBe('teste@teste.com');
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
