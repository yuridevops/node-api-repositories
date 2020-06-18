const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  console.log(request.body)
  const repositorie = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repositorie)

  return response.status(200).json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const repoIndex = repositories.findIndex(repo => repo.id === request.params.id)
  console.log(repoIndex)
  if (repoIndex > 0) {
    repositories[repoIndex] = { ...repositories[repoIndex], title, url, techs }
    return response.status(200).json(repositories[repoIndex])
  }
  return response.status(400).json({ message: 'Repositorie not found' })
});

app.delete("/repositories/:id", (request, response) => {
  const repoIndex = repositories.findIndex(repo => repo.id === request.params.id)
  if (repoIndex >= 0) {
    repositories.splice(repoIndex, 1)
    return response.status(204).json({message: "Deleted with success"})
  }
  return response.status(400).json({ message: 'Repositorie not found' })
});

app.post("/repositories/:id/like", (request, response) => {
  console.log(request.params.id)
  const repoIndex = repositories.findIndex(repo => repo.id === request.params.id)
  console.log(repoIndex)
  if (repoIndex >= 0) {
    repositories[repoIndex].likes += 1
    return response.status(200).json(repositories[repoIndex])
  }
  return response.status(400).json({ message: 'Repositorie not found' })
});

module.exports = app;
