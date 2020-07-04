import React, { Component } from "react";

class OrdersManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: { current: [], past: [] },
      viewCurrent: true,
      showItems: false,
    }
  }

  componentDidMount() {
    this.setState({ orders: this.props.dbOrders })
  }

  componentDidUpdate(prevProps) {
    if(this.props.dbOrders !== prevProps.dbOrders) {
      this.setState({ orders: this.props.dbOrders });
      console.log('data updated');
    }
  }

  toggleViews = (input) => {
    this.setState({ viewCurrent: input, showItems: false })
  }

  toggleItems = (idx=false) => {
    this.setState({ showItems: idx })
  }

  orderReady = (index) => {
    let newOrders = {...this.state.orders}
    let selectedOrder = newOrders.current[index];
    selectedOrder.ready = true;
    newOrders.current = newOrders.current.filter((el, idx) => idx !== index);

    if(newOrders.current.length === 0) newOrders.current = 0;
    if(!newOrders.past) newOrders.past = [];
    newOrders.past.push(selectedOrder);
    this.props.updateOrders(newOrders);
    // selecting last order database se updetea sin el apartado de current !!
  }

  resetOrder= (index) => {
    let newOrders = {...this.state.orders};
    let selectedOrder = newOrders.past[index];
    selectedOrder.ready = false;
    newOrders.past = newOrders.past.filter((el, idx) => idx !== index);

    if(newOrders.past.length === 0) newOrders.past = 0;
    if(!newOrders.current) newOrders.current = [];
    newOrders.current.push(selectedOrder);
    this.props.updateOrders(newOrders);
  }

  render() {
    const currentOrdersValid = this.state.orders.current === 0 ? false : true;
    const pastOrdersValid = this.state.orders.past === 0 ? false : true;

    return (
      <>
        <h2 onClick={() => console.log(this.state)}>Orders Manager</h2>
        <h2 onClick={() => console.log(this.props.dbOrders)}>console log props</h2>
        <div className="viewToggler">
          <h4 onClick={() => this.toggleViews(true)}>CURRENT ORDERS</h4>
          <h4 onClick={() => this.toggleViews(false)}>PAST ORDERS</h4>
        </div>

        {this.state.viewCurrent && (
          currentOrdersValid ? 
            <>
              <h3>CURRENT ORDERS LOG:</h3>
              <ol>
                {this.state.orders.current.map((el, idx) => (
                  <li className="orderCard" key={idx}>
                    <div className="info">
                      <p>Cost: {el.cost}</p>
                      <p>Table: {el.table}</p>
                      <p>Order start: {el.start}</p>
                      <p>Order end: {el.end}</p>
                    </div>
                    <div className="items">
                      {
                        this.state.showItems === idx ?
                        <>
                          <p>SHOWING ITEMS</p>
                          <p>DISHES</p>
                          <ol>
                            {el.items.dishes.map((item, index) => (
                              <li key={index}>{item.item} - Qty: {item.qty}</li>
                            ))}
                          </ol>
                          <p>DRINKS</p>
                          <ol>
                            {el.items.drinks.map((item, index) => (
                              <li key={index}>{item.item} - Qty: {item.qty}</li>
                            ))}
                          </ol>
                          <button onClick={this.toggleItems}>Close</button>
                        </>
                        :
                        <>
                          <button onClick={() => this.toggleItems(idx)}>Show Items</button>
                          <button onClick={() => this.orderReady(idx)}>Order Completed</button>
                        </>
                      }
                    </div>
                  </li>
                ))}
              </ol>
            </>
          :  
            <h3>NO CURRENT ORDERS</h3>
        )}


        {!this.state.viewCurrent && (
          pastOrdersValid ? 
            <>
              <h3>PAST ORDERS LOG:</h3>
              <ol>
                {this.state.orders.past.map((el, idx) => (
                  <li className="orderCard" key={idx}>
                    <div className="info">
                      <p>Cost: {el.cost}</p>
                      <p>Table: {el.table}</p>
                      <p>Order start: {el.start}</p>
                      <p>Order end: {el.end}</p>
                    </div>
                    <div className="items">
                      {
                          this.state.showItems === idx ?
                          <>
                            <p>SHOWING ITEMS</p>

                            <p>DISHES</p>
                            <ol>
                              {el.items.dishes.map((item, index) => (
                                <li key={index}>{item.item} - Qty: {item.qty}</li>
                              ))}
                            </ol>
                            
                            <p>DRINKS</p>
                            <ol>
                              {el.items.drinks.map((item, index) => (
                                <li key={index}>{item.item} - Qty: {item.qty}</li>
                              ))}
                            </ol>

                            <button onClick={this.toggleItems}>Close</button>
                          </>
                          :
                          <>
                            <button onClick={() => this.resetOrder(idx)}>Reset Order</button>
                            <button onClick={() => this.toggleItems(idx)}>Show Items</button>
                          </>
                        }
                    </div>
                  </li>
                ))}
              </ol>
            </>
          :
            <h3>NO PAST ORDERS</h3>
        )}
      </>
    )
  }
}

export default OrdersManager;



    {/* ORDEN
      {
        items: { 
          drinks: [{ item: 'corona', qty: 23 }], 
          dishes: [{ item: 'burger', qty: 1, notes: 'no sauce' }] 
        },
        cost: 452,  <== que hacer aqui si se modifica la orden, vuelve a hacerse costeo?
        table: 45 / "takeout"
        ready: "ongoing" / "ready" 
        start: 23/junio/2020 23:12 <== solo agregar hora
        end: 23/junio/2020 23:34 <== solo agregar hora 
      }
    */}



var currentDate = new Date();

// function getTime() {
//   var currentDate = new Date();
//   var hours = currentDate.getHours();
//   var minutes = currentDate.getMinutes();
  
//   // 
  
// }



// function timeDifference() {
//   var currentTime = new Date();
//   console.log(`CURRENT TIME IS ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`)
  
//   setTimeout(function(){ 
//     var newTime = new Date();
//     console.log(`time inside function is ${newTime.getHours()}:${newTime.getMinutes()}:${newTime.getSeconds()}`)
//   }, 3000);
  
//   var difference = currentTime - newTime;
//   console.log(difference);
// }

// timeDifference()


// como salvarlo en base de datos para que despues que se le de en terminado, que se salve el tiempo entre los dos