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
  Segment,
  Divider,
  Grid,
  Table
} from "semantic-ui-react";

import "./cart.css";

class Cart extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

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

    this.props.confirmEdit(item.id);
    // this.props.editCart(item.id);
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

    this.props.confirmEdit(item.id);
  };
  handleBacon = (item, x) => {
    if (x === "+") {
      item.bacon++;
      item.ing.push(2);
    } else {
      item.bacon--;
      var index = item.ing.indexOf(2);
      if (index > -1) {
        item.ing.splice(index, 1);
      }
    }
    if (item.bacon < 0) item.bacon = 0;

    this.props.confirmEdit(item.id);
  };
  handleAlface = (item, x) => {
    if (x === "+") {
      item.alface++;
      item.ing.push(1);
    } else {
      item.alface--;
      var index = item.ing.indexOf(1);
      if (index > -1) {
        item.ing.splice(index, 1);
      }
    }
    if (item.alface < 0) item.alface = 0;

    this.props.confirmEdit(item.id);
  };
  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <div>
            <li className="collection-item avatar" key={item.id}>
              <Segment className="segment">
                <Grid xs={12} sm={6} columns={2} relaxed="very">
                  <Grid.Column className="ColumWid">
                    <div className="item-desc">
                      <div className="item-img">
                        <img src={item.img} alt={item.img} className="" />
                      </div>
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
                      <Button
                        className="waves-effect waves-light btn pink remove"
                        onClick={() => {
                          this.handleRemove(item.id);
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  </Grid.Column>

                  <Grid.Column className="ColumWid">
                    <Table basic="very" celled collapsing>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Aumentar</Table.HeaderCell>
                          <Table.HeaderCell>Ingrediente</Table.HeaderCell>
                          <Table.HeaderCell>Diminuir</Table.HeaderCell>
                          <Table.HeaderCell>Valor</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Link to="/cart">
                              <Button
                                icon="plus"
                                onClick={() => {
                                  console.log("BUT +");
                                  this.handleCheese(item, "+");
                                }}
                              />
                            </Link>
                          </Table.Cell>
                          <Table.Cell>
                            <Button content="Queijo" labelPosition="left" />
                          </Table.Cell>
                          <Table.Cell>
                            <Link to="/cart">
                              <Button
                                icon="minus"
                                onClick={() => {
                                  this.handleCheese(item, "-");
                                }}
                              />
                            </Link>
                          </Table.Cell>
                          <Table.Cell>
                            <h2>{item.queijo}</h2>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Link to="/cart">
                            <Button
                              icon="plus"
                              onClick={() => {
                                console.log("BUT +");
                                this.handleMeat(item, "+");
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Button content="Hamburguer" labelPosition="left" />
                        </Table.Cell>
                        <Table.Cell>
                          <Link to="/cart">
                            <Button
                              icon="minus"
                              onClick={() => {
                                this.handleMeat(item, "-");
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <h2>{item.carne}</h2>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Link to="/cart">
                            <Button
                              icon="plus"
                              onClick={() => {
                                this.handleBacon(item, "+");
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Button content="Bacon" labelPosition="left" />
                        </Table.Cell>
                        <Table.Cell>
                          <Link to="/cart">
                            <Button
                              icon="minus"
                              onClick={() => {
                                this.handleBacon(item, "-");
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          {" "}
                          <h2>{item.bacon}</h2>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <Link to="/cart">
                            <Button
                              icon="plus"
                              onClick={() => {
                                this.handleAlface(item, "+");
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell><Button content="Alface" labelPosition="left" /></Table.Cell>
                        <Table.Cell>
                          <Link to="/cart">
                            <Button
                              icon="minus"
                              onClick={() => {
                                this.handleAlface(item, "-");
                              }}
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <h2>{item.alface}</h2>
                        </Table.Cell>
                      </Table.Row>
                    </Table>
                    <Button.Group></Button.Group>
                  </Grid.Column>
                </Grid>
                {/* <Divider vertical> </Divider> */}
              </Segment>
            </li>
          </div>
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
