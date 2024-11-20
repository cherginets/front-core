import {Tab, TabProps} from "@mui/material";
import Tabs, {TabsProps} from "@mui/material/Tabs";
import CSS from "csstype";
import {useParams, useRouter} from "next/navigation";
import {FC, useCallback, useMemo, useState} from "react";

type TabType = {label: string; value: string} & Partial<TabProps>;

export type useTabsProps = {
  defaultTab: string;
  tabs: TabType[];
  routePrefix?: string;
  onChange?: (newTab: string) => void;
  tabsStyle?: CSS.Properties;
  currentTab?: string;
};

export type useTabsResult = {
  tab: string;
  renderedTabs: JSX.Element;
  TabsComponent: FC<TabsProps>;
};

export function useTabs({
  defaultTab,
  currentTab: _currentTab,
  tabs,
  routePrefix,
  onChange,
  tabsStyle = {},
}: useTabsProps): useTabsResult {
  const {push} = useRouter();
  const params = useParams();
  const currentTab = useMemo(() => _currentTab || params.tab, [params, _currentTab]);

  const [stateTab, setStateTab] = useState(defaultTab);

  let tab: string, setTab: (newTab: string) => void;

  // Если задан - значит управление через историю, если нет - без сохранения в урле (только стейт)
  if (routePrefix) {
    tab = (currentTab as string) || defaultTab;
    setTab = (newTab) => push(routePrefix + newTab);
  } else {
    tab = stateTab;
    setTab = setStateTab;
  }

  const renderedTabs = useMemo(
    () => (
      <Tabs
        variant={"scrollable"}
        value={tab}
        onChange={(e: any, newTab: any) => {
          setTab(newTab);
          if (onChange) onChange(newTab);
        }}
        indicatorColor={"secondary"}
        style={tabsStyle}
      >
        {tabs.map(({value, label, ...props}: TabType, i: number) => {
          return <Tab key={i} value={value} label={label} {...props} />;
        })}
      </Tabs>
    ),
    [tab, setTab, tabs, onChange, tabsStyle]
  );

  const TabsComponent = useCallback(
    (props: TabsProps) => (
      <Tabs
        variant={"scrollable"}
        value={tab}
        onChange={(e: any, newTab: any) => {
          setTab(newTab);
          if (onChange) onChange(newTab);
        }}
        style={{marginBottom: 16}}
        indicatorColor={"secondary"}
        {...props}
      >
        {tabs.map(({value, label, ...props}: TabType, i: number) => {
          console.log("props", props);
          return <Tab key={i} value={value} label={label} {...props} />;
        })}
      </Tabs>
    ),
    [tab, setTab, tabs, onChange]
  );

  return {
    tab,
    renderedTabs,
    TabsComponent,
  };
}
