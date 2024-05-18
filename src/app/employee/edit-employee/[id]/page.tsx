"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SkeletonCircle,
  SkeletonText,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "@/constants/Employee";
import { useParams, useRouter } from "next/navigation";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  role: HTMLInputElement;
  department: HTMLInputElement;
  admissionDate: HTMLInputElement;
}

interface FormEmployee extends HTMLFormElement {
  readonly elements: FormElements;
}

const EditEmployeePage: React.FC = () => {
  const toast = useToast();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [employee, setEmployee] = useState({
    _id: "",
    name: "",
    role: "",
    department: "",
    admissionDate: "",
  });

  //retorna os dados do funcionario
  const fetchUser = async (id: string) => {
    const { data } = await axios.get(BASE_URL + `/${id}`);

    let formattedDate = moment(data.employee.admissionDate).format(
      "YYYY-MM-DD"
    );

    data.employee.admissionDate = formattedDate;
    setEmployee(data.employee);

    return data;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => fetchUser(id),
  });

  //define os novos valores dos campos
  const setValues = (field: string, e: any) => {
    setEmployee({ ...employee, [field]: e.target.value });
  };

  //atualiza os dados passados
  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent<FormEmployee>) => {
      e.preventDefault();

      try {
        await axios
          .put(BASE_URL + `/${employee._id}`, {
            newName: employee.name,
            newRole: employee.role,
            newDepartment: employee.department,
            newAdmissionDate: employee.admissionDate,
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

  if (isLoading)
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );

  if (isError)
    return (
      <div>
        <h3>Erro, tente novamente.</h3>
      </div>
    );

  return (
    <div>
      <Box p={4}>
        <Center>
          <Wrap>
            <WrapItem>
              <Avatar size="2xl" src="" mr={10} />
            </WrapItem>
          </Wrap>

          <Heading as="h3" size="lg">
            {employee.name} <br />
            <small>{employee.role}</small>
          </Heading>
        </Center>
      </Box>

      <Box p={10}>
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
          <br />

          <FormControl isRequired>
            <FormLabel>Cargo</FormLabel>
            <Input
              type="text"
              name="role"
              value={employee.role}
              onChange={(e) => setValues("role", e)}
            />
          </FormControl>
          <br />

          <FormControl isRequired>
            <FormLabel>Departamento</FormLabel>
            <Input
              type="text"
              name="department"
              value={employee.department}
              onChange={(e) => setValues("department", e)}
            />
          </FormControl>
          <br />

          <FormControl isRequired>
            <FormLabel>Data de Admissão</FormLabel>
            <Input
              type="date"
              name="admissionDate"
              value={employee.admissionDate}
              onChange={(e) => setValues("admissionDate", e)}
            />
          </FormControl>
          <br />

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
              loadingText="Salvando..."
              _hover={{ bg: "green.500" }}
              leftIcon={<CheckCircleIcon />}
            >
              Salvar alterações
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default EditEmployeePage;
