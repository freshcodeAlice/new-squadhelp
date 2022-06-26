import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo';
import styles from './LoginPage.module.sass';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

const LoginPage = (props) => {
  const {user} = props.auth;
  
  const changeRoute = () => {
    props.history.replace('/');
  };

  if(user) {
    return <Redirect to='/' />
  }

  
    return (
  <div className={styles.mainContainer}>
    <div className={styles.loginContainer}>
      <div className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
        <div className={styles.linkLoginContainer}>
          <Link
            to="/registration"
            style={{ textDecoration: 'none' }}
          >
            <span>Signup</span>
          </Link>
        </div>
      </div>
      <div className={styles.loginFormContainer}>
        <LoginForm changeRoute={ changeRoute } />
      </div>
    </div>
  </div>
);

};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
