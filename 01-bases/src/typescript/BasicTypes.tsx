export const BasicTypes = () => {


    let name: string = 'Jhordan';
    let age: number = 30;
    let isActive: boolean = false;
    let hobbies: string[] = ['coding', 'reading', 'traveling'];
    let role: [number, string] = [1, 'admin'];
    let person: { name: string, age: number } = { name: 'Jhordan', age: 30 };
    let people: { name: string, age: number }[] = [{ name: 'Jhordan', age: 30 }, { name: 'Luis', age: 25 }];



    return (
        <>
            <h3>Tipos basicos de Typescript</h3>
            <p>Nombre: {name}</p>
            <p>Edad: {age}</p>
            <p>Estado: {isActive ? 'Activo' : 'Inactivo'}</p>
            <p>Hobbies: {hobbies.join(', ')}</p>
            <p>Rol: {role[0]} - {role[1]}</p>
            <p>Persona: {person.name} - {person.age}</p>
            <p>Personas: {people.map((person) => person.name).join(', ')}</p>
        </>
    )
}
