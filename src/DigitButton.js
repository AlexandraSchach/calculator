import { ACTIONS } from "./App";

//DigitButton component represents a button that corresponds to a numeric digit.
export default function DigitButton ({dispatch, digit}){
    return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit}})}
    >
        {digit}
    </button>
}