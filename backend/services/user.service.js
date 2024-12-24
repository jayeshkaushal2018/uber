const userModel = require("../models/user.model");

module.exports.createUser = async({
    firstname, lastname, email, password
})=>{

    try{
    if(!firstname  || !email || !password){
        throw new Error('All fields are required');
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

        return user;
}catch(error){
    console.error('Error creating user:', error.message);
    throw error;
}
}