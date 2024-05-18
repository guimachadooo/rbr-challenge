import mongoose from "mongoose";

//realiza a conexão com o banco
//url inserida no .env
const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
