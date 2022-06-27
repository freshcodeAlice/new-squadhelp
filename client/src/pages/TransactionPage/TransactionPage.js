import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Header from '../../components/Header/Header';
import Transations from '../../components/Transactions';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import * as ActionCreators from '../../actions/actionCreator';

const TransactionPage = (props) => {
  const {isFetching, error, data} = props.transations;

  useEffect(()=>{
    props.getTransactions();
  }, [])

  return (
    <div>
      <Header />
     {isFetching && <Spinner />}
     {data && <Transations data={data}/> }
      <Footer />
    </div>
  );
};

const mapStateToProps = ({transations}) => ({transations});
const mapDispatchToProps = (dispatch) => {
  getTransactions: () => dispatch(ActionCreators.getUserTransactionsRequest)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);


