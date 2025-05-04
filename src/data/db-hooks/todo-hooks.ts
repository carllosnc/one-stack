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
import { DeleteTodo, UpdateTodo } from "@/data/db-schemas/todo-schema";

export function useTodos(userId: string) {
  return useQuery({
    queryKey: ["todos", userId],
    queryFn: () => getTodos(userId),
  });
}

export function useTodo(id: number, userId: string) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id, userId),
    enabled: !!id, // Only fetch if ID is provided
  });
}

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

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId, updates }: UpdateTodo) =>
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

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: DeleteTodo) => deleteTodo(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
