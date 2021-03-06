import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class AddPercentCoupon extends React.Component {
  state = {
    coupon_code: "",
    minimum_amount: 0,
    discount_percentage: 0,
    maximum_amount: 0,
    validity: 0,
    navigate: false,
    data: ""
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let {
      coupon_code,
      minimum_amount,
      discount_percentage,
      maximum_amount,
      validity
    } = this.state;
    try {
      const response = await axios.post(
        "https://rvrbhfrk9j.execute-api.us-east-2.amazonaws.com/production/aws/add-percent-coupon",
        {
          coupon_code,
          minimum_amount,
          discount_percentage,
          maximum_amount,
          validity
        }
      );
      const data = response.data;
      data.coupon_code = coupon_code;
      this.setState({ data });
      this.setState({ navigate: true });
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
        <h3>Add Percent Coupon</h3>
        <div className="form-group">
          <label>Coupon code</label>
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
          <label>Minimum cart value</label>
          <input
            type="number"
            name="minimum_amount"
            className="form-control"
            min="0"
            required
            onChange={evt => {
              this.setState({ minimum_amount: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Discount percentage</label>
          <input
            type="number"
            name="discount_percentage"
            className="form-control"
            required
            min="0"
            max="100"
            onChange={evt => {
              this.setState({ discount_percentage: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Maximum discount (max discount amount to be applied)</label>
          <input
            type="number"
            name="maximum_amount"
            className="form-control"
            min="0"
            required
            onChange={evt => {
              this.setState({ maximum_amount: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Validity (in Days)</label>
          <input
            type="number"
            name="validity"
            className="form-control"
            required
            min="0"
            max="30"
            onChange={evt => {
              this.setState({ validity: evt.target.value });
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

export default AddPercentCoupon;
