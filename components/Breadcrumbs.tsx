"use client";
import {Link} from "@/core/components/NextMuiLink";
import {Breadcrumbs as MuiBreadcrumbs, Typography} from "@mui/material";
import {FC} from "react";

import {ReactNode} from "react";

import {usePathname} from "next/navigation";

type TBreadCrumbProps = {
  homeElement?: ReactNode;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  excludeLabels?: string[];
  transformLabel?: (label: string) => string;
};

const NextBreadcrumb = ({
  homeElement = "Главная",
  listClasses,
  activeClasses,
  transformLabel = (s) => s,
  excludeLabels = [],
  ...props
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths?.split("/").filter((path) => path) || [];

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" {...props}>
      <Link underline="hover" color="inherit" href={"/"} fontSize={"small"}>
        {homeElement}
      </Link>
      {pathNames.map((label, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
        if (excludeLabels.includes(label)) {
          return null;
        }
        if (index == pathNames.length - 1) {
          return (
            <Typography color="text.primary" fontSize={"small"} key={index}>
              {transformLabel(label)}
            </Typography>
          );
        }
        return (
          <Link href={href} key={index} fontSize={"small"}>
            {transformLabel(label)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

type BreadcrumbsProps = {};
const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  return (
    <NextBreadcrumb
      capitalizeLinks
      excludeLabels={["detail"]}
      transformLabel={(title) => {
        switch (title) {
          case "admin":
            return "Админка";
          case "analytics":
            return "Аналитика";
          case "users":
            return "Пользователи";
          case "blog":
            return "Блог";
          case "server":
            return "Сервер";
          case "servers":
            return "Серверы";
          case "assort":
            return "Ассортимент";
          case "orders":
            return "Заказы";
          case "proxies":
            return "Прокси";
          case "products":
            return "Товары";
          case "payments":
            return "Оплаты";
          case "sessions":
            return "Сессии";
          case "coupons":
            return "Купоны";
          case "settings":
            return "Настройки";
          case "integration":
            return "Интеграция";
          case "transactions":
            return "Транзакции";
          case "main":
            return "Общая информация";
          case "content":
            return "Контент";
          case "tariffs":
            return "Тарифы";
          case "devices":
            return "Устройства";

          case "new-user":
            return "Новый пользователь";
          case "new-order":
            return "Новый заказ";
          case "new-assort":
            return "Новая страница ассортимента";
          case "new-coupon":
            return "Новый купон";
          case "new-server":
            return "Новый сервер";
          case "new-device":
            return "Новое устройство";
          case "new":
            return "Новый элемент";

          case "attributes":
            return "Аттрибуты";
          case "locations":
            return "Локации";
          default:
            return title;
        }
      }}
      {...props}
    />
  );
};

export default Breadcrumbs;
