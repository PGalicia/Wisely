import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Redux
import "./../../scss/header.scss"; // SCSS
import CogIcon from "./../../../asset/cog-icon.svg"; // Asset
import { calculateSpendingMoney } from "./../../utils/calculateSpendingMoney.js"; // Utils
import { allocateSpendingMoneyToItems } from "./../../utils/allocateSpendingMoneyToItems.js"; // Utils

/*
  mapStateToProps
*/
const mapStateToProps = state => {
  return {
    items: state.items,
    totalMoney: state.totalMoney,
    percentage: state.percentage
  };
};

/*
    Header Component
*/
class Header extends Component {
  render() {
    // @todo: need to format numbers
    const spendingMoney = calculateSpendingMoney(
      this.props.percentage,
      this.props.totalMoney
    );

    // Allocate Spending Money
    allocateSpendingMoneyToItems(spendingMoney, this.props.items);

    return (
      <header className="header-container">
        <h1 className="web-app-name">WISELY</h1>
        <p className="spending-money">
          Spending Money:{" "}
          <strong>
            ${" "}
            {spendingMoney.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
          </strong>
        </p>
        <p className="percentage-and-total-money-subnote">
          The spending money is {this.props.percentage}% of your total budget: $
          {this.props.totalMoney.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })}
        </p>
        <button className="add-item-button">Add Item</button>
        <button className="settings-button">
          <img src={CogIcon} alt="Settings Icon" />
        </button>
      </header>
    );
  }
}

export default connect(mapStateToProps)(Header);
