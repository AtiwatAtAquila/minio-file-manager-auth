import { Elysia } from "elysia";
import { AuthController } from "./auth/auth.controller";
import jwt from "@elysiajs/jwt";

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "SUPER_SECRET_KEY"
    })
  )
  .get("/", () => "Hello Elysia")
  .use(AuthController)
  .listen(Bun.env.PORT || 3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
