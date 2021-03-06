import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Coupon extends React.Component {
  state = { total_amount: 0, coupon_code: "", navigate: false, data: "" };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let { coupon_code, total_amount } = this.state;

    try {
      const response = await axios.post(
        "https://rvrbhfrk9j.execute-api.us-east-2.amazonaws.com/production/aws/validate",
        {
          total_amount,
          coupon_code
        }
      );
      const data = response.data;

      if (data) {
        data.coupon_code = coupon_code;
        this.setState({ data });
        this.setState({ navigate: true });
      }
    } catch (err) {
      if (err) {
        const data = err.response.data;
        if (data) {
          data.coupon_code = coupon_code;
          this.setState({ data });
          this.setState({ navigate: true });
        }
      }
    }
  };

  render() {
    if (this.state.navigate) {
      return (
        <Redirect
          to={{
            pathname: "/status",
            state: this.state.data
          }}
        />
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Validate Coupon</h3>
        <div className="form-group">
          <label htmlFor="coupon_code">Coupon Code</label>
          <input
            type="text"
            className="form-control"
            name="coupon_code"
            required
            onChange={evt => {
              this.setState({ coupon_code: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_amount">Total amount</label>
          <input
            type="number"
            name="total_amount"
            className="form-control"
            min="0"
            required
            onChange={evt => {
              this.setState({ total_amount: evt.target.value });
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Coupon;
