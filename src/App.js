import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navybar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { Segment, Grid } from "semantic-ui-react";
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navybar />
          <Segment>
            <Grid xs={12} sm={6} columns={3} relaxed="very">
              <Grid.Column>
                <Segment compact inverted color="olive">
                  PROMO QUEIJO: A cada 3 porções de queijo - page 2
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment compact inverted color="green">
                PROMO CARNE: A cada 3 porções de hamburguer - page 2
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment compact inverted color="teal">
                  PROMO LIGHT: Lanches com alface/sem bacon ganham 10% de desconto
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
