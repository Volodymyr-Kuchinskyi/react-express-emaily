import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';
import FIELDS from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => (
      <Field
        key={name}
        type="text"
        name={name}
        label={label}
        component={SurveyField}
      />
    ));
  }

  render() {
    const { onSurveySubmit, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn">
            Cancel
          </Link>
          <button className="btn blue right" type="submit">
            Next
            <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  FIELDS.forEach(({ name, label }) => {
    if (!values[name]) errors[name] = `You must provide ${label}`;
  });
  errors.recipients = validateEmails(values.recipients || '');
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
