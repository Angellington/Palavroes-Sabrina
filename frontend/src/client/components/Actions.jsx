// import React from 'react'
import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Actions = ( { onActionComplete } ) => {
  const [rows, setRows] = useState({
    nome: "",
});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRows((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e);

    const formData = new FormData(e.target);
    // console.log(formData);
    const data = Object.fromEntries(formData.entries());

    fetch("http://localhost:5000/pessoas/aplicar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao enviar dados");
      }
      return response.json();
    })
      .then((data) => {
        console.log("Success:", data);
        // Optionally, you can reset the form or update the UI
        e.target.reset();
        if(onActionComplete) {
          onActionComplete(); // Chama a função para recarregar o histórico
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form action="post" onSubmit={handleSubmit}>
      <Box
        component={"section"}
        sx={{
          padding: "20px",
          backgroundColor: "#f1f1f1",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Sabrina não quer mais falar palavrão
        </Typography>

        <TextField
          label="Nome"
          variant="outlined"
          onChange={handleChange}
          name='nome'
          value={rows.nome}
          required
        />
      
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Aplicar
        </Button>
      </Box>
    </form>
  );
};

export default Actions;
