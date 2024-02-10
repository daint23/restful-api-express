import express, { Application } from "express";
import "express-async-errors";
import { Route } from "./interfaces/route.interface";
import { ErrorMiddleware } from "./middlewares/error";

export class App {
    private readonly app: Application;
    private readonly env: string;
    private readonly port: string | number;

    constructor(routes: Route[]) {
        this.app = express();
        this.env = `${process.env.NODE_ENV}` || "development";
        this.port = 3000;

        this.initMiddleware();
        this.initRoute(routes);
        this.initError();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`[server]: Server is running at http://localhost:${this.port}`);
        });
    }

    // tambahkan middleware lainnya disini
    private initMiddleware() {
        this.app.use(express.json());
    }

    private initRoute(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use(route.router);
        });
    }

    private initError() {
        this.app.use(ErrorMiddleware);
    }
}