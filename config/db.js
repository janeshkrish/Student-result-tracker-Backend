const mongo = require("mongoose");

const connectdb = async() => {
    try{
        const conn = await mongo.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected :${conn.connection.host}`);
    }catch(err){
        console.error(`MongoDB not connected : ${err.message}`);
        process.exit(1);
    }
}

export default connectdb;