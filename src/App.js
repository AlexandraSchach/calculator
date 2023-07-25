import React, {useReducer} from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import "./styles.css"


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

// Reducer function that handles state updates based on dispatched actions.
function reducer (state, {type, payload}) {
  switch(type) {
    // If an action to add a digit is dispatched.
    case ACTIONS.ADD_DIGIT:
      // If the state is set to overwrite, replace the current operand with the new digit.
      if (state.overwrite) {
        // Otherwise, append the new digit to the existing currentOperand.
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      // If the new digit is "0" and the currentOperand is already "0", do nothing.
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      // If the new digit is a dot (".") and the currentOperand already includes a dot, do nothing.
      if (payload.digit === "." && state.currentOperand.includes(".")) { 
      return state
      }

    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    };

   // If an action to choose an operation is dispatched.  
  case ACTIONS.CHOOSE_OPERATION:
    // If both currentOperand and previousOperand are null, do nothing.
    if (state.currentOperand == null && state.previousOperand == null) {
      return state
    }
    // If only currentOperand is null, update the operation in the state.
    if (state.currentOperand == null) {
      return {
        ...state,
        operation: payload.operation,
      }
    }
    // If only previousOperand is null, set the previousOperand and clear the currentOperand.
    if (state.previousOperand == null) {
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null,
      }
    }
    // If both currentOperand and previousOperand are present, evaluate the expression and update the state accordingly.
    return {
      ...state,
      previousOperand: evaluate(state),
      operation: payload.operation,
      currentOperand: null
    }
  // If an action to clear the state is dispatched.
  case ACTIONS.CLEAR:
    return {}
  // If an action to delete a digit is dispatched.
  case ACTIONS.DELETE_DIGIT:
    if (state.overwrite) {
      return {
        ...state,
        overwrite: false,
        currentOperand: null
      }
    }
    if (state.currentOperand == null) return state
    if (state.currentOperand === 1) {
      return { ...state, currentOperand: null}
    }
    
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1)
    }
   // If an action to evaluate the expression is dispatched. 
  case ACTIONS.EVALUATE:
    if (
      state.operation == null || 
      state.currentOperand == null || 
      state.previousOperand == null
    ) {
      return state;
    }

    return {
      ...state,
      overwrite: true,
      previousOperand: null,
      operation: null,
      currentOperand: evaluate(state)
    }
    // If the dispatched action does not match any of the above cases.
    default:
  }
}

// Helper function to evaluate the expression based on the current operation.
function evaluate({currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  // Based on the operation, perform the calculation and return the result as a string.
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
    default:
  }
  return computation.toString()
}

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

// Helper function to format the operand as an integer.
function formatOperator (operand) {
  if (operand == null) return
  // Split the operand into integer and decimal parts, if present. 
  const [integer, decimal] = operand.split('.')
  // If there is no decimal part, format the integer using the INTEGER_FORMATER and return.
  if (decimal == null) return INTEGER_FORMATER.format(integer)
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}

// The main App component.
function App(){
  // Use the reducer hook to manage the state.
  // Destructure currentOperand, previousOperand, and operation from the state object.
  // Use the dispatch function to update the state based on dispatched actions.
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
    reducer, 
    {}
  )

  return (
    // JSX code for the calculator interface.
    <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperator(previousOperand)} {operation}
            </div>
          <div className="current-operand">{formatOperator(currentOperand)}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}
        >AC
        </button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}
        >DEL
        </button>
        <OperationButton operation={"÷"} dispatch={dispatch}/>
        <DigitButton digit={"1"} dispatch={dispatch}/>
        <DigitButton digit={"2"} dispatch={dispatch}/>
        <DigitButton digit={"3"} dispatch={dispatch}/>
        <OperationButton operation={"*"} dispatch={dispatch}/>
        <DigitButton digit={"4"} dispatch={dispatch}/>
        <DigitButton digit={"5"} dispatch={dispatch}/>
        <DigitButton digit={"6"} dispatch={dispatch}/>
        <OperationButton operation={"+"} dispatch={dispatch}/>
        <DigitButton digit={"7"} dispatch={dispatch}/>
        <DigitButton digit={"8"} dispatch={dispatch}/>
        <DigitButton digit={"9"} dispatch={dispatch}/>
        <OperationButton operation={"-"} dispatch={dispatch}/>
        <DigitButton digit={"."} dispatch={dispatch}/>
        <DigitButton digit={"0"} dispatch={dispatch}/>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
      </div>
    );
  }



export default App

