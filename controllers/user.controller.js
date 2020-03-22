const model = require('../models/user.model');

module.exports = {
    create: async (data) => {
        const result = await model.findOne({email: data.email}); //Check if the email is already in use
        if(!result){
            await model.create(data,(err) => {
                if (err) throw err
            }
            );
            return 1; // User created
        }
        else{
            return 0; // Email already in use
        }
    },
    research: async (email) => {
        const result = await model.findOne({email}).select('password -_id');
        if(!result){
            return 0; //User doesnt exist
        }
        else{
            return result._doc.password; //Return encrypted password
        }
    },
    token: (data) => {
        model.update({email: data.email},{token: data.token}, (err) => {
            if (err) throw err
        }
        )
    }
    
    
    
}