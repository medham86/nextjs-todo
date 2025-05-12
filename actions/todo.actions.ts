"use server";

import { ITodo } from "@/interfaces";
import { todoFormValues } from "@/schema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodosAction = async ({userId}:{userId : string| null}) => {
  const todos = await prisma.todo.findMany({
    where:{
      user_id : userId as string
    }
  });
  return todos;
};
export const createTodoAction = async ({
  title,
  body,
  completed,
  userId,
}: {
  title: string;
  body?: string | undefined;
  completed: boolean;
  userId: string | null;
}) => {
  await prisma.todo.create({
    data: {
      title: title,
      body: body ,
      completed: completed,
      user_id: userId as string 
    },
  });
  revalidatePath("/");
};
export const updateTodoAction = async ({
  id,
  title,
  body,
  completed,
}: ITodo) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};
export const deleteTodoAction = async (id: string) => {
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/");
};
