class User{
    constructor(name){
        this.name = name;
    }
    
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name
    }
}

let userList = [];

let btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    let userName = prompt("Enter Name:");
    let newUser = new User(userName);
    userList.push(newUser);
})