const model = require('../models/user.model');

module.exports = {
    create: async (data) => {
        const result = await model.findOne({email: data.email}); //Check if the email is already in use
        if(!result){
            await model.create(data,(err) => {
                if (err) throw err
            }
            );
            return true; // User created
        }
        else{
            return false; // Email already in use
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
    update: async(id,data) => {
        let result = await model.findById(id).select('active -_id');
        result = result._doc.active; //Get Active value
        if (result==true){
            await model.findByIdAndUpdate(id,data,(err) => {
                if (err) throw err;
            })
            return true; //OK
        }
        else{
            return false; //Unactive user
        }
    },
    delete: async (id) => {
        const result = await model.findByIdAndUpdate(id,{visible: false, active: false});
        if (!result){
            return false;
        }
        else{
            return true;
        }
    },  
    
    token: async (data) => {
        await model.update({email: data.email},{token: data.token}, (err) => {
            if (err) throw err
        }
        )
    }
    
    
    
}