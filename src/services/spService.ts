// import { spfi, SPFx } from "@pnp/sp";
// import "@pnp/sp/webs"; // Habilita el acceso a webs
// import "@pnp/sp/folders"; // Habilita el acceso a carpetas
// import "@pnp/sp/files"; // Habilita el acceso a archivos

// // Configuración global de PnPJS
// let sp: ReturnType<typeof spfi>;

// export const initPnP = (context: any): void => {
//     console.log("CONTEXTO:", context)
//     sp = spfi().using(SPFx(context));
//     console.log("Contexto recibido en initPnP:", context);
// };

// // Función para obtener archivos de una biblioteca de SharePoint
// export const getFilesFromLibrary = async (libraryPath: string): Promise<any[]> => {
//     try {
//       const files = await sp.web.getFolderByServerRelativePath(libraryPath)
//         .files.select("Name", "ServerRelativeUrl", "UniqueId") // Incluye UniqueId
//         ();
  
//       // Generar las URLs de vista previa para cada archivo
//       return files.map(file => ({
//         ...file,
//         previewUrl: `https://4nlnfy.sharepoint.com/sites/Test/_layouts/15/Doc.aspx?sourcedoc=${file.UniqueId}&action=embedview`
//       }));
//     } catch (error) {
//       console.error("Error al obtener los archivos:", error);
//       throw error;
//     }
//   };
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs"; // Acceso a webs
import "@pnp/sp/folders"; // Acceso a carpetas
import "@pnp/sp/files"; // Acceso a archivos
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFile } from "../Interface/IFile"; // Interfaz para los archivos

export default class spService {
  private sp: ReturnType<typeof spfi>;

  constructor(context: WebPartContext) {
    // Configuración inicial de PnPjs con contexto SPFx
    this.sp = spfi().using(SPFx(context));
  }

  /**
   * Obtiene los archivos de una biblioteca específica en SharePoint.
   * @param libraryPath Ruta relativa de la biblioteca en SharePoint.
   * @returns Lista de archivos con sus URLs de previsualización.
   */
  public async getFilesFromLibrary(libraryPath: string): Promise<IFile[]> {
    try {
      const nuevoSitio = "https://4nlnfy.sharepoint.com/sites/Test"; // URL del sitio base
      const web = this.sp.web.using((instance) => {
        instance._url = nuevoSitio; // Configura la URL dinámica del sitio
        return instance;
      });

      const files = await web.getFolderByServerRelativePath(libraryPath)
        .files.select("Name", "ServerRelativeUrl", "UniqueId")();

      // Mapea los archivos para incluir la URL de previsualización
      return files.map((file) => ({
        Name: file.Name,
        ServerRelativeUrl: file.ServerRelativeUrl,
        UniqueId: file.UniqueId,
        previewUrl: `https://4nlnfy.sharepoint.com/sites/Test/_layouts/15/Doc.aspx?sourcedoc=${file.UniqueId}&action=embedview`,
      }));
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
      throw error;
    }
  }
}
