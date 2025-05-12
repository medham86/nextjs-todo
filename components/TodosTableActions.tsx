"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todo.actions";
import Spinner from "./ui/Spinner";
import UpdateTodoForm from "./UpdateTodoForm";
import { ITodo } from "@/interfaces";
import { useToast } from "@/hooks/use-toast";

interface IProps {
  todo: ITodo;
}

const TodosTableActions = ({ todo }: IProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <UpdateTodoForm todo={todo} />
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction(todo.id);
          toast({
            title: "Delete Todo",
            description: "Your Todo has been deleted successfully",
            variant: "destructive",
            duration: 1500,
          });
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash />}
      </Button>
    </>
  );
};

export default TodosTableActions;
