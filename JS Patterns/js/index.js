//TASK 1
//1.1 abstract class Toy
class Toy {
    constructor(name, price){
        if(new.target === Toy){
            throw new Error('Abstract class cannot be Instantieted')
        }
        this.name = name
        this.price = price
    }
    getToyInfo(){
        return `The toy name is "${this.name}". It costs ${this.price} dollars.`
    }
}

class TeddyMembership extends Toy{
    constructor(name,price){
        super(name, price)
        this.material = 'cotton'
    }
    getMaterialInfo(){
        return `The toy name is "${this.name}" was made of ${this.material}.`
    }
}
class WoodenMembership extends Toy {
    constructor(name,price){
        if (WoodenMembership.exist) {
            return WoodenMembership.instance
        }
        super(name, price)
        WoodenMembership.instance = this
        WoodenMembership.exist = true
        this.material = 'wood'
    }
    getMaterialInfo(){
        return `The toy name is "${this.name}" was made of ${this.material}.`
    }
}
class Plasticmembership extends Toy {
    constructor(name,price){
        super(name, price)
        this.material = 'plastic'
    }
    getMaterialInfo(){
        return `The toy name is "${this.name}" was made of ${this.material}.`
    }
}
//Factory Method
class MemberFactory{
    constructor() {
        this.toys = []
    }
    produce(name, price, type = 'plastic') {
        const possibleToy = this.getToy(name)
        if (possibleToy) {
            return possibleToy
        }
        switch (type) {
            case 'teddy': {
                const member = new TeddyMembership(name, price)
                this.toys.push(member)
                return member
            }                 
            case 'wooden': {
                const member = new WoodenMembership(name, price)
                this.toys.push(member)
                return member
            }
            case 'plastic': {
                const member = new Plasticmembership(name, price)
                this.toys.push(member)
                return member
            }
            default: {
                const member = new Plasticmembership(name, price)
                this.toys.push(member)
                return member
            }
        }
    }
    getToy(name){
        return this.toys.find(toy => toy.name === name)
    }
}

const factory = new MemberFactory()
const teddyBear = factory.produce('Bear',200,'teddy')
console.log(teddyBear.getToyInfo())
console.log(teddyBear.getMaterialInfo())
const plasticCar = factory.produce('Car', 100)
console.log(plasticCar.getToyInfo())
console.log(plasticCar.getMaterialInfo())

//1.2  Flyweight
const plasticBear = factory.produce('Bear', 150, 'plastic')
console.log(plasticBear.getToyInfo())
console.log(plasticBear.getMaterialInfo())

//1.3 
const woodenHorse = factory.produce('Horse', 400,'wooden')
console.log(woodenHorse.getToyInfo())
const woodenBear = factory.produce('Beer', 200,'wooden')
console.log(woodenBear.getToyInfo())

//TASK 2 Decorator pattern
class Car{
    constructor(name, host) {
        this.name = name
        this.host = host
    }
    carSound() {
        return 'Usual car sound'
    }
}

function ambulanceCar(car) {
    car.ambulanseSound = function() {
        return 'Siren sound.'
    }
    return car
}
const mercedes = new Car('Mercedes','Doctor')
const ambulanseMercedes = ambulanceCar(mercedes)
console.log(ambulanseMercedes.ambulanseSound())

const toyota = new Car('toyota','Doctor2')
const ambulanseToyota = ambulanceCar(toyota)
console.log(ambulanseToyota.ambulanseSound())
