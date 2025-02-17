export const ORDERS = {
  timestamp: new Date().getTime(),
  current: 0,
  past: [
    {
      cost: 35,
      end: 1595549951683,
      items: {
        dishes: [{ name: 'Panini', qty: 2 }, { name: 'Pie', qty: 1 }],
        drinks: [{ name: 'Tea', qty: 3 }, { name: 'Cappuccino', qty: 3 }],
      },
      ready: true,
      start: 1595291225998,
      table: 34,
    }
  ],
};

export const MENU = {
  timestamp: new Date().getTime(),
  dishes: [
    { 
      price: 56,
      name: "Panini",
      available: true, 
      description: "Choose between ham, chicken or vegetarian",
      image: "https://i.ibb.co/DKgQsbJ/straberry.pngg",
    },
    { 
      price: 33,
      available: true, 
      name: "Croissant",
      description: "Chocolate filled or plain",
      image: "https://i.ibb.co/DKgQsbJ/straberry.png",
    },
    { 
      price: 42,
      name: "Pie",
      available: true, 
      description: "Apple, Cheese, Lemon or Plum",
      image: "https://i.ibb.co/DKgQsbJ/straberry.png",
    },
  ],
  drinks: [
    {
      price: 14.5,
      available: true,
      name: 'Cappuccino',
      description: 'Freshly brewed every morning',
      image: "https://i.ibb.co/c3FgMVt/espresso.png",
    },
    {
      price: 23,
      name: 'Fruit Smoothie',
      available: true,
      description: 'Banana, strawberry, mango.',
      image: "https://i.ibb.co/c3FgMVt/espresso.png",
    },
    {
      price: 12,
      name: 'Tea',
      available: true,
      description: 'Assortment of chai, camomille, lemon, etc',
      image: "https://i.ibb.co/c3FgMVt/espresso.png",
    },
  ],
};

export const USER = {
  timestamp: new Date().getTime(),
  email: "DemoSession",
  tables: [
    { description: "By the door", number: 12, waitingOrder: false },
    { description: "Large table", number: 3, waitingOrder: false },
  ],
  username: 'DemoSession', 
  businessName:'Grab Coffee'
};