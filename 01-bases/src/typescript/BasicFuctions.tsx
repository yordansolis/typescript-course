
export const BasicFuctions = () => {

    //  No es buena practica, usar  las funciones convinadas, es buena separar todo, de forma islada
    const addTwoNumbers = (a: number, b: number): number => {
        return a + b;
    };


    return (
        <>BasicFuctions
            <span> el resultado de la suma es  = {addTwoNumbers(2, 8)} </span>
        </>
    )
}
