
import {
   Table,
   TableBody,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/interfaces";
import TodosTableActions from "./TodosTableActions";
import { Badge } from "./ui/badge";

interface Todos {
  todos: ITodo[];
}

const TodoTable = ({ todos }: Todos) => {

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Id</TableHead>
            <TableHead>Title</TableHead>

            <TableHead className="text-center">Completed</TableHead>

            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo, idx) => (
            <TableRow key={todo?.id} className="cursor-pointer">
              <TableCell className="font-medium text-center">
                {idx + 1}
              </TableCell>
              <TableCell className="font-medium">{todo?.title}</TableCell>

              <TableCell className="text-center">
                {todo?.completed ? (
                  <Badge>Completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>Uncompleted</Badge>
                )}
              </TableCell>

              <TableCell className="flex items-center justify-end space-x-3">
               <TodosTableActions todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Total
            </TableCell>
            <TableCell className="text-right">{todos.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TodoTable;
