import React, { Component } from "react";
import { connect } from "react-redux";
import { FormErrors } from "../util";
import { createPayment } from "../actions";

class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      cardID: "",
      cardType: "",
      expireDate: "",
      securityNumber: "",
      loading: false,
      formErrors: {
        username: "",
        cardID: "",
        expireDate: "",
        securityNumber: ""
      },
      usernameValid: false,
      cardIDValid: false,
      expireDateValid: false,
      securityNumberValid: false,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.username;
    let cardIDValid = this.state.cardID;
    let cardType;
    switch (fieldName) {
      case "username":
        usernameValid = value.length >= 6;
        fieldValidationErrors.username = usernameValid ? "" : " is too short";
        break;
      case "cardID":
        cardType = this.ValidateCreditCardNumber(value);
        console.log(cardType);
        console.log(cardType.length > 0);
        if (cardType.length > 0) {
          cardIDValid = true;
          this.state.cardType = cardType;
          fieldValidationErrors.cardID = "";
        } else {
          fieldValidationErrors.cardID = " is Invalid";
          cardIDValid = false;
        }

        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        cardIDValid: cardIDValid
      },
      this.validateForm
    );
  }

  ValidateCreditCardNumber(value) {
    var ccNum = value.trim();
    console.log(value);
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    if (visaRegEx.test(value)) {
      return "Visa Card";
    } else if (mastercardRegEx.test(value)) {
      return "Master Card";
    } else if (amexpRegEx.test(value)) {
      return "American Express Card";
    } else if (discovRegEx.test(value)) {
      return "Discovery Card";
    } else {
      return false;
    }
  }

  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.cardIDValid
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const payment = {
      username: this.state.username,
      cardID: this.state.cardID,
      expireDate:this.state.expireDate,
      securityNumber:this.state.securityNumber
    };
   // this.props.createPayment(payment);
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    return (
      <div className="col-md-12 col-md-offset-3">
        <h1 className="text-center">Payment</h1>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
          {this.state.cardType && (
            <h3 className="d-block">Card Type: {this.state.cardType}</h3>
          )}

           { this.state.loading && <img src={require('../img/loading.gif')} /> }
        </div>
        <form name="form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor="cardID">Card ID</label>
          <input
            type="text"
            className="form-control"
            name="cardID"
            value={this.state.cardID}
            onChange={this.handleChange}
          />
          <label htmlFor="expireDate">Expire Date</label>
          <input
            type="date"
            className="form-control"
            name="expireDate"
            value={this.state.expireDate}
            onChange={this.handleChange}
          />
          <label htmlFor="securityNumber">Security Number</label>
          <input
            type="number"
            className="form-control"
            name="securityNumber"
            value={this.state.securityNumber}
            onChange={this.handleChange}
          />

          <div className="form-group">
            <button
              className="btn btn-primary"
              disabled={!this.state.formValid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { payment } = state.payment;
  return {
    payment
  };
}

const connectedPaymentPage = connect(mapStateToProps, createPayment)(PaymentPage);
export { connectedPaymentPage as PaymentPage };
