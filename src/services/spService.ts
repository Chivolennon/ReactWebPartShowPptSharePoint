import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs"; // Habilita el acceso a webs
import "@pnp/sp/folders"; // Habilita el acceso a carpetas
import "@pnp/sp/files"; // Habilita el acceso a archivos

// Configuración global de PnPJS
let sp: ReturnType<typeof spfi>;

export const initPnP = (context: any): void => {
    console.log("CONTEXTO:", context)
    sp = spfi().using(SPFx(context));
    console.log("Contexto recibido en initPnP:", context);
};

// Función para obtener archivos de una biblioteca de SharePoint
export const getFilesFromLibrary = async (libraryPath: string): Promise<any[]> => {
    try {
      const files = await sp.web.getFolderByServerRelativePath(libraryPath)
        .files.select("Name", "ServerRelativeUrl", "UniqueId") // Incluye UniqueId
        ();
  
      // Generar las URLs de vista previa para cada archivo
      return files.map(file => ({
        ...file,
        previewUrl: `https://4nlnfy.sharepoint.com/sites/Test/_layouts/15/Doc.aspx?sourcedoc=${file.UniqueId}&action=embedview`
      }));
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
      throw error;
    }
  };
