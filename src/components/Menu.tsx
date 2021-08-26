import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  useIonRouter,
} from "@ionic/react";
import { App } from "@capacitor/app";
import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";

import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Recipes",
    url: "/page/recipies",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "BreakFast",
    url: "/page/breakfast",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
 
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  const ionRouter = useIonRouter();
  document.addEventListener("ionBackButton", (ev) => {
    console.log({ ev, ionRouter });

    console.log("app register");
    // @ts-ignore
    ev.detail.register(1, () => {
      if (ionRouter.routeInfo.pathname === "/page/Inbox") {
        console.log("app exits");
        App.exitApp();
      }
    });

    // @ts-ignore
    // ev.detail.register(-1, () => {
    //   if (!ionRouter.canGoBack()) {
    //     App.exitApp();
    //   }
    // });

    // if (location.pathname === "/page/Inbox") {
    //   console.log("app exits");
    //   App.exitApp();
    // }
  });

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Recipes</IonListHeader>
          <IonNote>Welcome to recipes</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
