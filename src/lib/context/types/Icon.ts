import { StyleConfig } from "context/types";

export interface Icon {
  [key: string]: string;
}

export type Icons = Icon[];

export interface IconConfig {
  icon: Icon;
  size?: string;
  color?: string;
  style?: StyleConfig;
}

export interface IconDefault {
  icons: Icons;
  size: string;
  color: string;
  style: StyleConfig;
}
