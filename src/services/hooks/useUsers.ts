import { useQuery } from "react-query";
import { api } from "../axios/api";

type User = {
  id: string;
  name: string;
  email: string;
  createAt: string;
}

export async function getUsers(): Promise<User[]> {
  const data = await api.get("/users")
    .then(res => res.data)
    .catch(err => console.log(err));

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
    };
  });

  return users;
}

export function userUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5,
  }); //metodo para armazenar em cache
}