import mongoose from 'mongoose'

export default async  () => { 
    mongoose.set('strictQuery', false); // Disables strict query checking
    try {
        await mongoose.connect(process.env.MONGO_CONN)
        console.log('Db Connected') 
    }catch(error) {
        console.error('Db Connection Error: ', error)
        process.exit(1);
    }
}