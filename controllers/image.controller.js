const model = require('../models/user.model');
const imgur = require('imgur');

module.exports ={
    upload: async (id,image) => {
        const info = await imgur.uploadFile(image);
        console.dir(info.data.link);
    }
    
}