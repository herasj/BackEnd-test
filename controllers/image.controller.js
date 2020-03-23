const model = require('../models/user.model');
const imgur = require('imgur');

module.exports ={
    upload: async (id) => {
        const info = await imgur.uploadFile('./public/images/profile.jpg');
        const link = info.data.link; //imgur link
        await model.findByIdAndUpdate(id,{img: link},(err) => {
            if (err) throw err
        })
        return true;
    }
    
}