import {FC} from "react";
import classes from "./Breadcrumbs.module.scss";
import OriginalBreadcrumbs, {BreadcrumbsProps as OriginalBreadcrumbsProps} from "./OriginalBreadcrumbs";

export type BreadcrumbsProps = {} & OriginalBreadcrumbsProps;
const Breadcrumbs: FC<BreadcrumbsProps> = ({transformLabel = (l) => l, ...props}) => {
  return (
    <OriginalBreadcrumbs
      containerClassName={classes.container}
      activeItemClassName={classes.activeItem}
      listClassName={classes.list}
      inactiveItemClassName={classes.inactiveItem}
      rootLabel={"Сайт"}
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
          case "new-user":
            return "Новый пользователь";
          case "new-order":
            return "Новый заказ";
          case "new-assort":
            return "Новая страница ассортимента";
          case "new-coupon":
            return "Новый купон";
          case "new":
            return "Новый элемент";
          default:
            return transformLabel(title);
        }
      }}
      {...props}
    />
  );
};

export default Breadcrumbs;
