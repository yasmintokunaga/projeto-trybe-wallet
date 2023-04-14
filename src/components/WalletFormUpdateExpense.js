import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEditExpense } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: '',
    description: '',
  };

  componentDidMount() {
    const { expenses, updateExpense: { id } } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = expenses[id];

    this.setState({
      value,
      method,
      tag,
      currency,
      description,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { updateExpense: { id } } = this.props;
    const { dispatch } = this.props;
    dispatch(saveEditExpense({ ...this.state, id }));
  };

  render() {
    const { value, method, tag, currency, description } = this.state;
    const { currencies } = this.props;
    return (
      <form
        className={
          'is-flex is-flex-wrap-nowrap has-background-primary '
          + 'is-justify-content-space-around p-5'
        }
      >
        <label htmlFor="value" className="navbar-item">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency" className="navbar-item">
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((code) => (
              <option
                key={ code }
                value={ code }
              >
                { code }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="navbar-item">
          Método de pagamento:
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="navbar-item">
          Categoria:
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description" className="navbar-item">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            id="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          className="button is-warning is-light"
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, updateExpense } }) => ({
  currencies,
  expenses,
  updateExpense,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired.isRequired,
    tag: PropTypes.string.isRequired.isRequired,
  })).isRequired,
  updateExpense: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
