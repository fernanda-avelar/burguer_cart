import Item1 from "../../images/burguer1.png";
// import Item2 from "../../images/item2.jpg";
// import Item3 from "../../images/item3.jpg";
// import Item4 from "../../images/item4.jpg";
// import Item5 from "../../images/item5.jpg";
// import Item6 from "../../images/item6.jpg";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  EDIT_ITEM,
  CONFIRM_EDIT
} from "../actions/action-types/cart-actions";

const ingredients = {
  1: { id: 1, name: "Alface", price: 0.4, image: "https://goo.gl/9DhCgk" },
  2: { id: 2, name: "Bacon", price: 2.0, image: "https://goo.gl/8qkVH0" },
  3: {
    id: 3,
    name: "Hamburguer de Carne",
    price: 3.0,
    image: "https://goo.gl/U01SnT"
  },
  4: { id: 4, name: "Ovo", price: 0.8, image: "https://goo.gl/weL1Rj" },
  5: { id: 5, name: "Queijo", price: 1.5, image: "https://goo.gl/D69Ow2" },
  6: {
    id: 6,
    name: "Pão com gergelim",
    price: 1.0,
    image: "https://goo.gl/evgjyj"
  }
};

function getPrice(array) {
  const soma = array.map((x, index) => {
    return ingredients[x].price;
  });
  // console.log(soma.reduce((a, b) => a + b, 0));
  return soma.reduce((a, b) => a + b, 0);
}

function getIng(array) {
  const soma = array.map((x, index) => {
    return ingredients[x].name;
  });
  // console.log(soma.reduce((a, b) => a + b, 0));
  return soma.reduce((a, b) => a + " | " + b, " ");
}
const initState = {
  items: [
    {
      id: 1,
      title: "X-Bacon",
      ing: [2, 3, 5, 6],
      desc: getIng([2, 3, 5, 6]),
      price: getPrice([2, 3, 5, 6]),
      queijo: 1,
      carne: 1,
      img: Item1
    },
    {
      id: 2,
      title: "X-Burger",
      ing: [3, 5, 6],
      desc: getIng([3, 5, 6]),
      price: getPrice([3, 5, 6]),
      queijo:1,
      carne:1,
      img: Item1
    },
    {
      id: 3,
      title: "X-Egg",
      desc: getIng([3, 4, 5, 6]),
      price: getPrice([3, 4, 5, 6]),
      img: Item1
    },
    {
      id: 4,
      title: "X-Egg Bacon",
      desc: getIng([1, 2, 3, 4, 5, 6]),
      price: getPrice([1, 2, 3, 4, 5, 6]),
      img: Item1
    }
  ],
  addedItems: [],
  total: 0
};

function promoCheese(itemToEdit){

  // Count cheese
  debugger;
  var count = 0;
  for (var i = 0; i < itemToEdit.ing.length; ++i) {
    if (itemToEdit.ing[i] === 5) count++;
  }

  //verify if atr queijo == count of cheese in ingredients
  // console.log(itemToEdit.queijo," - ",count)

  if(itemToEdit.queijo !== count){
    var t = itemToEdit.queijo - count;
    while(t > 0){
      itemToEdit.ing.push(5);
      t--;
    }

  }
  // console.log(count)

  var toExclude = itemToEdit.queijo/3;

  // console.log(toExclude);

  while(toExclude > 0){
    var index = itemToEdit.ing.indexOf(5);
    if (index > -1) {
      itemToEdit.ing.splice(index, 1);
    }
    toExclude--;
  }
  console.log(itemToEdit);
  return itemToEdit;

}

function promoMeat(itemToEdit){

  // Count cheese
  debugger;
  var count = 0;
  for (var i = 0; i < itemToEdit.ing.length; ++i) {
    if (itemToEdit.ing[i] === 5) count++;
  }

  //verify if atr queijo == count of cheese in ingredients
  // console.log(itemToEdit.carne," - ",count)

  if(itemToEdit.queijo !== count){
    var t = itemToEdit.carne - count;
    while(t > 0){
      itemToEdit.ing.push(3);
      t--;
    }

  }
  // console.log(count)

  var toExclude = itemToEdit.carne/3;

  // console.log(toExclude);

  while(toExclude > 0){
    var index = itemToEdit.ing.indexOf(5);
    if (index > -1) {
      itemToEdit.ing.splice(index, 1);
    }
    toExclude--;
  }
  console.log(itemToEdit);
  return itemToEdit;

}

const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    debugger; //INSIDE HOME _ ADD
    let addedItem = state.items.find(item => item.id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      // state.addedItems.push(existed_item);
      return {
        ...state,
        total: state.total + addedItem.price
      };
    } else {
      addedItem.quantity = 1;
      // state.addedItems.push(existed_item);
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }

  //INSIDE CART COMPONENT _ ADD
  if (action.type === ADD_QUANTITY) {
    // debugger;
    let addedItem = state.items.find(item => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal
    };
  }

  if (action.type === REMOVE_ITEM) {
    debugger;//INSIDE CART
    let itemToRemove = state.addedItems.find(item => action.id === item.id);
    let new_items = state.addedItems.filter(item => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal
    };
  }

  //EDIT
  if (action.type === EDIT_ITEM) {
    debugger;
    var itemToEdit = state.addedItems.find(item => action.id === item.id);
    console.log("Edit");
    console.log(itemToEdit);

    let newTotal = state.total - itemToEdit.price;
    itemToEdit.price = getPrice(itemToEdit.ing);
    newTotal = state.total + itemToEdit.price;

    return {
      ...state,
      total: newTotal
    };
  }


  
  //CONFIRM EDIT
  if (action.type === CONFIRM_EDIT) {
    debugger;
    let itemToEdit = state.addedItems.find(item => action.id === item.id);
    // let new_items = state.addedItems.filter(item => action.id !== item.id);

    console.log("CONFIRM");
    // console.log(itemToEdit);
    let newTotal = state.total - itemToEdit.price;

    itemToEdit = promoCheese(itemToEdit);
    itemToEdit = promoMeat(itemToEdit);
    // console.log(itemToEdit);
    itemToEdit.price = getPrice(itemToEdit.ing);


    // itemToEdit.id = 5;
    itemToEdit.title = "EDITADO " +  itemToEdit.title;
    // state.addedItems.push(itemToEdit);

    newTotal =+ itemToEdit.price;
    return {
      ...state,
      total: newTotal
    };
  }

  
  if (action.type === SUB_QUANTITY) {
    debugger;
    let addedItem = state.items.find(item => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 6
    };
  } else {
    return state;
  }
};

export default cartReducer;
