import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FIELDS from './formFields';
import { submitSurvey } from '../../actions/index';

const SurveyFormReview = ({ onCancel, submitSurvey, values, history }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {FIELDS.map(({ label, name }) => (
          <div key={label}>
            <label>{label}</label>`<div>{values[name]}</div>
          </div>
        ))}
      </div>
      <button
        className="green btn right"
        onClick={() => submitSurvey(values, history)}
      >
        Send
        <i className="material-icons right">check</i>
      </button>
      <button className="yellow btn left darken-3" onClick={onCancel}>
        <i className="material-icons left">arrow_back</i>
        Back
      </button>
    </div>
  );
};

function mapStateToProps({ form: { surveyForm } }) {
  return { values: surveyForm.values };
}

export default connect(
  mapStateToProps,
  { submitSurvey }
)(withRouter(SurveyFormReview));
