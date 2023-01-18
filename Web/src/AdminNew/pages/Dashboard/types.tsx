import React from "react";

export interface CrumbTypes {
  title: string;
  url: string;
  isActive: boolean;
}

export interface StatisticTypes {
  countText: string;
  count: number;
  url: string;
  icon: React.ReactNode | JSX.Element;
}
