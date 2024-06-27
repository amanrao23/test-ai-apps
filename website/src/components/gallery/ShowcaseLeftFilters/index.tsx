/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import ShowcaseTagSelect from "../ShowcaseTagSelect";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
} from "@fluentui/react-components";
import { Tags, type TagType, openai, meta } from "../../../data/tags";
import { TagList } from "../../../data/users";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

function ShowcaseFilterViewAll({
  tags,
  number,
  activeTags,
}: {
  tags: TagType[];
  number: string;
  activeTags: TagType[];
}) {
  const [openItems, setOpenItems] = React.useState(["0"]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };
  const { colorMode } = useColorMode();
  const chevronDownSmall =
    colorMode != "dark" ? (
      <img src={useBaseUrl("/img/smallChevron.svg")} />
    ) : (
      <img src={useBaseUrl("/img/smallChevronDark.svg")} />
    );
  const chevronUpSmall =
    colorMode != "dark" ? (
      <img
        style={{ transform: "rotate(180deg)" }}
        src={useBaseUrl("/img/smallChevron.svg")}
      />
    ) : (
      <img
        style={{ transform: "rotate(180deg)" }}
        src={useBaseUrl("/img/smallChevronDark.svg")}
      />
    );
  let value = number + "2";
  return (
    <>
      {tags.slice(0, 6).map((tag, index) => {
        const tagObject = Tags[tag];
        const key = `showcase_checkbox_key_${tag}`;
        const id = `showcase_checkbox_id_${tag}`;

        return index == tags.length - 1 ? (
          <div
            key={key}
            className={styles.checkboxListItem}
            style={{ marginBottom: "7px" }}
          >
            <ShowcaseTagSelect id={id} tag={tag} label={tagObject.label} activeTags={activeTags} />
          </div>
        ) : (
          <div key={key} className={styles.checkboxListItem}>
            <ShowcaseTagSelect id={id} tag={tag} label={tagObject.label} activeTags={activeTags} />
          </div>
        );
      })}
      {tags.length > 5 ? (
        <Accordion
          openItems={openItems}
          onToggle={handleToggle}
          multiple
          collapsible
        >
          <AccordionItem value={value} style={{ padding: "0px" }}>
            <AccordionPanel style={{ margin: "0px" }}>
              {tags.slice(6, tags.length).map((tag) => {
                const tagObject = Tags[tag];
                const id = `showcase_checkbox_id_${tag}`;
                const key = `showcase_checkbox_key_${tag}`;

                return (
                  <div key={key} className={styles.checkboxListItem}>
                    <ShowcaseTagSelect id={id} tag={tag} label={tagObject.label} activeTags={activeTags} />
                  </div>
                );
              })}
            </AccordionPanel>
            <AccordionHeader
              inline={true}
              expandIconPosition="end"
              expandIcon={
                openItems.includes(value) ? chevronUpSmall : chevronDownSmall
              }
            >
              <div
                style={{
                  fontSize: "12px",
                }}
                className={styles.color}
              >
                View All
              </div>
            </AccordionHeader>
          </AccordionItem>
        </Accordion>
      ) : null}
    </>
  );
}

export default function ShowcaseLeftFilters({
  activeTags,
}: {
  activeTags: TagType[];
}) {
  const sortTagList = TagList.sort();
  const languageTag = sortTagList.filter((tag) => {
    const tagObject = Tags[tag];
    return tagObject.type === "Language";
  });
  const modelOpenAITag = sortTagList.filter((tag) => {
    const tagObject = Tags[tag];
    return tagObject.type === "Model" && tagObject.subType === openai;
  });
  const modelMetaTag = sortTagList.filter((tag) => {
    const tagObject = Tags[tag];
    return tagObject.type === "Model" && tagObject.subType === meta;
  });
  const taskTag = sortTagList.filter((tag) => {
    const tagObject = Tags[tag];
    return tagObject.type === "Task";
  });
  const [openItems, setOpenItems] = React.useState([
    "1",
    "2",
    "3"
  ]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };

  return (
    <Accordion
      openItems={openItems}
      onToggle={handleToggle}
      multiple
      collapsible
    >
      <div className={styles.filterby}>Filter by</div>
      <AccordionItem value="1">
        <AccordionHeader expandIconPosition="end" className={styles.tagCatalogBackground}>
          <div className={styles.tagCatalog} data-m='{\"id\":\"Language\",\"cN\":\"Tags Category\"}'>Language</div>
        </AccordionHeader>
        <AccordionPanel>
          <ShowcaseFilterViewAll tags={languageTag} number={"1"} activeTags={activeTags} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionHeader expandIconPosition="end" className={styles.tagCatalogBackground}>
          <div className={styles.tagCatalog} data-m='{\"id\":\"Model\",\"cN\":\"Tags Category\"}'>Model</div>
        </AccordionHeader>
        <AccordionPanel>
          <div className={styles.tagSubCatalog} data-m='{\"id\":\"OpenAI\",\"cN\":\"Tags Sub Category\"}'>OpenAI</div>
          <ShowcaseFilterViewAll tags={modelOpenAITag} number={"21"} activeTags={activeTags} />
        </AccordionPanel>
        <AccordionPanel>
          <div className={styles.tagSubCatalog} data-m='{\"id\":\"Meta\",\"cN\":\"Tags Sub Category\"}'>Meta</div>
          <ShowcaseFilterViewAll tags={modelMetaTag} number={"22"} activeTags={activeTags} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionHeader expandIconPosition="end" className={styles.tagCatalogBackground}>
          <div className={styles.tagCatalog} data-m='{\"id\":\"Task\",\"cN\":\"Tags Category\"}'>Task</div>
        </AccordionHeader>
        <AccordionPanel>
          <ShowcaseFilterViewAll tags={taskTag} number={"3"} activeTags={activeTags} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
