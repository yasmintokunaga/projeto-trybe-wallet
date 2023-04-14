import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleButton = (email, password) => {
    const minLentghPassword = 6;
    return (
      password.length >= minLentghPassword
      && email.includes('@')
      && email.includes('.com')
    );
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <main className="is-flex is-flex-direction-row">
        <section className="box column">
          <p className="field has-text-centered">
            <i className="fa-solid fa-piggy-bank is-size-3 mr-4" />
            <span className="subtitle is-3">Trybe</span>
            <span className="title is-3">Wallet</span>
          </p>
          <div className="field">
            <input
              className="input"
              placeholder="E-mail"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="field">
            <input
              className="input"
              placeholder="Senha"
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </div>
          <button
            className="button is-primary"
            disabled={ !this.handleButton(email, password) }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
