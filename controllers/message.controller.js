const model = require('../models/message.model');

module.exports={
    create: async (data) => {
        await model.create(data,(err) => {
            if (err) throw err
        })
    },
    research: async () => {
        const result = await model.find((err) => {
            if (err) throw err
        })
        return result;
    }
    
    
}