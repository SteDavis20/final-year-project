// per km, multiply by 5/8 to get miles

/* Petrol, diesel, hybrid, electric */
const transportData = [
  {
    name: "dart",
    gCo2ePerKm: 11,
  },
  {
    name: "bus",
    gCo2ePerKm: 15,
  },
  {
    name: "luas",
    gCo2ePerKm: 64,
  },
  {
    name: "train",
    gCo2ePerKm: 35,
  },
  // ==============================================================================================================================
  {
    name: "smallDieselCar",
    gCo2ePerKm: 142,
  },
  {
    name: "smallPetrolCar",
    gCo2ePerKm: 154,
  },
  {
    name: "smallHybridCar",
    gCo2ePerKm: 104,
  },
  {
    name: "smallElectricCar",
    gCo2ePerKm: 0,
  },
  // ==============================================================================================================================
  {
    name: "mediumDieselCar",
    gCo2ePerKm: 171,
  },
  {
    name: "mediumPetrolCar",
    gCo2ePerKm: 192,
  },
  {
    name: "mediumHybridCar",
    gCo2ePerKm: 109,
  },
  {
    name: "mediumElectricCar",
    gCo2ePerKm: 0,
  },
  // ==============================================================================================================================
  {
    name: "largeDieselCar",
    gCo2ePerKm: 209,
  },
  {
    name: "largePetrolCar",
    gCo2ePerKm: 283,
  },
  {
    name: "largeHybridCar",
    gCo2ePerKm: 132,
  },
  {
    name: "largeElectricCar",
    gCo2ePerKm: 0,
  },
  // ==============================================================================================================================
  {
    name: "averageDieselCar",
    gCo2ePerKm: 173,
  },
  {
    name: "averagePetrolCar",
    gCo2ePerKm: 181,
  },
  {
    name: "averageHybridCar",
    gCo2ePerKm: 115,
  },
  {
    name: "averageElectricCar",
    gCo2ePerKm: 0,
  },
];

const foodData = [
  {
    name: "beef",
    kgCo2ePerKg: 12.14,
  },
  {
    name: "chicken",
    kgCo2ePerKg: 2.84,
  },
  {
    name: "turkey",
    kgCo2ePerKg: 3.76,
  },
  {
    name: "milk",
    kgCo2ePerKg: 1.19,
  },
  {
    name: "eggs",
    kgCo2ePerKg: 2.94,
  },
  {
    name: "cheese",
    kgCo2ePerKg: 3.02,
  },
  {
    name: "tuna",
    kgCo2ePerKg: 5.36,
  },
  {
    name: "mackerel",
    kgCo2ePerKg: 5.36,
  },
  {
    name: "salmon",
    kgCo2ePerKg: 5.36,
  },
  {
    name: "pork",
    kgCo2ePerKg: 4.45,
  },
];

export { transportData, foodData };
