import app from "./app.js";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(
      `Server running in ${config.nodeEnv} mode on port ${config.port}`,
    );
  });
};
startServer();
