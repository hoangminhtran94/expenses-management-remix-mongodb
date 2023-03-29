import type { MetaFunction } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import Error from "./components/util/Error";
import styles from "./styles/shared.css";
import React, { ErrorInfo } from "react";

const Document = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "RemixExpenses-",
  viewport: "width=device-width,initial-scale=1",
});
export default function App() {
  return (
    <Document title="Expense App">
      <Outlet />
    </Document>
  );
}

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const ErrorBoundary = ({ error }: { error: TypeError }) => {
  return (
    <Document title="Error happened">
      <MainHeader />
      <Error title="Error Happened">
        <p>{error.message || "Please try again..."}</p>
      </Error>
    </Document>
  );
};

export const CatchBoundary = () => {
  const data = useCatch();
  return (
    <Document title={data.statusText}>
      <MainHeader />
      <Error title={data.statusText}>
        <p>Please try again...</p>
      </Error>
    </Document>
  );
};
