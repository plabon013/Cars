Car Class Definition:
•	Define a Car class with properties for license plate, maker, model, current owner, price, and color.
HTML Form for Input:
•	Create a form with fields for the user to input the car details (license plate, maker, model, current owner, price, color).
•	Use JavaScript to handle form submissions and collect user inputs.
Create and Store Car Objects:
•	Instantiate a new Car object when the form is submitted, using the input values.
•	Store this new car object in an array and display it in a dynamically generated table.
Search Functionality:
•	Allow users to search for a car by its license plate.
•	If found, display the car's make, model, and owner.
•	If not found, display an error message.


LocalStorage Integration:
•	Store the array of car objects in LocalStorage after adding or deleting a car.
•	When the page reloads, retrieve the stored cars from LocalStorage and display them in the table.
•	Handle empty LocalStorage by starting with an empty car list without errors.
Form Reset & Feedback:
•	After adding a car, reset the form and notify the user.
•	Provide clear feedback when actions like adding or deleting occur (e.g., success or confirmation messages).
Car Deletion:
•	Add a delete button for each car entry.
•	When clicked, remove the car from both the array and LocalStorage and update the display.
User Experience Improvements:
•	Improve form design for better user experience on both desktop and mobile.
•	Make the table responsive and clean to display car information clearly.
