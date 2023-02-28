// per km, multiply by 5/8 to get miles

/* Petrol, diesel, hybrid, electric */
const transportData = [
  {
    type: "dart",
    gCo2ePerKm: 11,
  },
  {
    type: "bus",
    gCo2ePerKm: 15,
  },
  {
    type: "luas",
    gCo2ePerKm: 64,
  },
  // ==============================================================================================================================
  {
    type: "smallDieselCar",
    gCo2ePerKm: 142,
  },
  {
    type: "smallPetrolCar",
    gCo2ePerKm: 154,
  },
  {
    type: "smallHybridCar",
    gCo2ePerKm: 104,
  },
  {
    type: "smallElectricCar",
    gCo2ePerKm: 0,
  },
  // ==============================================================================================================================
  {
    type: "mediumDieselCar",
    gCo2ePerKm: 171,
  },
  {
    type: "mediumPetrolCar",
    gCo2ePerKm: 192,
  },
  {
    type: "mediumHybridCar",
    gCo2ePerKm: 109,
  },
  {
    type: "mediumElectricCar",
    gCo2ePerKm: 0,
  },
  // ==============================================================================================================================
  {
    type: "largeDieselCar",
    gCo2ePerKm: 209,
  },
  {
    type: "largePetrolCar",
    gCo2ePerKm: 283,
  },
  {
    type: "largeHybridCar",
    gCo2ePerKm: 132,
  },
  {
    type: "largeElectricCar",
    gCo2ePerKm: 0,
  },
  // ==============================================================================================================================
  {
    type: "averageDieselCar",
    gCo2ePerKm: 173,
  },
  {
    type: "averagePetrolCar",
    gCo2ePerKm: 181,
  },
  {
    type: "averageHybridCar",
    gCo2ePerKm: 115,
  },
  {
    type: "averageElectricCar",
    gCo2ePerKm: 0,
  },
];

export default transportData;
