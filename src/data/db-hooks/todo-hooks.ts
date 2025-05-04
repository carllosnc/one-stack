import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from "@/data/db-actions/todo-action";
import { InsertTodo } from "@/data/db-schemas/todo-schema";

// Fetch all todos
export function useTodos(userId: string) {
  return useQuery({
    queryKey: ["todos", userId],
    queryFn: () => getTodos(userId),
  });
}

// Fetch a single todo by ID
export function useTodo(id: number, userId: string) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id, userId),
    enabled: !!id, // Only fetch if ID is provided
  });
}

// Create a new todo
export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; userId: string }) => createTodo(data.title, data.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey : ["todos"],
      }); // Refetch todos after creation
    },
  });
}

// Update a todo by ID
export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId, updates }: { id: number; userId: string; updates: Partial<InsertTodo> }) =>
      updateTodo(id, userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey : ["todos"],
      }); // Refetch todos after update
      queryClient.invalidateQueries({
        queryKey : ["todo"],
      }); // Refetch individual todo if needed
    },
  });
}

// Delete a todo by ID
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: { id: number; userId: string }) => deleteTodo(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
