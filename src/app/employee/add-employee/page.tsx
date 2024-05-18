"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/Employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  role: HTMLInputElement;
  department: HTMLInputElement;
  admissionDate: HTMLInputElement;
}

interface FormEmployee extends HTMLFormElement {
  readonly elements: FormElements;
}

const AddEmployeePage: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const date = moment(new Date()).format("YYYY-MM-DD");

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    admissionDate: date,
  });

  //define os novos valores dos campos
  const setValues = (field: string, e: any) => {
    setNewEmployee({ ...newEmployee, [field]: e.target.value });
  };

  //cadastra um novo funcionario
  const { mutate: submitEmployee, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent<FormEmployee>) => {
      e.preventDefault();

      try {
        await axios
          .post(BASE_URL, {
            name: newEmployee.name,
            role: newEmployee.role,
            department: newEmployee.department,
            admissionDate: newEmployee.admissionDate,
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
            queryClient.invalidateQueries({ queryKey: ["employees"] });
          });
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

  return (
    <div>
      <Box p={4}>
        <Heading as="h3" size="lg">
          Novo Funcionário
        </Heading>
      </Box>

      <Box p={10}>
        <form action="post" onSubmit={submitEmployee}>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={(e) => setValues("name", e)}
            />
          </FormControl>
          <br />

          <FormControl isRequired>
            <FormLabel>Cargo</FormLabel>
            <Input
              type="text"
              name="role"
              onChange={(e) => setValues("role", e)}
            />
          </FormControl>
          <br />

          <FormControl isRequired>
            <FormLabel>Departamento</FormLabel>
            <Input
              type="text"
              name="department"
              onChange={(e) => setValues("department", e)}
            />
          </FormControl>
          <br />

          <FormControl isRequired>
            <FormLabel>Data de Admissão</FormLabel>
            <Input
              type="date"
              name="admissionDate"
              value={newEmployee.admissionDate}
              onChange={(e) => setValues("admissionDate", e)}
            />
          </FormControl>

          <Box mt={50}>
            <a href="/dashboard">
              <Button
                mr={4}
                bg="red.400"
                color="#fff"
                disabled={isPending}
                isLoading={isPending}
                _hover={{ bg: "red.500" }}
                leftIcon={<ArrowBackIcon />}
              >
                Cancelar
              </Button>
            </a>

            <Button
              color="#fff"
              type="submit"
              bg="green.400"
              disabled={isPending}
              isLoading={isPending}
              _hover={{ bg: "green.500" }}
              loadingText="Adicionando..."
              leftIcon={<CheckCircleIcon />}
            >
              Adicionar
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default AddEmployeePage;
