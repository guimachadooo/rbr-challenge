"use client";

import React, { useState } from 'react';
import { 
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/Employee';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement,
  role: HTMLInputElement,
  department: HTMLInputElement,
  admissionDate: HTMLInputElement,
}

interface FormEmployee extends HTMLFormElement {
 readonly elements: FormElements
}

const EditEmployeePage: React.FC = () => {
  const toast = useToast();
  const params = useParams();
  const router = useRouter();
  const id =  params.id as string;
  const queryClient = useQueryClient();
  const [employee, setEmployee] = useState({
    _id: '',
    name: '',
    role: '',
    department: '',
    admissionDate: ''
  });

  const fetchUser = async (id: string) => {
    const { data } = await axios.get(BASE_URL + `/${id}`);
    
    let formattedDate = moment(data.employee.admissionDate).format("YYYY-MM-DD");
    data.employee.admissionDate = formattedDate;
    setEmployee(data.employee);

    return data;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => fetchUser(id),
  });

  const setValues = (field: string, e: any) => {
    setEmployee({...employee, [field]: e.target.value})
  }

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent<FormEmployee>) => {
      e.preventDefault();
     
      try{
        await axios.put(BASE_URL + `/${employee._id}`, { 
          newName: employee.name,
          newRole: employee.role,
          newDepartment: employee.department,
          newAdmissionDate: employee.admissionDate
        })
        .then((res) => {
          toast({
            title: res.data.message,
            description: res.data.description,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
    
          router.push("/dashboard");
        });
  
      }catch(err: any){
        toast({
          title: err.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  })

  if (isLoading) return <div>Carregando informações...</div>;
  if (isError) return <div>Erro, tente novamente.</div>;

  return (
    <div>
      <h2>Editar Funcionário: guigo - {id}</h2>
      
      <Button as={Link} href="/dashboard">{'<'} Voltar</Button>

      <form action="post" onSubmit={handleUpdate}>
        <FormControl isRequired>
          <FormLabel>Nome</FormLabel>
          <Input 
            type="text" 
            name="name"
            value={employee.name}
            onChange={(e) => setValues("name", e)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input 
            type="text" 
            name="role"
            value={employee.role}
            onChange={(e) => setValues("role", e)} 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Departamento</FormLabel>
          <Input 
            type="text" 
            name="department"
            value={employee.department}
            onChange={(e) => setValues("department", e)} 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Data de Admissão</FormLabel>
          <Input 
            type="date" 
            name="admissionDate"
            value={employee.admissionDate}
            onChange={(e) => setValues("admissionDate", e)} 
          />
        </FormControl>

        <Button 
          type="submit" 
          isLoading={isPending} 
          disabled={isPending}
          loadingText="Salvando..."
        >
          Salvar alterações
        </Button>
      </form>
    </div>
  );
};

export default EditEmployeePage;