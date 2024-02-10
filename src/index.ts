import { App } from "./app";
import { AuthRoute } from "./routes/auth.route";
import { PostRoute } from "./routes/post.route";

// tambahkan route lainnya disini
const app = new App([
  new AuthRoute(),
  new PostRoute()
]);

app.listen();