const model = require('../models/user.model');
const imgur = require('imgur');

module.exports ={
    upload: async (id) => {
        const info = await imgur.uploadFile('../public/images/profile.jpg');
        console.dir(info.data.link);
    }
    
}