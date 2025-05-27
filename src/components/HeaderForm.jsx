import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import logo from "../assets/logo-uni.png";

const tiposDoc = [
  { value: "CC", label: "Cédula" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "CE", label: "Cédula de Extranjería" }
];

export default function HeaderForm({ header, setHeader, setHeaderValid }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm({
    defaultValues: header,
    mode: "onChange"
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  React.useEffect(() => {
    reset(header);
  }, [header, reset]);

  React.useEffect(() => {
    setHeaderValid(isValid);
  }, [isValid, setHeaderValid]);

  const onSubmit = (data) => {
    setHeader(data);
    setOpenSnackbar(true); // Mostrar mensaje de éxito
  };

  const tipoDocValue = watch("tipoDoc") || "";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth={800}
      mx="auto"
      gap={3}
      padding={2}
    >
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" justifyContent="center">
        <img src={logo} alt="Logo Institución" style={{ width: 72, height: 72, objectFit: "contain" }} />
        <Typography fontWeight="bold" fontSize="1.7rem" textAlign="center">
          UNIVERSIDAD POPULAR DEL CESAR
        </Typography>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          width: "100%"
        }}
        autoComplete="off"
      >
        <FormControl
          error={Boolean(errors.tipoDoc)}
          size="large"
          fullWidth
        >
          <InputLabel id="tipoDoc-label">Tipo de Documento</InputLabel>
          <Select
            labelId="tipoDoc-label"
            label="Tipo de Documento"
            value={tipoDocValue}
            {...register("tipoDoc", { required: "Seleccione el tipo de documento" })}
            onChange={e => setValue("tipoDoc", e.target.value, { shouldValidate: true })}
            sx={{ fontSize: "1.1rem" }}
          >
            <MenuItem value=""><em>Seleccione...</em></MenuItem>
            {tiposDoc.map(td => (
              <MenuItem key={td.value} value={td.value}>{td.label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors.tipoDoc?.message || "Seleccione el tipo de documento"}
          </FormHelperText>
        </FormControl>

        <TextField
          label="Cédula"
          variant="outlined"
          type="text"
          inputProps={{ maxLength: 10, style: { fontSize: "1.1rem" } }}
          {...register("cedula", {
            required: "Ingrese la cédula",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo números"
            },
            minLength: { value: 8, message: "Mínimo 8 dígitos" },
            maxLength: { value: 10, message: "Máximo 10 dígitos" }
          })}
          error={Boolean(errors.cedula)}
          helperText={errors.cedula?.message || "Ingrese solo números (8-10 dígitos)"}
          fullWidth
        />

        <TextField
          label="Nombre completo"
          variant="outlined"
          inputProps={{ style: { fontSize: "1.1rem" } }}
          {...register("nombre", {
            required: "Ingrese el nombre completo",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
              message: "Solo letras y espacios"
            }
          })}
          error={Boolean(errors.nombre)}
          helperText={errors.nombre?.message || "Solo letras y espacios"}
          fullWidth
        />

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            sx={{
              height: "56px",
              backgroundColor: "#1976d2",
              fontWeight: "bold",
              fontSize: "1.1rem",
              paddingX: 3,
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                backgroundColor: "#125ea6"
              }
            }}
          >
            Confirmar Datos
          </Button>
        </Box>
      </form>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ fontSize: "1rem" }}>
          ¡Datos confirmados correctamente!
        </Alert>
      </Snackbar>
    </Box>
  );
}
