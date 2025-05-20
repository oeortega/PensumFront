import React from "react";
import { useForm } from "react-hook-form";

// Puedes cambiar la ruta del logo según donde lo tengas
import logo from "../assets/logo-uni.png"; // o "../assets/logo-uni.png"

const tiposDoc = [
  { value: "CC", label: "Cédula" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "CE", label: "Cédula de Extranjería" },
];

export default function HeaderForm({ header, setHeader }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: header
  });

  const onSubmit = (data) => setHeader(data);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto"
    }}>
      {/* Encabezado con logo y nombre de la institución */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <img
          src={logo}
          alt="Logo Institución"
          style={{ width: 64, height: 64, objectFit: "contain" }}
        />
        <span style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center"
        }}>
          UNIVERSIDAD NACIONAL DEL CESAR
        </span>
      </div>

      {/* Formulario */}
      <form
        onBlur={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <select {...register("tipoDoc", { required: true })}>
          <option value="">Tipo Doc</option>
          {tiposDoc.map(td => (
            <option key={td.value} value={td.value}>{td.label}</option>
          ))}
        </select>
        <input
          {...register("cedula", { required: true, pattern: /^[0-9]+$/ })}
          placeholder="Cédula"
        />
        {errors.cedula && <span style={{ color: "red" }}>Solo números</span>}
        <input
          {...register("nombre", { required: true, pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/ })}
          placeholder="Nombre completo"
        />
        {errors.nombre && <span style={{ color: "red" }}>Solo letras</span>}
      </form>
    </div>
  );
}