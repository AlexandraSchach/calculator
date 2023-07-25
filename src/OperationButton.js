import { ACTIONS } from "./App";


 // OperationButton component represents a button that corresponds to an arithmetic operation.
export default function OperationButton ({dispatch, operation}){
    return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}
    >
        {operation}
    </button>
}