import app from './app';
import 'dotenv/config';

process.on('uncaughtException', (e) => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(1);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
