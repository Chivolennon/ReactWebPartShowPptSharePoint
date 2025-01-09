// import * as React from 'react';
// import { useState, useEffect } from "react";
// import { getFilesFromLibrary } from '../../../services/spService';

// const ShowPpt: React.FC = () => {
//   const [files, setFiles] = useState<any[]>([]);
//   const [selectedFile, setSelectedFile] = useState<string>("");

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const libraryPath = "/sites/Test/Reflexiones"; // Ruta válida de tu biblioteca
//         const fetchedFiles = await getFilesFromLibrary(libraryPath);
//         setFiles(fetchedFiles);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedFile(event.target.value); // URL de vista previa
//   };

//   return (
//     <div>
//       <h2>Selecciona una presentación</h2>
//       <select onChange={handleFileChange} value={selectedFile}>
//         <option value="">-- Selecciona un archivo --</option>
//         {files.map((file) => (
//           <option key={file.UniqueId} value={file.previewUrl}>
//             {file.Name}
//           </option>
//         ))}
//       </select>

//       {selectedFile && (
//         <div style={{ marginTop: "20px" }}>
//           <iframe
//             src={selectedFile}
//             width="800"
//             height="600"
//             frameBorder="0"
//             title="Presentación"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowPpt;


// src/webparts/showPpt/components/ShowPpt.tsx
import * as React from "react";
import { useState, useEffect } from "react";
import spService from "../../../services/spService"; // Ajusta la ruta
import { IFile } from "../../../Interface/IFile";

const ShowPpt: React.FC<{ spService: spService }> = ({ spService }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const libraryPath = "/sites/Test/Reflexiones";
        const fetchedFiles = await spService.getFilesFromLibrary(libraryPath);
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error al obtener los archivos:", error);
      }
    };

    fetchFiles();
  }, [spService]);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  return (
    <div>
      <h2>Selecciona una presentación</h2>
      <select onChange={handleFileChange} value={selectedFile}>
        <option value="">-- Selecciona un archivo --</option>
        {files.map((file) => (
          <option key={file.UniqueId} value={file.previewUrl}>
            {file.Name}
          </option>
        ))}
      </select>

      {selectedFile && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            src={selectedFile}
            width="800"
            height="600"
            frameBorder="0"
            title="Presentación"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ShowPpt;
