import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Historical = () => {
  const [rows, setRows] = useState([]);

  // Carregar dados inicialmente
  useEffect(() => {
    fetch("http://localhost:5000/pessoas")
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Função para incrementar
  const handlePlus = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/pessoas/acrescentar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Erro ao incrementar");
      }

      const updatedPerson = await response.json();

      // Atualizar a linha correspondente no estado
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedPerson.id ? updatedPerson : row))
      );
    } catch (error) {
      console.error("Erro ao incrementar quantidade:", error);
    }
  };

  // Função para decrementar
  const handleMinus = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/pessoas/diminuir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Erro ao incrementar");
      }

      const updatedPerson = await response.json();

      // Atualizar a linha correspondente no estado
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedPerson.id ? updatedPerson : row))
      );
    } catch (error) {
      console.error("Erro ao decrementar quantidade:", error);
    }
  };

   const handleReset = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/pessoas/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Erro ao resetar");
      }

      const updatedPerson = await response.json();

      // Atualizar a linha correspondente no estado
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedPerson.id ? updatedPerson : row))
      );
    } catch (error) {
      console.error("Erro ao incrementar quantidade:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/pessoas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar pessoa");
      }

      // Atualizar o estado para remover a pessoa deletada
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
      alert("Erro ao deletar pessoa: " + error.message);
    }
  }

  return (
    <TableContainer
      sx={{
        maxHeight: 440,
        backgroundColor: "#f1f1f1",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Horário</TableCell>
            <TableCell justifyContent="center" align="center" sx={{display: 'flex', alignContent: 'center'}}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>
                 <Button variant="text" onClick={() => handleMinus(row.id)}>
                  -
                </Button>
                {row.quantidade}{" "}
                <Button variant="text" onClick={() => handlePlus(row.id)}>
                  +
                </Button>
              </TableCell>
              <TableCell>{formatDateTime(row.horario)}</TableCell>
              <TableCell justifyContent="center" align="center" sx={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                  X
                </Button>
                <Button variant="contained" color="warning" onClick={() => handleReset(row.id)}>
                  RESET
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Historical;
