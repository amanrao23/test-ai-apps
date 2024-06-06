/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useState, useEffect } from "react";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useHistory, useLocation } from "@docusaurus/router";
import {
  Title1,
  Title3,
  Display,
} from "@fluentui/react-components";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { featuredUsers } from "../../../data/users";
import ShowcaseCards from "../../../pages/ShowcaseCards";

const title = "Build with AI";
const description =
  "Get started with AI application patterns. Edit and deploy using VS Code and GitHub Actions.";
const subtitle = "Featured AI templates";
export var InputValue: string | null = null;

export type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = "name";

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function FilterBar(): React.JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  InputValue = value;
  return (
    <>
      <SearchBox
        styles={{
          root: {
            border: "1px solid #D1D1D1",
            height: "52px",
            maxWidth: "740px",
            borderRadius: "4px",
          },
          icon: {
            fontSize: "24px",
            paddingLeft: "10px",
          },
          field: {
            paddingLeft: "20px",
            fontSize: "18px",
          },
        }}
        id="filterBar"
        value={readSearchName(location.search) != null ? value : ""}
        placeholder="Search for an azd template..."
        onClear={(e) => {
          setValue(null);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);

          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
        }}
        onChange={(e) => {
          if (!e) {
            return;
          }
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById("searchbar")?.focus();
          }, 0);
        }}
      />
    </>
  );
}

export default function ShowcaseCoverPage() {
  return (
    <div className={styles.coverPageContainer}>
      <img
        src={useBaseUrl("/img/coverBackground.png")}
        className={styles.cover}
        onError={({ currentTarget }) => {
          currentTarget.style.display = "none";
        }}
        alt=""
      />
      <div className={styles.coverPageArea}>
        <div className={styles.titleSection}>
          <Display>{title}</Display>
          <Title3>{description}</Title3>
        </div>
        <div className={styles.subtitleSection}>
          <Title1>{subtitle}</Title1>
          <ShowcaseCards filteredUsers={featuredUsers} coverPage={true} />
        </div>
      </div>
    </div>
  );
}
