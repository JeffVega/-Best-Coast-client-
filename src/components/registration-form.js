import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import {Link} from 'react-router-dom';
const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstname, lastname} = values;
        const user = {username, password, firstname, lastname};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div className="register-form">
                <form
                    className="register-form-content"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <label htmlFor="firstname">First name</label>
                    <Field component={Input} type="text" name="firstname" />
                    <label htmlFor="lastname">Last name</label>
                    <Field component={Input} type="text" name="lastname" />
                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        validate={[required, passwordLength, isTrimmed]}
                    />
                    <label className="register-responsive-linespace" htmlFor="passwordConfirm">Confirm password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="passwordConfirm"
                        validate={[required, nonEmpty, matchesPassword]}
                    />
                    <button
                    className='register-button'
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Register
                    </button>
                    <Link className="register-login-redirect" to="/">
                        Login
                    </Link>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
