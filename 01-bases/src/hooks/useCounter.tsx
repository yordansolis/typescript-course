import { useState } from "react"


export const useCounter = () => {

    const [count, setCount] = useState<number>(10)


    const increaseBy = (value: number) => {
        setCount(Math.max(value + count, 0))
    }


    return {
        // Properties -> lo que responde
        count,

        // Actions que se hace 
        increaseBy
    }
}
