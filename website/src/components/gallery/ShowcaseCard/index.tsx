/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import styleCSS from "./styles.module.css";
import { type User } from "../../../data/tags";
import {
  Card,
  CardFooter,
  Caption1Strong,
  Image,
} from "@fluentui/react-components";
import { useBoolean } from "@fluentui/react-hooks";
import {
  Panel,
  PanelType,
  ThemeProvider,
} from "@fluentui/react";
import ShowcaseCardPanel from "../ShowcaseCardPanel/index";
import ShowcaseCardTag from "../ShowcaseTag/index";
import ShowcaseCardIcon from "../ShowcaseIcon/index";
import { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

type GitHubRepoInfo = {
  forks: number;
  stars: number;
  updatedOn: Date;
} | null;

function ShowcaseCard({
  user,
  coverPage,
}: {
  user: User;
  coverPage: Boolean;
}): JSX.Element {
  const tags = user.tags;
  const title = user.title;

  // Adobe Analytics Content
  const contentForAdobeAnalytics = `{\"id\":\"${title}\",\"cN\":\"Templates\"}`;

  // Panel
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const initialGitHubData: GitHubRepoInfo = null;
  const [githubData, setGithubData] = useState(initialGitHubData);

  useEffect(() => {
    const repoSlug = user.source
      .toLowerCase()
      .replace("https://github.com/", "");
    const slugParts = repoSlug.split("/");
    const owner = slugParts[0];
    const repo = slugParts[1];
    fetch(`https://cacheddkci2rpqggas.blob.core.windows.net/${owner}/${repo}`)
      .then((response) => response.json())
      .then((data: { forks: number; stars: number; updatedOn: Date }) => {
        setGithubData({
          forks: data.forks,
          stars: data.stars,
          updatedOn: data.updatedOn,
        });
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Card
      key={title}
      className={styleCSS.card}
      appearance="filled"
      onClick={openPanel}
      data-m={contentForAdobeAnalytics}
    >
      <div>
        <ThemeProvider>
          <Panel
            isLightDismiss
            isOpen={isOpen}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close"
            type={PanelType.medium}
          >
            <ShowcaseCardPanel user={user} githubData={githubData} />
          </Panel>
        </ThemeProvider>
        {coverPage ?
          <>
            <div className={styleCSS.cardTitleCoverPage}>{title}</div>
            <div className={styleCSS.cardDescriptionCoverPage}>{user.description}</div>
          </> :
          <>
            <div className={styleCSS.cardTitle}>{title}</div>
            <div className={styleCSS.cardDescription}>{user.description}</div>
          </>
        }
        <div className={styleCSS.cardTags}>
          <ShowcaseCardTag key={title} tags={tags} cardPanel={false} />
        </div>
      </div>
      <CardFooter>
        <div className={styleCSS.cardFooterTag}>
          <ShowcaseCardIcon key={title} tags={tags} />
        </div>
        <GitHubInfo githubData={githubData} />
      </CardFooter>
    </Card>
  );
}

const GitHubInfo = ({ githubData }) => {
  const formatNumber = (number: number): string => {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  };
  if (!githubData) return githubData;

  return (
    <div className={styleCSS.gitHubData}>
      {formatNumber(githubData.forks) == "NaN" ? null : (
        <>
          <Image
            alt="fork"
            src={useBaseUrl("/img/fork.svg")}
            height={16}
            width={16}
          />
          <Caption1Strong className={styleCSS.forkNumber}>
            {formatNumber(githubData.forks)}
          </Caption1Strong>
        </>
      )}
      {formatNumber(githubData.stars) == "NaN" ? null : (
        <>
          <Image
            alt="star"
            src={useBaseUrl("/img/star.svg")}
            height={16}
            width={16}
          />
          <Caption1Strong className={styleCSS.starNumber}>
            {formatNumber(githubData.stars)}
          </Caption1Strong>
        </>
      )}
    </div>
  );
};

export default React.memo(ShowcaseCard);
