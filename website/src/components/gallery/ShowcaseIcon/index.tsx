/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import styles from "./styles.module.css";
import { Tag, Tags, type User, type TagType } from "../../../data/tags";
import { TagList } from "../../../data/users";
import { sortBy } from "@site/src/utils/jsUtils";
import { Badge, Tooltip, Image, Button } from "@fluentui/react-components";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function ShowcaseCardIcon({ tags }: { tags: TagType[] }) {
  const tagObjects = tags
    .filter((tagObject) => tagObject != "featured")
    .map((tag) => ({ tag, ...Tags[tag] }));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag)
  );
  // TODO Modify once filter tags are up to date
  const checkAzureTag = tagObjectsSorted.filter((tag) =>
    tag.label.includes("Azure")
  );
  const length = checkAzureTag.length;
  let number = 3;
  const rest = length - number;

  const cardPanelDetailList = checkAzureTag
    .slice(number, length)
    .map((tagObject) => tagObject.label)
    .join("\n");

  if (length > number && rest > 1) {
    return (
      <>
        {checkAzureTag.slice(0, number).map((tagObject) => {
          const key = `showcase_card_icon_${tagObject.tag}`;
          return (
            <Tooltip
              withArrow
              content={tagObject.label}
              relationship="label"
              {...tagObject}
              key={key}
            >
              <Button
                icon={
                  <Image
                    alt={tagObject.label}
                    src={useBaseUrl(tagObject.icon)}
                    height={16}
                    width={16}
                  />
                }
              />
            </Tooltip>
          );
        })}
        <Tooltip
          withArrow
          content={{
            children: (
              <span style={{ whiteSpace: "pre-line" }}>
                {cardPanelDetailList}
              </span>
            ),
          }}
          relationship="label"
          key={`showcase_card_icon_more`}
        >
          <Button className={styles.toolTip}>+{rest}</Button>
        </Tooltip>
      </>
    );
  } else {
    return (
      <>
        {checkAzureTag.map((tagObject) => {
          const key = `showcase_card_icon_${tagObject.tag}`;
          return (
            <Tooltip
              withArrow
              content={tagObject.label}
              relationship="label"
              {...tagObject}
              key={key}
            >
              <Button
                icon={
                  <Image
                    alt={tagObject.label}
                    src={useBaseUrl(tagObject.icon)}
                    height={16}
                    width={16}
                  />
                }
              />
            </Tooltip>
          );
        })}
      </>
    );
  }
}
