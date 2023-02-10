import React, { useEffect, useState } from "react";
import NotificationStyles from "../CSS/NotificationStyles";
import { CheckCircle, X, AlertCircle } from "react-feather";
import styled from "styled-components";
import { NotificationProps } from '../../context/useNotificationState';
import { UilTimes } from "@iconscout/react-unicons"

export const CloseIcon = styled(X)`
  color: White;
  z-index: 10;
  &:hover {
    cursor: pointer;
  }
`;

const {
  BarStyled,
  CloseWrapperStyled,
  IconWrapperStyled,
  NotificationStyled,
  SpanStyled,
  TextContentStyled,
  TitleStyled,
} = NotificationStyles;

const Notification =({
  dispatch,
  id,
  message = "view on explorer",
  title = "Deposited Exactly 2 Ren BTC at a price of $200",
  type = "info",
  position = "topR",
  success,
}: any) => {
  const [isClosing, setIsClosing] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  const notificationWidth = 320;

  const startTimer = React.useCallback(() => {
    if (isClosing) return;
    const idInt = setInterval(() => {
      setBarWidth((prev) => {
        if (prev < notificationWidth) return prev + 1;

        clearInterval(idInt);
        return prev;
      });
    }, 65);
  }, [isClosing]);

  const closeNotification = React.useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      // @ts-ignore
      dispatch({
        type: "remove_notification",
        id,
      });
    }, 400);
  }, [dispatch, id]);

  useEffect(() => {
    if (isClosing) return;
    if (barWidth === notificationWidth) closeNotification();
  }, [barWidth, isClosing, closeNotification]);

  useEffect(() => startTimer(), [startTimer]);

  return (
    <NotificationStyled
      data-testid={"test-notification-id"}
      id={id}
      isClosing={isClosing}
      type={type}
      position={position}
    >
      <div className="flex items-center justify-center">
        {success ? (
          <CheckCircle strokeWidth={1.5} size="35" color={"rgb(38,162,91)"} />
        ) : (
          <AlertCircle size="35" strokeWidth={1.5} color={"red"} />
        )}
      </div>
      <div className="gpa-2 ml-4 flex max-w-[200px] flex-col break-words text-white">
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold">{title}</span>
          <UilTimes className="h-5 w-5 text-white font-semibold hover:cursor-pointer" onClick={closeNotification}/>
        </div>
        <span className="text-[13px] text-gray-400">
          {message}
        </span>
      </div>
      <BarStyled
        style={{ width: barWidth }}
        colour={success ? "rgb(23,104,219)" : "red"}
      />
    </NotificationStyled>
  );
};

export default Notification;
