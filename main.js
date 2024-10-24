
'use strict';

const addCarForm = document.querySelector('#car-form');
const searchCarBtn = document.querySelector('#search-car');

const searchForm = document.querySelector('#search-lic');
const carForm = document.querySelector('#car-form');
const errorMessage = document.querySelector('#error-message');
const searchResult = document.querySelector('#search-result');

const cars = [];

class Car {
  constructor(licNum, carMaker, carModel, carYear, carOwner, carPrice, carColor) {
    this.licNum = licNum;
    this.carMaker = carMaker;
    this.carModel = carModel;
    this.carYear = carYear;
    this.carOwner = carOwner;
    this.carPrice = carPrice;
    this.carColor = carColor;
  }

  getDiscountedPrice() {
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - this.carYear;
    return carAge > 10 ? (this.carPrice * 0.85) : 0;
  }
}

// Validation
const validateCarData = (licNum, carYear, carPrice) => {
  try {
    const currentYear = new Date().getFullYear();
    const licRegEx = /^[A-Za-z]{3}-\d{3}$/;

    if (!licNum || !licRegEx.test(licNum)) {
      throw new Error("Invalid license number! Only alphanumeric characters and dashes are allowed. (Ex: abc-123)");
    }

    if (isNaN(carYear) || carYear < 1886 || carYear > currentYear) {
      throw new Error(`Year must be between 1886 and ${currentYear}.`);
    }

    if (isNaN(carPrice) || carPrice <= 0) {
      throw new Error("Price must be a positive number.");
    }
    return true;

  } catch (error) {
    errorMessage.textContent = error.message;
    return false;
  } finally {
    console.log("Validation Done");
  }
};

const displayMessage = (message, type = "success") => {
  const messageElement = document.querySelector("#message");
  messageElement.textContent = message;
  messageElement.className = type;
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.className = "";
  }, 1500);
};

const addCar = (e) => {
  e.preventDefault();

  const licNum = document.querySelector('#lic-number').value;
  const carMaker = document.querySelector('#car-maker').value;
  const carModel = document.querySelector('#car-model').value;
  const carYear = parseInt(document.querySelector('#car-year').value);
  const carOwner = document.querySelector('#car-owner').value;
  const carPrice = parseFloat(document.querySelector('#car-price').value);
  const carColor = document.querySelector('#car-color').value;

  const isValid = validateCarData(licNum, carYear, carPrice);
  if (!isValid) {
    return true;
  }

  const newCar = new Car(licNum, carMaker, carModel, carYear, carOwner, carPrice, carColor);
  cars.push(newCar);
  localStorage.setItem('cars', JSON.stringify(cars));
  displayTable();
  displayMessage("Car added successfully!");

  errorMessage.textContent = '';
};

const loadCarsFromStorage = () => {
  const storedCars = localStorage.getItem('cars');
  if (storedCars) {
    const parsedCars = JSON.parse(storedCars);

    // Convert plain objects back to Car instances
    parsedCars.forEach(carData => {
      const car = new Car(
        carData.licNum,
        carData.carMaker,
        carData.carModel,
        carData.carYear,
        carData.carOwner,
        carData.carPrice,
        carData.carColor
      );
      cars.push(car);
    });
  }
  displayTable();
};


const displayTable = () => {
  const tableContainer = document.querySelector('.table-container');
  const table = document.querySelector('#car-table');

  table.innerHTML = table.rows[0].innerHTML;

  cars.forEach((car, index) => {
    const row = table.insertRow(-1);

    const carDetails = [car.licNum, car.carMaker, car.carModel, car.carYear, car.carOwner, car.carPrice.toFixed(2) + "€", car.carColor];
    carDetails.forEach(detail => {
      const cell = row.insertCell(-1);
      cell.textContent = detail;
    });

    const deleteCell = row.insertCell(-1);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteCar(index));
    deleteCell.appendChild(deleteButton);
  });
  tableContainer.style.display = cars.length > 0 ? 'block' : 'none';
};



const searchCar = (e) => {
  e.preventDefault();

  if (!searchForm.value) {
    searchResult.textContent = 'Please enter a license number to search.';
    return;
  }

  let foundCar = false;
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].licNum === searchForm.value) {
      const discountedPrice = cars[i].getDiscountedPrice();

      searchResult.innerHTML = `
        <p>Maker: ${cars[i].carMaker}</p>
        <p>Model: ${cars[i].carModel}</p>
        <p>Owner: ${cars[i].carOwner}</p>
        <p>Year: ${cars[i].carYear}</p>
        <p>Original Price: $${cars[i].carPrice}</p>
       
        <p>Color: ${cars[i].carColor}</p>
      `;


      foundCar = true;
      break;
    }
    else {
      searchResult.textContent = 'There is no car with that license plate added to the system. Try again?';
    }
  }
};



const deleteCar = (index) => {
  cars.splice(index, 1);
  localStorage.setItem('cars', JSON.stringify(cars));
  displayTable();
  displayMessage("Car deleted successfully!");
};

addCarForm.addEventListener('submit', addCar);
searchCarBtn.addEventListener('click', searchCar);
window.addEventListener('DOMContentLoaded', loadCarsFromStorage);