"use client";
import {Link} from "@/core/components/NextMuiLink";
import {Breadcrumbs as MuiBreadcrumbs, Typography} from "@mui/material";
import {FC, useMemo} from "react";

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

const breadcrumpsLabels: Record<string, string> = {
  "admin": "Админка",
  "analytics": "Аналитика",
  "users": "Пользователи",
  "blog": "Блог",
  "articles": "Статьи",
  "server": "Сервер",
  "servers": "Серверы",
  "assort": "Ассортимент",
  "orders": "Заказы",
  "proxies": "Прокси",
  "products": "Товары",
  "payments": "Оплаты",
  "sessions": "Сессии",
  "coupons": "Купоны",
  "settings": "Настройки",
  "integration": "Интеграция",
  "transactions": "Транзакции",
  "main": "Общая информация",
  "content": "Контент",
  "tariffs": "Тарифы",
  "devices": "Устройства",
  "payment_methods": "Платёжные методы",
  "new-user": "Новый пользователь",
  "new-order": "Новый заказ",
  "new-assort": "Новая страница ассортимента",
  "new-coupon": "Новый купон",
  "new-server": "Новый сервер",
  "new-device": "Новое устройство",
  "new": "Новый элемент",
  "attributes": "Аттрибуты",
  "locations": "Локации",
}

type BreadcrumbsProps = {
  labels: Record<string, string>
};
const Breadcrumbs: FC<BreadcrumbsProps> = ({labels, ...props}) => {
  const map = useMemo(() => ({...breadcrumpsLabels, ...labels}), [labels])
  return (
    <NextBreadcrumb
      capitalizeLinks
      excludeLabels={["detail"]}
      transformLabel={(title) => map[title] || title}
      {...props}
    />
  );
};

export default Breadcrumbs;
