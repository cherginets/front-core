"use client";

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Group,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {CSSObject, Theme, styled, useTheme} from "@mui/material/styles";
import {FC, Fragment, ReactNode, useMemo, useState} from "react";

import {Link} from "@/core/components/NextMuiLink";
import {usePathname} from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
  zIndex: `var(--core-mui-header, 1101)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: `var(--core-mui-drawer, 1100)`,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
}));

const StyledLink = styled(Link)(({theme}) => ({
  "&, &:hover, &:active": {
    textDecoration: "none",
  },
  color: "inherit",
}));

export type MuiLayoutLinkTypeBase = {
  id: string; // Если не указать за id возьмём title
  title: string;
  IconComponent: typeof Group | any;
  redCounter?: ReactNode;
};

export type MuiLayoutLinkTypeBaseWithUrl = MuiLayoutLinkTypeBase & {
  url: string;
  onClick?: never;
};
export type MuiLayoutLinkTypeBaseWithOnClick = MuiLayoutLinkTypeBase & {
  url?: never;
  onClick: (link: MuiLayoutLinkType) => any;
};

export type MuiLayoutLinkType = MuiLayoutLinkTypeBaseWithUrl | MuiLayoutLinkTypeBaseWithOnClick;

export const MuiLayout: FC<{
  left: string[];
  top: string[];
  links: MuiLayoutLinkType[];
  topRightElements?: any;
  topLeftElements?: any;
  children?: any;
}> = ({left = [], top = [], links, topLeftElements, topRightElements, children}) => {
  const pathname = usePathname() || "";
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const linksMap = useMemo<Map<string, MuiLayoutLinkType>>(
    () => new Map(links.map((l) => [l.id || l.title, l])),
    [links]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const title = useMemo(() => {
    const titleElement =
      // Поиск точного совпадения
      links.find((link) => !!link.url && pathname?.replaceAll("/", "") === (link.url || "").replaceAll("/", "")) ||
      // Поиск по наибольшему совпадению
      (() => {
        const weights = links.map((link) => (!link.url ? 0 : pathname?.indexOf(link.url) > -1 ? link.url.length : 0));
        const maxIndex = weights.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);

        return links[maxIndex];
      })() ||
      // Поиск по началу строки
      links.find((link) => !!link.url && pathname.startsWith(link.url));

    return titleElement?.title || "";
  }, [links, pathname]);

  return (
    <Box sx={{display: "flex", flexGrow: 1}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && {display: "none"}),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <div style={{margin: "auto"}} />
          {topLeftElements}
          {top.length > 0 && (
            <Stack direction={"row"} spacing={2} sx={{marginRight: 4}}>
              {top.map((id, index) => {
                const link = linksMap.get(id);
                if (!link) return null;

                const {title, url, onClick, IconComponent} = link;

                const Wrapper = url
                  ? ({children}: {children: ReactNode}) => <StyledLink href={url}>{children}</StyledLink>
                  : ({children}: {children: ReactNode}) => <Fragment>{children}</Fragment>;

                const Icon =
                  link.redCounter !== undefined
                    ? () => (
                        <Badge badgeContent={link.redCounter} color="error">
                          <IconComponent />
                        </Badge>
                      )
                    : IconComponent;

                return (
                  <Wrapper key={id}>
                    <Tooltip title={title}>
                      <IconButton color={"inherit"}>
                        <Icon color={"inherit"} />
                      </IconButton>
                    </Tooltip>
                  </Wrapper>
                );
              })}
            </Stack>
          )}
          {topRightElements}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {left.map((item, index) => {
            if (item === "divider") return <Divider key={index} />;

            const link = linksMap.get(item);

            if (!link) return null;

            const {title, url, onClick, IconComponent, redCounter} = link;

            const Wrapper = url
              ? ({children}: {children: ReactNode}) => <StyledLink href={url}>{children}</StyledLink>
              : ({children}: {children: ReactNode}) => <Fragment>{children}</Fragment>;

            return (
              <Wrapper key={index}>
                <ListItem
                  disablePadding
                  sx={{display: "block"}}
                  onClick={() => {
                    if (!!onClick) {
                      onClick(link);
                    }
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <Tooltip title={title}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Badge badgeContent={redCounter} color={"error"}>
                          {" "}
                          <IconComponent />
                        </Badge>
                      </ListItemIcon>
                    </Tooltip>

                    <ListItemText primary={title} sx={{opacity: open ? 1 : 0}} />
                  </ListItemButton>
                </ListItem>
              </Wrapper>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3, paddingBottom: 15,}}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
