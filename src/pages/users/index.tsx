import { Box, Button, Checkbox, Flex, Heading, Icon, Link as ChakraLink, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { userUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {

  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching, refetch } = userUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(["user", userId], async () => {
      const response = await api.get(`/users/${userId}`)
        .then(res => res.data);
      return response;
    })
  }

  return (
    <Box>
      <Header />
      <Flex w="100vw" my="6" maxWidth={1480} mx="auto" px="6" >
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          p="8"
          bg="gray.800"
        >

          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isFetching && !isLoading && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="size"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados de usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    {isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold">{user.name}</Text>
                            </ChakraLink>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="size"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiEditLine} fontSize="16" />}
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountsOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  )
}