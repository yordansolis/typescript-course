let persona  = 'Jhordan';


const personas =  {
    name : 'Jhordan',
    age: 30
}

const a: number = 5;
const b = 10;

console.log(a + b);


// function
function sum(a: number, b: number){
    return a + b
}
sum(1, 2)

function saludar(name: string){
    return 'hola ' + name;
}
saludar('jhordan');

// objetis

function getPersonas({ name, age }: { name: string; age: number }) {
  return name + ' ' + age;
}

getPersonas({
  name: 'jhordan',
  age: 30,
});


function saludaPerson(person: { name: string; age: number }) {
  return 'hola ' + person.name + ' ' + person.age;
}

saludaPerson({name: 'pepe', age: 30});


// Tipar las arrow

const sumarNumber = (a: number, b: number) => {
  return a + b;
};


const restarNumber = (a: number, b: number): number => {
  return a - b;
}

const avengers = [ 'Spidey', 'Hulk', 'Superman' ];

avengers.forEach( (avenger) => {
  console.log(avenger.toUpperCase());
})

// Objetos
let hero = {
  name: 'Spiderman',
  age: 30
}

// Convertir nuestros typos

type Hero = {
  readonly id?: number;
  name: string;
  age: number;
  isActive?: boolean;
};

let heros: Hero = {
  name: 'Spiderman',
  age: 30
}
function createHero(name: string, age: number): Hero {
    return { name, age, isActive: true };    
}

const thor = createHero('Thor', 1500);


// Union types
let uid: string | number;

uid = '123';
console.log(typeof(uid));
uid = 123;

// Intersection Types

type HeroInput = {
  name: string;
  age: number;
}

type Heros = HeroInput & Hero;

function createHeros(input: HeroInput): Heros {
  const { name, age } = input;

  return {
    name,
    age,
    isActive: true,
  };
}


type HeroProperties={
    isActive: boolean,
    address:{
        planet: string,
        city: string
    }
}

const addressHero: HeroProperties['address'] = {
    planet: 'Earth',
    city: 'NY'
}



// Type from Function return

function createAddress() {
    return{
        planet: 'Tierra',
        city: 'NY'
    }
}
type Address = ReturnType<typeof createAddress>;

const address = addressHero.city = 'NAZA'
console.log(address);




// Array
//* const lenguajes: string[] = []
//* const lenguajes: Array<string> = []
//* const lenguajes: (string | number)[] = []
// lenguajes.push('Javascript')
// lenguajes.push('Javascript')
// lenguajes.push('Javascript')
// lenguajes.push(5)


type CellValue = 'x' | 'o' | '';
type GameBoard = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
 ];
 
const gameBoard: CellValue[][] = [
  ['x', 'o', 'x'],
  ['o', 'x', 'o'],
  ['x', '', 'o'],
];