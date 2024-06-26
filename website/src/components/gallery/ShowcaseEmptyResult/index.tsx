/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import { InputValue } from "../../../pages/ShowcaseCardPage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Text, Image } from "@fluentui/react-components";
import styles from "./styles.module.css";

export default function ShowcaseEmptyResult({ id }: { id: string }) {
  return (
    <div
      id={id}
      className={styles.emptyResultSection}
    >
        {InputValue != null ? (
          <>
            <Image
              src={useBaseUrl("/img/searchQuestionmark.svg")}
              alt="searchQuestionmark"
              height={128}
              width={128}
            />
            <Text size={500} weight="bold" align="center">
              We couldn’t find any results for '{InputValue}'
            </Text>
            <Text size={400} align="center">
              Check for spelling or try searching for another term.
            </Text>
          </>
        ) : (
          <>
            <Text size={500} weight="bold" align="center">
              We couldn’t find any results.
            </Text>
            <Text size={400} align="center">
              Check for tags or try filtering for another tag.
            </Text>
          </>
        )}
    </div>
  );
}
