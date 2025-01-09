// import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
// import * as React from "react";
// import * as ReactDom from "react-dom";
// import ShowPpt from "./components/ShowPpt";
// import { initPnP } from "../../services/spService";

// export default class ShowPptWebPart extends BaseClientSideWebPart<any> {
//   protected onInit(): Promise<void> {
//     return super.onInit().then(() => {
//       // Inicializar PnPJS
//       initPnP(this.context);
//     });
//   }

//   public render(): void {
//     const element = React.createElement(ShowPpt, {}); // Pasa props si es necesario
//     ReactDom.render(element, this.domElement);
//   }
// }


// src/webparts/showPpt/ShowPptWebPart.ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from "react-dom";
import ShowPpt from "./components/ShowPpt";
import spService from "../../services/spService";

export default class ShowPptWebPart extends BaseClientSideWebPart<any> {
  private spServiceInstance: spService;

  protected onInit(): Promise<void> {
    this.spServiceInstance = new spService(this.context);
    return super.onInit();
  }

  public render(): void {
    const element = React.createElement(ShowPpt, {
      spService: this.spServiceInstance,
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}


