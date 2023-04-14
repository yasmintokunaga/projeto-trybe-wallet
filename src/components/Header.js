import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalField } = this.props;
    return (
      <header className="has-background-link-light p-5">
        <nav
          className={ `${'is-flex is-justify-content-space-between '}
          ${'is-align-items-center is-flex-wrap-wrap'}` }
        >
          <div>
            <i className="fa-solid fa-piggy-bank is-size-1" />
          </div>
          <div>
            <span className="tag is-white is-medium mr-3">
              Despesa Total: R$
              <span
                className="mx-1"
                data-testid="total-field"
              >
                { totalField }
              </span>
              <span
                data-testid="header-currency-field"
              >
                BRL
              </span>
            </span>
            <span className="tag is-white is-medium">
              Email:
              <span
                className="ml-1"
                data-testid="email-field"
              >
                { email }
              </span>
            </span>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => {
  const fields = expenses.map(({ value, currency, exchangeRates }) => (
    parseFloat(value) * parseFloat(exchangeRates[currency].ask)
  ));
  return {
    email,
    totalField: fields.reduce((acc, curr) => acc + curr, 0).toFixed(2),
  };
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalField: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
