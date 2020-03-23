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
   research: async (id) => {
       const result = await model.findById(id,(err) => {
           if (err) throw err
       }
       );
       if(result) return result._doc;//If there's an user, return the data

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
        try {
            await model.findByIdAndUpdate(id,{visible: false, active: false});  
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    
    },  
    
    // token: async (data) => {
    //     await model.update({email: data.email},{token: data.token}, (err) => {
    //         if (err) throw err
    //     }
    //     )
    // },

    setActive: async (id,active) => {
        try {
            await model.findByIdAndUpdate(id,{active: active});  
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    },
    setVisible: async (id,visible) => {
        try {
            await model.findByIdAndUpdate(id,{visible: visible});  
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    },
    getPass: async (email) => {
        const result = await model.findOne({email}).select('password');
        if(!result){
            return 0; //User doesnt exist
        }
        else{
            return result._doc; //Return encrypted password
        }
    },

    
    
    
    
}