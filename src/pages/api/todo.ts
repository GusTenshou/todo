import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error creating ToDo:', error);
      res.status(500).json({ message: 'Error creating ToDo', error });
    }
  } else if (req.method === 'GET') {
    try {
      const todos = await prisma.toDo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ToDos', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
