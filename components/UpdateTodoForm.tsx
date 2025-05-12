"use client";
import { useToast } from "@/hooks/use-toast";
import { todoFormSchema, todoFormValues } from "@/schema";
import { updateTodoAction } from "@/actions/todo.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { Pen } from "lucide-react";
import { ITodo } from "@/interfaces";
import { useEffect, useState } from "react";

interface IProps {
  todo: ITodo;
}

const UpdateTodoForm = ({ todo }: IProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const defaultValues: Partial<todoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: todoFormValues) => {
    updateTodoAction({
      id: todo.id,
      title: data.title,
      body: data.body as string,
      completed: data.completed,
    });
    toast({
      title: "Update Todo",
      description: "Your Todo has updated successfully",
      variant: "default",
      duration: 1500,
    });
   
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Todo</DialogTitle>
            <DialogDescription>This is Update of todo form</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Todo Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display todo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Todo description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can organizations to link to them.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>check if Completed</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit">Update todo</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTodoForm;
