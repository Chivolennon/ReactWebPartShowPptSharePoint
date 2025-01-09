import { IFile } from "../../../Interface/IFile";
import * as React from "react";
import { useState, useEffect } from "react";
import spService from "../../../services/spService";

const ShowPpt: React.FC<{ spService: spService }> = ({ spService }) => {
  const [files, setFiles] = useState<IFile[]>([]); // Lista de archivos
  const [selectedFile, setSelectedFile] = useState<string>(""); // Archivo seleccionado
  const [showPresentation, setShowPresentation] = useState<boolean>(false); // Estado para alternar entre pantallas

  // Obtener archivos al cargar el componente
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const libraryPath = "/sites/Test/Reflexiones"; // Ruta de la biblioteca
        const fetchedFiles = await spService.getFilesFromLibrary(libraryPath); // Llama al servicio para obtener archivos
        setFiles(fetchedFiles); // Almacena los archivos en el estado
      } catch (error) {
        console.error("Error al obtener los archivos:", error);
      }
    };

    fetchFiles();
  }, [spService]);

  // Manejar el cambio en el selector
  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value); // Establece el archivo seleccionado
    setShowPresentation(true); // Cambia a la pantalla de presentación
  };

  // Icono para retroceder a la pantalla principal
  const handleBack = () => {
    setShowPresentation(false); // Regresa a la pantalla principal
  };

  // Función para seleccionar numero aleatorio del archivo
  const randomSelect = () =>{
    if (files.length > 0){
      const randomIndex = Math.floor(Math.random() * files.length); // Genera un indice aleatorio
      setSelectedFile(files[randomIndex].previewUrl);
      setShowPresentation(true);
    }
  };

// Pantalla principal
if (!showPresentation) {
  return (
    <section
      style={{
        backgroundImage: `url(${require("../assets/Fondo_Colbun.png")})`, // URL de la imagen de fondo
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%", // Tamaño dinámico del WebPart
        height: "50vh", // Tamaño dinámico del WebPart
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Título principal */}
      <h1
        style={{
          color: "#fff",
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Haz clic con la seguridad
      </h1>

 {/* Subtítulo */}
 <h2
        style={{
          color: "#fff",
          fontSize: "1.5rem",
          marginBottom: "30px",
        }}
      >
        Encuentra tu consejo{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>aquí</span>
      </h2>

      {/* Botón invisible que cubre el texto "Encuentra tu consejo aquí" */}
      <button
        onClick={randomSelect}
        style={{
          opacity: 0, // Botón invisible
          position: "absolute", // Permitir que cubra el texto
          top: "50%", // Centrar respecto al contenedor
          left: "50%",
          transform: "translate(-50%, -30px)", // Ajusta la posición para que cubra el texto
          width: "300px",
          height: "50px",
          cursor: "pointer",
        }}
        aria-label="Seleccionar presentación aleatoria"
      ></button>

      {/* Texto adicional */}
      <p
        style={{
          color: "#fff",
          fontSize: "1rem",
          marginBottom: "20px",
        }}
      >
        Si estás buscando un tema en particular, encuéntralo aquí
      </p>

      {/* Desplegable */}
      <select
        onChange={handleFileChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "20px",
        }}
      >
        <option value="">-- Selecciona un archivo --</option>
        {files.map((file) => (
          <option key={file.UniqueId} value={file.previewUrl}>
            {file.Name}
          </option>
        ))}
      </select>
    </section>
  );
}
// Pantalla de presentación
return (
  <div
    style={{
      width: "100%",
      height: "50vh", // Misma altura que la pantalla principal
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    {/* Icono para regresar */}
    <div
      onClick={handleBack}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        display: "flex",
        alignItems: "center",
        fontSize: "30px",
        cursor: "pointer",
        color: "#fff",
        backgroundColor: "#000",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      ←
    </div>
    <iframe
      src={selectedFile}
      style={{
        width: "100%", // Ocupa el ancho completo del contenedor
        height: "50vh", // Coincide con la altura de la interfaz inicial
        border: "none",
      }}
      title="Presentación"
    ></iframe>
  </div>
);

};
export default ShowPpt;
