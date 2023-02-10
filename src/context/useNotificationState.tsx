import { FC, useContext, useMemo, useReducer } from "react";
import { createContext } from "react";
import Notification from "../components/Notification/Notification";
import NotificationStyles from "../components/CSS/NotificationStyles";

const { NotificationContainerStyled } = NotificationStyles;

// @ts-ignore
const NotificationContext = createContext();
const initialState: PayloadType[] = [];

export interface NotificationProps extends INotificationStyled {
  /**
   * The notification ID will generated if not assigned
   */
  id: string;

  /**
   * The title to display in notification
   */
  title?: string;

  /**
   * The message to display in notification
   */
  message?: string;

  /**
   * set an icon to show inside the notification
   */
  icon?: React.ReactElement;

  /**
   * used for dispatching state to context
   */

  dispatch: (value: NotificationActionType) => void;
}

export interface INotificationStyled extends INotificationContainer {
  /**
   * type
   */
  type: notifyType;

  /**
   * starts close animation when true
   */
  isClosing?: boolean;
}

export interface INotificationContainer {
  /**
   * position  of element
   */
  position: IPosition;
}

export type IPosition = "topR" | "topL" | "bottomR" | "bottomL";

export type notifyType = "error" | "info" | "success" | "warning";

export type NotificationActionType = {
  type: "add_notification" | "remove_notification" | "clear_notifications";
  payload: PayloadType;
  id: string;
};

export type PayloadType = {
  id?: string;
  type: notifyType;
  message?: string;
  title?: string;
  icon?: React.ReactElement; //Icon
  position: IPosition;
  iconColor?: string;
};

export interface IToasts {
  topR: PayloadType[];
  topL: PayloadType[];
  bottomR: PayloadType[];
  bottomL: PayloadType[];
}

function reducer(state: PayloadType[], action: NotificationActionType) {
  switch (action.type) {
    case "add_notification":
      return [...state, { ...action.payload }];
    case "remove_notification":
      return state.filter((toast) => toast.id !== action.id);
    case "clear_notifications":
      return [];
    default:
      return state;
  }
}

const NotificationProvider: FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toasts = useMemo(() => {
    const toaster: IToasts = {
      topR: [],
      topL: [],
      bottomR: [],
      bottomL: [],
    };
    state.forEach((toast: PayloadType) => toaster[toast.position].push(toast));

    return (Object.keys(toaster) as IPosition[]).map((pos) => {
      return (
        <NotificationContainerStyled position={pos} key={`container-${pos}`}>
          {toaster?.[pos]?.map((toast: PayloadType) => (
            <Notification
              key={toast.id}
              id={toast.id || String(Date.now())}
              dispatch={dispatch}
              {...toast}
            />
          ))}
        </NotificationContainerStyled>
      );
    });
  }, [state]);

  return (
    <NotificationContext.Provider value={dispatch}>
      {toasts}
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  if (dispatch === undefined) {
    throw new Error(
      "useNotification hook must be used within a NotificationProvider"
    );
  }

  return (props: any) => {
    // @ts-ignore
    dispatch({
      type: "add_notification",
      payload: {
        id: String(Date.now()),
        ...props,
      },
    });
  };
};

export default NotificationProvider;
