import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { Name, Description, DateStart, DateEnd, Priority } = req.body;

    try {
      const newTodo = await prisma.toDo.create({
        data: {
          Name,
          Description,
          DateStart: new Date(DateStart),
          DateEnd: new Date(DateEnd),
          Priority,
        },
      });
      res.status(200).json(newTodo);
    } catch (error) {
      console.error("Error creating ToDo:", error);
      res.status(404).json({ message: "Error creating ToDo", error });
    }
  } else if (req.method === "GET") {
    try {
      const todos = await prisma.toDo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ToDos", error });
    }
  } else if (req.method === "DELETE") {
    const id = parseInt(req.query.id as string); // Converta o id para um número

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    try {
      const todo = await prisma.toDo.delete({
        where: {
          id, // Agora id é um número
        },
      });
      res.status(200).json(todo);
    } catch (error) {
      res.status(404).json({ message: "Error deleting ToDo", error });
    }
  } else if (req.method === "PUT") {
    const { Name, Description, DateStart, DateEnd, Priority } = req.body;
    const id = parseInt(req.query.id as string);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    try {
      const updatedTodo = await prisma.toDo.update({
        where: {
          id,
        },
        data: {
          Name,
          Description,
          DateStart: new Date(DateStart),
          DateEnd: new Date(DateEnd),
          Priority,
        },
      });
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(404).json({ message: "Error updating ToDo", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
