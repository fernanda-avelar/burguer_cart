import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  editCart,
  confirmEdit
} from "./actions/cartActions";
import Recipe from "./Recipe";
import {
  Button,
  Header,
  Icon,
  Modal,
  Statistic,
  Segment
} from "semantic-ui-react";

class Cart extends Component {

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  //to remove the item completely
  handleRemove = id => {
    this.props.removeItem(id);
  };
  //to add the quantity
  handleAddQuantity = id => {
    this.props.addQuantity(id);
  };
  //to substruct from the quantity
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };

  handleConfirm = id => {
    this.props.confirmEdit(id);
  };

  handleCheese = (item, x) => {
    if (x === "+") {
      item.queijo++;
      item.ing.push(5);
    } else {
      item.queijo--;
      var index = item.ing.indexOf(5);
      if (index > -1) {
        item.ing.splice(index, 1);
      }
    }
    if (item.queijo < 0) item.queijo = 0;

    this.props.editCart(item.id);
  };

  handleMeat = (item, x) => {
    if (x === "+") {
      item.carne++;
      item.ing.push(3);
    } else {
      item.carne--;
      var index = item.ing.indexOf(3);
      if (index > -1) {
        item.ing.splice(index, 1);
      }
    }
    if (item.carne < 0) item.carne = 0;

    this.props.editCart(item.id);
  };
  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>{item.desc}</p>
              <p>
                <b>Price: {item.price}$</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleAddQuantity(item.id);
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleSubtractQuantity(item.id);
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <Modal
                trigger={<Button onClick={this.handleOpen}>Editar</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size="small"
              >
                <Header icon="archive" content="Archive Old Messages" />
                <Modal.Content>
                  <p>
                    Your inbox is getting full, would you like us to enable
                    automatic archiving of old messages?
                  </p>
                  <Segment inverted color="green">
                    PROMO: A cada 3 porções de queijo - Pague 2
                  </Segment>
                  {/* QUEIJO */}
                  <Button.Group>
                    <Link to="/cart">
                      <Button
                        icon="plus"
                        onClick={() => {
                          console.log("BUT +");
                          this.handleCheese(item, "+");
                        }}
                      />
                    </Link>
                    <Button content="Queijo" labelPosition="left" />
                    <Link to="/cart">
                      <Button
                        icon="minus"
                        onClick={() => {
                          this.handleCheese(item, "-");
                          
                        }}
                      />
                    </Link>
                    <h2>{item.queijo}</h2>
                  </Button.Group>
                  {/* CARNE */}
                  <Button.Group>
                    <Link to="/cart">
                      <Button
                        icon="plus"
                        onClick={() => {
                          console.log("BUT +");
                          this.handleMeat(item, "+");
                        }}
                      />
                    </Link>
                    <Button content="Hamburguer" labelPosition="left" />
                    <Link to="/cart">
                      <Button
                        icon="minus"
                        onClick={() => {
                          this.handleMeat(item, "-");
                          
                        }}
                      />
                    </Link>
                    <h2>{item.carne}</h2>
                  </Button.Group>
                </Modal.Content>
                <Modal.Actions>
                  <Link to="/cart">
                    <Button
                      inverted
                      color="green"
                      onClick={() => {
                        this.handleConfirm(item.id);
                        this.handleClose();
                      }}
                    >
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Link>
                </Modal.Actions>
              </Modal>
              <Button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.handleRemove(item.id);
                }}
              >
                Remover
              </Button>
            </div>
          </li>
        );
      })
    ) : (
      <h2>Carrinho Vazio.</h2>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Recipe />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.addedItems
    //addedItems: state.addedItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    editCart: id => {
      dispatch(editCart(id));
    },
    confirmEdit: id => {
      dispatch(confirmEdit(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
