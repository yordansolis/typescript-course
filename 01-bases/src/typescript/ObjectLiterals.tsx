
export const ObjectLiterals = () => {

    interface Person {
        name: string;
        age: number;
        isActive: boolean;
        address: Address;
    }

    interface Address {
        planet: string;
        city: string;
        street?: string;
    }


    let person: Person = {
        name: 'Jhordan',
        age: 30,
        isActive: true,
        address: {
            planet: 'Colombia',
            city: 'Quibdó'
        }
    }





    return (
        <>
            <h3>ObjectLiterals *  Typescript</h3>
            <p>Nombre: {person.name}</p>
            <p>Edad: {person.age}</p>
            <p>Estado: {person.isActive ? 'Activo' : 'Inactivo'}</p>
            <p>Planeta: {person.address.planet}</p>
            <p>Ciudad: {person.address.city}</p>
            <p> -------------------------------- </p>
            <>
                Person: {JSON.stringify(person)}
            </>
        </>
    )
}
