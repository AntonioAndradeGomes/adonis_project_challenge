import Route from "@ioc:Adonis/Core/Route";


Route.get("/", async () => {
  return { message: "hello world!!" };
});

Route.resource("/users", "UsersController");
Route.post("/login", "SessionsController.store");
Route.delete("/logout", "SessionsController.destroy");
Route.post("/project", "ProjectsController.store");
Route.get("/project/:id", "ProjectsController.show");
Route.get("/projects", "ProjectsController.index");
Route.delete("/projects/:id", "ProjectsController.destroy");
Route.patch("/projects/:id/done", "ProjectsController.updateDone");
Route.put("/projects/:id", "ProjectsController.update");
