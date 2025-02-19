export type ElementHistorySearchRequest = {
  element_type: string;
  element_id: string;
};

export type ElementHistorySearchResponse = {
  rows: HistoryRow[];
};

export type ElementHistoryAddRequest = {
  element_type: string;
  element_id: string;
  text: string;
};

export type ElementHistoryAddResponse = any;

export type HistoryLevel = "debug" | "info" | "warning" | "error";

export type HistoryRow = {
  id: number;
  element_type: string;
  element_id: string;
  level: HistoryLevel;
  who_id?: number;
  who_name?: string;
  who_link?: string;
  text: string;
  context?: any | null;
  created_at: string;
};
