import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Label, Icon } from "semantic-ui-react";

const Navbar = (props) => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          BURGUER SHOP
        </Link>

        <ul className="right texts">
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/cart">My cart</Link>
          </li>
          <li>
            <Link to="/cart">
              <Label>
                <Icon name="cart" /> {props.items.length}
              </Label>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
    return {
      items: state.addedItems
      //addedItems: state.addedItems
    };
  };

export default connect(mapStateToProps) (Navbar);
