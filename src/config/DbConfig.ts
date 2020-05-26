import mongoose from 'mongoose';
import 'dotenv/config';

const dbUrl = process.env.MONGODB_URI;

export class DBConfig {
  constructor() {
    this.openConnection();
  }

  openConnection = async (): Promise<void> => {
    await mongoose.connect(dbUrl as string, { useNewUrlParser: true }).catch((err) => {
      console.log(`something went wrong ${err}`);
    });

    console.log(`Successfully`);
  };
}
