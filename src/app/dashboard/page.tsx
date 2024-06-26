"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Stack,
  Skeleton,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
  useMediaQuery,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { BASE_URL } from "@/constants/Employee";
import { DataTable } from "@/components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Employees {
  _id: string;
  name: string;
  role: string;
  department: string;
  admissionDate: Date;
}

const DashboardPage: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const cancelRef = React.useRef(null);
  const [removableId, setRemovableId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 800px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axios.get(BASE_URL);

      setResults(data.employees);

      return data.employees as Employees[];
    },
  });

  const [results, setResults] = useState({} as any);

  const handleId = (id: any) => {
    setRemovableId(id);
    onOpen();
  };

  const { mutate: deleteEmployee, isPending } = useMutation({
    mutationFn: async () => {
      try {
        axios.delete(BASE_URL + `?id=${removableId}`).then((res) => {
          toast({
            title: res.data.message,
            description: res.data.description,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        });

        onClose();

        queryClient.invalidateQueries({ queryKey: ["employees"] });
      } catch (err: any) {
        toast({
          title: err.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    },
  });

  const columnHelper = createColumnHelper<Employees>();

  const boxActions = (row: any) => (
    <div>
      <Button
        as={Link}
        disabled={isPending}
        mr={4}
        leftIcon={<EditIcon />}
        href={`/employee/edit-employee/${row._id}`}
      >
        {!isMobile && "Editar"}
      </Button>

      <Button
        colorScheme="red"
        disabled={isPending}
        isLoading={isPending}
        leftIcon={<DeleteIcon />}
        loadingText={isMobile && "Excluindo..."}
        onClick={() => handleId(row._id)}
      >
        {!isMobile && "Excluir"}
      </Button>
    </div>
  );

  //colunas da table no desktop
  const columns = [
    columnHelper.accessor("name", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("role", {
      header: "Cargo",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("department", {
      header: "Departamento",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("admissionDate", {
      header: "Data de admissão",
      cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
    }),
    columnHelper.display({
      header: "Ações",
      cell: (props) => {
        let { original } = props.row;

        return boxActions(original as any);
      },
    }),
  ];

  //colunas da table no mobile
  const columnsMobile = [
    columnHelper.accessor("name", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      header: "Ações",
      cell: (props) => {
        let { original } = props.row;

        return boxActions(original as any);
      },
    }),
  ];

  //filtra os registros do lado do cliente
  //buscando a string no array data, agilizando a pesquisa
  const handleSearch = (e: any) => {
    e.preventDefault();

    const { value } = e.target;

    const filter = (field: string) => {
      return field.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    let result = data?.filter((item) => {
      return filter(item.name) || filter(item.role) || filter(item.department);
    });

    //se o campo busca estiver vazio, retorna todos
    //os registros, se não então irá setar o array 
    //com os dados filtrados
    if (value.length == 0) {
      setResults(data);
    } else {
      setResults(result);
    }
  };

  if (isLoading)
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );

  if (isError)
    return (
      <div>
        <h3>Erro, tente novamente.</h3>
      </div>
    );

  return (
    <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }}>
      <Box
        p={4}
        mr={5}
        mb={22}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Heading as="h3" size="lg">
          Dashboard Funcionários
          {data?.length as any > 0 && (
            <>
              {!isMobile && (
                <Text fontSize="lg">
                  Total de {data?.length} registro{(data?.length as any) > 1 && "s"}
                  .
                </Text>
              )}
            </>
          )}
        </Heading>

        <Button
          as={Link}
          bg="green.300"
          variant="solid"
          leftIcon={<AddIcon />}
          padding={isMobile ? 6 : 8}
          href="/employee/add-employee"
          _hover={{ bg: "green.400" }}
          style={{fontSize: isMobile ? "0.8em" : "1em"}}
        >
          {isMobile ? "Add" : "Adicionar"} Funcionário
        </Button>
      </Box>

      <Box p={4} mr={6} mb={2} display="flex" flexDirection={"column"}>
        <InputGroup>
          <Input
            placeholder="Busque por nome, cargo ou departamento..."
            onChange={(e) => handleSearch(e)}
          />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Box mb={2} display="flex" flexDirection={"column"}>
        <DataTable
          columns={isMobile ? columnsMobile : columns}
          data={results!}
        />

        {data?.length as any == 0 && (
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Nenhum registro.
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Crie agora mesmo clicando em <br/> + Adicionar Funcionário.
            </AlertDescription>
          </Alert>
        )}
      </Box>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir funcionário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Essa ação não poderá ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              
              <Button colorScheme="red" onClick={() => deleteEmployee()} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </SimpleGrid>
  );
};

export default DashboardPage;
