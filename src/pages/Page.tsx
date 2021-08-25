import React from "react";
import {
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { App } from "@capacitor/app";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import { proxy } from "../utils/constants";

interface Categories {
  categories: { imageUrl: string; title: string }[];
}

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [recipesCategory, setRecipesCategory] = React.useState<Categories>();
  const location = useLocation();
  const ionRouter = useIonRouter();
  document.addEventListener("ionBackButton", (ev) => {
    console.log({ ev, ionRouter });

    console.log("app register");
    if (ionRouter.routeInfo.pathname === "/page/Inbox") {
      console.log("app exits");
      App.exitApp();
    }

    // @ts-ignore
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });

    // if (location.pathname === "/page/Inbox") {
    //   console.log("app exits");
    //   App.exitApp();
    // }
  });
  useIonViewWillEnter(() => {
    console.log("ionViewWillEnter event fired");
    (async () => {
      try {
        const res = await fetch(
          `https://recipesapi.herokuapp.com/api/v2/categories`
        );
        const data = await res.json();
        setRecipesCategory(data);
        console.log({ data });
      } catch (error) {
        console.log(error);
      }
    })();
  });
  console.log(recipesCategory);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {recipesCategory &&
          recipesCategory.categories.map((item) => (
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                <IonCardTitle>{item.title}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
            // <p
            //   style={{
            //     fontSize: "20px",
            //     color: "black",
            //   }}
            // >
            //   {item.title}
            // </p>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Page;
