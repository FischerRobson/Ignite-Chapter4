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

type GetUserResponse = {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUserResponse> {

  const { data, headers } = await api.get("/users", {
    params: {
      page,
    }
  })
    .then(res => res)
    .catch(err => console.log(err));

  const totalCount = Number(headers["x-total-count"]);

  console.log(data)
  console.log(headers)

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: format(new Date(user.created_at), "dd MMMM yyyy", { locale: ptBr })
    };
  });

  return {
    users,
    totalCount
  };
}

export function userUsers(page: number) {
  return useQuery(["users", { page }], () => getUsers(page), {
    staleTime: 1000 * 5 * 60,
  }); //metodo para armazenar em cache
}