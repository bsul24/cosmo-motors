-- Any variables that will have data coming from the backend programming langauge are denoted with a colon : as the first character of the variable

-- See vehicles
SELECT * 
FROM Vehicles;

-- See salespeople
SELECT * 
FROM Salespeople;

-- See salespeople with dealerships
SELECT s.salespersonID, CONCAT(s.firstName, " ", s.lastName) AS Salesperson, s.email, s.phoneNumber, d.dealershipName 
FROM Salespeople s
JOIN DealershipsHasSalespeople ds ON s.salespersonID = ds.salespersonID
JOIN Dealerships d ON ds.dealershipID = d.dealershipID
ORDER BY s.lastName;

-- See dealerships
SELECT *
FROM Dealerships;

-- See dealerships and their salespeople
SELECT d.dealershipID, d.dealershipName, d.state, d.city, d.address, d.phoneNumber, CONCAT(s.firstName, " ", s.lastName) AS Salesperson
FROM Dealerships d
JOIN DealershipsHasSalespeople ds ON d.dealershipID = ds.dealershipID
JOIN Salespeople s ON ds.salespersonID = s.salespersonID
ORDER BY d.dealershipName;

-- See customers
SELECT * 
FROM Customers;

-- See sales
SELECT s.saleID, s.saleDate, CONCAT(c.firstName, " ", c.lastName) AS Customer, CONCAT(sp.firstName, " ", sp.lastName) AS Salesperson, d.dealershipName, v.vehicleID
FROM Sales s
JOIN Vehicles v ON s.saleID = v.saleID
JOIN Customers c ON s.customerID = c.customerID
JOIN Dealerships d ON s.dealershipID = d.dealershipID
JOIN Salespeople sp ON s.salespersonID = sp.salespersonID;

-- Add vehicle
INSERT INTO Vehicles (make, model, year, price, color)
VALUES (
  :makeInput, 
  :modelInput, 
  :yearInput, 
  :priceInput, 
  :colorInput
);

-- Add salesperson
INSERT INTO Salespeople (firstName, lastName, email, phoneNumber)
VALUES (
  :firstNameInput,
  :lastNameInput,
  :emailInput,
  :phoneNumberInput
);

-- Add dealership
INSERT INTO Dealerships (dealershipName, state, city, address, phoneNumber)
VALUES (
  :dealershipNameInput, 
  :stateInput, 
  :cityInput,
  :addressInput,
  :phoneNumberInput
);

-- Add customer
INSERT INTO Customers (firstName, lastName, email, phoneNumber)
VALUES (
  :firstNameInput, 
  :lastNameInput, 
  :emailInput, 
  :phoneNumberInput
);

-- Get all customer names and customerIDs to populate customer select for sale
SELECT customerID, CONCAT(firstName, " ", lastName) AS Customer
FROM Customers
ORDER BY lastName;

-- Get all salesperson names and salespersonIDs to populate salesperson select for sale. Also use for selecting salesperson to add to dealership.
SELECT salespersonID, CONCAT(firstName, " ", lastName) AS Salesperson
FROM Salespeople
ORDER BY lastName;

-- Get all dealership names and dealershipIDs to populate dealership select for sale. Also use when selecting dealership to add a salesperson to. 
SELECT dealershipID, dealershipName AS Dealership
FROM Dealerships
ORDER BY dealershipName;

-- Add sale
INSERT INTO Sales (saleDate, customerID, salespersonID, dealershipID)
VALUES (
  :saleDateInput,
  :customerIDInput,
  :salespersonIDInput,
  :dealershipIDInput
);

-- Add salesperson to dealership
INSERT INTO DealershipsHasSalespeople (dealershipID, salespersonID)
VALUES (
  :dealershipIDInput,
  :salespersonIDInput
);

-- Delete vehicle
DELETE FROM Vehicles
WHERE vehicleID = :vehicleIDInput;

-- Disassociate salesperson from dealership (M:M deletion)
DELETE FROM DealershipsHasSalespeople 
WHERE dealershipID = :dealershipIDInput AND salespersonID = :salespersonIDInput;

-- Edit price of vehicle
UPDATE Vehicles
SET price = :priceInput
WHERE vehicleID = :vehicleIDInput;

-- Edit contact info for salesperson
UPDATE Salespeople
SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, phoneNumber = :phoneNumberInput
WHERE salespersonID = :salespersonIDInput;

-- Edit contact info for customer
UPDATE Customers
SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, phoneNumber = :phoneNumberInput
WHERE customerID = :customerIDInput;

-- Get all unsold vehicles to be shown when selecting vehicles involved in a sale
SELECT vehicleID
FROM Vehicles
WHERE saleID IS NULL;

-- Edit saleID for vehicle once sold
UPDATE Vehicles
SET saleID = :saleIDInput 
WHERE vehicleID = :vehicleIDInput;