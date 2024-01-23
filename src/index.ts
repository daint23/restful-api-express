import { App } from "./app";
import { AuthRoute } from "./routes/auth.route";

// tambahkan route lainnya disini
const app = new App([
  new AuthRoute()
]);

app.listen();