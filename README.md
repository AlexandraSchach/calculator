# Simple Calculator App
This is a simple calculator app built using React that allows users to perform basic arithmetic operations. The app uses the useReducer hook to manage the state and perform calculations based on dispatched actions.

## Functionality

    **Users can input numeric digits by clicking on the digit buttons (0-9).
    **Users can perform arithmetic operations (+, -, *, ÷) by clicking on the operation buttons.
    **Users can clear the current calculation by clicking the "AC" button.
    **Users can delete the last entered digit by clicking the "DEL" button.
    **Users can evaluate the expression and get the result by clicking the "=" button.

## How It Works

The app uses a reducer function to handle state updates based on dispatched actions. The available actions are defined in the ACTIONS object and include:

    `ADD_DIGIT:` To add a digit to the current operand.
    `CHOOSE_OPERATION:` To choose an arithmetic operation.
    `CLEAR:` To clear the state and reset the calculator.
    `DELETE_DIGIT:` To delete the last entered digit.
    `EVALUATE:` To evaluate the expression and get the result.
The `evaluate` function is a helper function that performs the actual arithmetic calculations based on the selected operation.

The `formatOperator` function is another helper function that formats the operands to display them as integers without trailing decimal places.

## Components

The app consists of the following components:
    `App:` The main component that holds the calculator's state and dispatches actions.
    `DigitButton:` Represents a button for numeric digits (0-9).
    `OperationButton:` Represents a button for arithmetic operations (+, -, *, ÷).

## Getting Started

    1. Clone this repository to your local machine.
    2. Navigate to the project directory and run `npm install` to install the required dependencies.
    3. Run `npm start` to start the development server and open the app in your browser.

Feel free to explore the code, modify it, and use it as a starting point for your own projects!

## Credits
I have Code this from Tutorial by Web Dev Simplified:
 
 [The Perfect Beginner React Projekt](https://youtu.be/DgRrrOt0Vr8) 
