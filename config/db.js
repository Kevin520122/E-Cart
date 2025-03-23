import mongoose from "mongoose";

//Init cached
let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

async function connect_db(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands:false
        }

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/e-cart`, opts).then((mongoose) => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connect_db