import { useQuery } from "react-query";
import { api } from "../api";
import { format } from "date-fns";
import ptBr from 'date-fns/locale/pt-BR'

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers(): Promise<User[]> {
  const data = await api.get("/users")
    .then(res => res.data)
    .catch(err => console.log(err));

  const users = data.users.map(user => {
    console.log(user)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: format(new Date(user.created_at), "dd MMMM yyyy", { locale: ptBr })
    };
  });

  return users;
}

export function userUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5,
  }); //metodo para armazenar em cache
}