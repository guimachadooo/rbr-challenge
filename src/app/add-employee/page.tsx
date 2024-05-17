"use client";

import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/Employee';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement,
  role: HTMLInputElement,
  department: HTMLInputElement,
  admissionDate: HTMLInputElement,
}

interface FormEmployee extends HTMLFormElement {
 readonly elements: FormElements
}

const AddEmployeePage: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const date = moment(new Date).format("YYYY-MM-DD");

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: '',
    admissionDate: date
  });

  const setValues = (field: string, e: any) => {
    setNewEmployee({...newEmployee, [field]: e.target.value})
  }

  const { mutate: submitEmployee, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent<FormEmployee>) => {
      e.preventDefault();
     
      try{
        await axios.post(BASE_URL, { 
          name: newEmployee.name,
          role: newEmployee.role,
          department: newEmployee.department,
          admissionDate: newEmployee.admissionDate
        })
        .then((res) => {
          toast({
            title: res.data.message,
            description: res.data.description,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
    
          //router.push("/dashboard");
          queryClient.invalidateQueries({queryKey: ['employees']});
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
  });

  return (
    <div>
      <h2>Adicionar Funcionário</h2>
      
      <Button as={Link} href="/dashboard">{'<'} Voltar</Button>

      <form action="post" onSubmit={submitEmployee}>
        <FormControl isRequired>
          <FormLabel>Nome</FormLabel>
          <Input 
            type="text" 
            name="name"
            onChange={(e) => setValues("name", e)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input 
            type="text" 
            name="role"
            onChange={(e) => setValues("role", e)} 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Departamento</FormLabel>
          <Input 
            type="text" 
            name="department"
            onChange={(e) => setValues("department", e)} 
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Data de Admissão</FormLabel>
          <Input 
            type="date" 
            name="admissionDate"
            value={newEmployee.admissionDate}
            onChange={(e) => setValues("admissionDate", e)} 
          />
        </FormControl>

        <Button 
          type="submit" 
          disabled={isPending}
          isLoading={isPending} 
          loadingText="Adicionando..." 
        >
          Adicionar
        </Button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
