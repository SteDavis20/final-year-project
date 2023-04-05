// per km, multiply by 5/8 to get miles

/* Petrol, diesel, hybrid, electric */
const transportData = [
  { name: "dart", kgCo2ePerKm: 0.011 }, { name: "bus", kgCo2ePerKm: 0.015 }, { name: "luas", kgCo2ePerKm: 0.064 },
  { name: "train", kgCo2ePerKm: 0.035 }, { name: "smallDieselCar", kgCo2ePerKm: 0.142 },
  { name: "smallPetrolCar", kgCo2ePerKm: 0.154 }, { name: "smallHybridCar", kgCo2ePerKm: 0.104 },
  { name: "smallElectricCar", kgCo2ePerKm: 0 }, { name: "mediumDieselCar", kgCo2ePerKm: 0.171 },
  { name: "mediumPetrolCar", kgCo2ePerKm: 0.192 }, { name: "mediumHybridCar", kgCo2ePerKm: 0.109 },
  { name: "mediumElectricCar", kgCo2ePerKm: 0 }, { name: "largeDieselCar", kgCo2ePerKm: 0.209 },
  { name: "largePetrolCar", kgCo2ePerKm: 0.283 }, { name: "largeHybridCar", kgCo2ePerKm: 0.132 },
  { name: "largeElectricCar", kgCo2ePerKm: 0 }, { name: "averageDieselCar", kgCo2ePerKm: 0.173 },
  { name: "averagePetrolCar", kgCo2ePerKm: 0.181 }, { name: "averageHybridCar", kgCo2ePerKm: 0.115 },
  { name: "averageElectricCar", kgCo2ePerKm: 0},
];

const foodData = [
  { name: "beef", kgCo2ePerKg: 12.14 }, { name: "chicken", kgCo2ePerKg: 2.84 }, { name: "turkey", kgCo2ePerKg: 3.76 },
  { name: "milk", kgCo2ePerKg: 1.19 }, { name: "eggs", kgCo2ePerKg: 2.94 }, { name: "cheese", kgCo2ePerKg: 3.02 },
  { name: "tuna", kgCo2ePerKg: 5.36 }, { name: "mackerel", kgCo2ePerKg: 5.36 }, { name: "salmon", kgCo2ePerKg: 5.36 },
  { name: "pork", kgCo2ePerKg: 4.45 },
];

export { transportData, foodData };
