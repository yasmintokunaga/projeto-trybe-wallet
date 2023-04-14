import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import WalletFormUpdateExpense from '../components/WalletFormUpdateExpense';

class Wallet extends React.Component {
  render() {
    const { didUpdateExpense: { update } } = this.props;
    return (
      <>
        <Header />
        { update ? <WalletFormUpdateExpense /> : <WalletForm /> }
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  didUpdateExpense: PropTypes.shape({
    update: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  didUpdateExpense: globalState.wallet.updateExpense,
});

export default connect(mapStateToProps)(Wallet);
