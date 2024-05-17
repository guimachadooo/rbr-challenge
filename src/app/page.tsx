"use client"; 

import React from 'react';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const DashboardPage: React.FC = () => {
  

  return (
    <div>
      <h2>Login</h2>

      <Button as={Link} href="/dashboard">Acessar Dashboard</Button>

    </div>
  );
};

export default DashboardPage;
