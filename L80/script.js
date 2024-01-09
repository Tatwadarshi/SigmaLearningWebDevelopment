class Animal{
    constructor(name){
        console.log('Animal object is created');
        this.name = name;
        
    }

    eats(){
        console.log("kha raha hun...");
    }

    jumps(){
        console.log("kud raha hun...");
    }
}

class Lion extends Animal{
    constructor(name){
        super(name);
        console.log('Lion object is created');
    }
}

let a = new Animal("Tommy");
a.jumps()
console.log(a.name);

let l = new Lion("Leo");