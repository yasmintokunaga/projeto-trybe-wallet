import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className="table is-fullwidth has-text-centered">
        <tr className="is-selected has-background-link-dark">
          <th className="has-text-centered">Descrição</th>
          <th className="has-text-centered">Tag</th>
          <th className="has-text-centered">Método de pagamento</th>
          <th className="has-text-centered">Valor</th>
          <th className="has-text-centered">Moeda</th>
          <th className="has-text-centered">Câmbio utilizado</th>
          <th className="has-text-centered">Valor convertido</th>
          <th className="has-text-centered">Moeda de conversão</th>
          <th className="has-text-centered">Editar/Excluir</th>
        </tr>
        <tbody>
          { expenses.length > 0 && expenses.map((expense) => {
            const {
              id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
            } = expense;
            const { name, ask } = exchangeRates[currency];
            const convertedValue = (parseFloat(ask) * parseFloat(value)).toFixed(2);
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ parseFloat(value).toFixed(2) }</td>
                <td>{ name }</td>
                <td>{ parseFloat(ask).toFixed(2) }</td>
                <td>{ convertedValue }</td>
                <td>Real</td>
                <td>
                  <button
                    key={ id }
                    className="button is-small is-link is-outlined mb-1"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpense(id)) }
                  >
                    Editar
                  </button>
                  <button
                    key={ id }
                    className="button is-small is-danger is-outlined"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteExpense(id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalSate) => globalSate.wallet;

export default connect(mapStateToProps)(Table);
