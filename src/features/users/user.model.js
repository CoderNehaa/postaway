export default class UserModel{
    constructor(id, name, email, password){
        this.id = id,
        this.name = name,
        this.email = email,
        this.password = password
    }

    static getAllUsers(){
        return users;
    }

    static getUserByEmail(email){
        const userExist = users.find((obj) => obj.email == email);
        return userExist;
    }

    static addUser(obj){
        const date = new Date();
        const newUser = new UserModel(date.toISOString(), obj.name, obj.email, obj.password);
        users.push(newUser);
        return newUser;
    }   

    static confirmLogin({email, password}){
        const user = users.find((obj) => obj.email==email && obj.password == password);
        return user
    }
}

let users = [
    new UserModel(101, "dummy", "dummy@dummy.com", "Dummy@56"),
    new UserModel(102, "demo", "demo@demo.com", "Demo@56")
]
