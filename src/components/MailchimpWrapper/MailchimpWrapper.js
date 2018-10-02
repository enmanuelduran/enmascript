import React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { Rocket } from 'Icons/Icons';
import { Form, Text } from 'informed';

const SUCCESS_CLASS = 'mailchimp--success';

class MailchimpWrapper extends React.Component {
    state = {
        subscribed: false,
        email: '',
        errors: undefined
    };

    handleSubmit = async state => {
        if (!state.email) {
            return false;
        }

        const result = await addToMailchimp(state.email);

        if (result && result.errors) {
            this.setState({ errors: result.errors });

            return false;
        }

        this.setState({ subscribed: true });
    };

    validateInput = state => {
        const email = state;
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const validation = regex.test(String(email).toLowerCase())
            ? null
            : 'Please provide a valid email';

        return validation;
    };

    render() {
        const successClass = this.state.subscribed ? SUCCESS_CLASS : '';

        return (
            <Form
                onSubmit={this.handleSubmit}
                id="validate-form"
                className={`mailchimp ${successClass}`}>
                {({ formState }) => {
                    return (
                        <React.Fragment>
                            <div className="form-container">
                                <p>
                                    Want to be the first to receive our cool
                                    updates?
                                </p>
                                <Text
                                    field="email"
                                    placeholder="Enter your email"
                                    validate={this.validateInput}
                                />
                                {(formState.errors.email ||
                                    this.state.errors) && (
                                    <div className="mailchimp-error">
                                        {formState.errors.email ||
                                            'An error ocurred'}
                                    </div>
                                )}
                                <button disabled={!formState.values.email}>
                                    Join our newsletter
                                </button>
                            </div>
                            {this.state.subscribed &&
                                !formState.errors.email && (
                                    <div className="success-container">
                                        <Rocket />
                                        Welcome aboard, Woohoo!
                                    </div>
                                )}
                        </React.Fragment>
                    );
                }}
            </Form>
        );
    }
}
export default MailchimpWrapper;
