import { getTodosAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import { NavigationMenuDemo } from "@/components/Navbar";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {

  //  const { userId } = await auth()
   const {userId}:{userId:string|null} = await auth()
  

   const todos = await getTodosAction({userId});

  return (
    <main className="container max-w-screen-lg mx-auto space-y-3">
      <NavigationMenuDemo />
      <AddTodoForm userId={userId}  />
      <TodoTable todos={todos} />

    </main>
  );
}
