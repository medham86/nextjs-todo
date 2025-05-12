"use client";

import { todoFormSchema, todoFormValues } from "@/schema";

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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { createTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AddTodoForm = ({ userId }: { userId: string | null }) => {
  const defaultValues: Partial<todoFormValues> = {
    title: "",
    body: "",
    completed: false,
  };
 
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = ({ title, body, completed }: todoFormValues) => {
    createTodoAction({ title, body, completed, userId: userId });
    toast({
      title: "Add Todo",
      description: "Your Todo has been added successfully",
      variant: "primary",
      duration: 1500,
    });

  
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus size={14} className="mr-1" />
            Add Todo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>This is creation of todo form</DialogDescription>
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

                <Button type="submit">Add todo</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTodoForm;
