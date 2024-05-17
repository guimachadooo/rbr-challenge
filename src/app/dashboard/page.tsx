"use client"; 

import React, { useState } from 'react';
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
  useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { BASE_URL } from '@/constants/Employee';
import { DataTable } from '@/components/DataTable';
import { createColumnHelper } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Employees{
  _id: string,
  name: string,
  role: string,
  department: string,
  admissionDate: Date,
  actions: any
}

const DashboardPage: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const cancelRef = React.useRef(null);
  const [removableId, setRemovableId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async() => {
      const { data } = await axios.get(BASE_URL);

      return data.employees as Employees[];
    }
  });

  const handleId = (id: any) => {
    setRemovableId(id);
    onOpen();
  }

  const {mutate: deleteEmployee, isPending} = useMutation({
    mutationFn: async () => { 
      try{
        axios.delete(BASE_URL + `?id=${removableId}`)
        .then((res) => {
          toast({
            title: res.data.message,
            description: res.data.description,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        });

        onClose();

        queryClient.invalidateQueries({queryKey: ['employees']});
      }catch(err: any){
        toast({
          title: err.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  });
  
  const columnHelper = createColumnHelper<Employees>();
  
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
    columnHelper.display({
      id: 'actions',
      cell: (props) => {
        let { original } = props.row;

        return (
          <div>
            <Button 
              as={Link} 
              disabled={isPending}
              href={`/edit-employee/${original._id}`}
            >
              Editar
            </Button>

            <Button
              colorScheme='red'
              disabled={isPending}
              isLoading={isPending}
              loadingText="Excluindo..."
              onClick={() => handleId(original._id)}
            >
              Excluir
            </Button>
          </div> 
        )
      }
    }),
  ];

  if (isLoading) return <div>Carregando lista...</div>;
  if (isError) return <div>Erro, tente novamente.</div>;

  return (
    <div>
      <h2>Dashboard</h2>

      <Button as={Link} href="/add-employee">Adicionar Funcionário</Button>

      <Input
        placeholder="Buscar funcionário"
      />

      <DataTable columns={columns} data={data!} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Excluir funcionário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Essa ação não poderá ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => deleteEmployee()} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default DashboardPage;
