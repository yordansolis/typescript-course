import { useCounter } from "../hooks/useCounter"



export const Counter = () => {

    const { count, increaseBy } = useCounter();

    return (
        <>

            <h3>Contador <small className="text-2xl">{count}</small> </h3>
            <br />

            <button
                onClick={() => increaseBy(1)}

                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                + 1
            </button>
            <button
                onClick={() => increaseBy(-1)}

                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                - 1
            </button>

        </>
    )
}
