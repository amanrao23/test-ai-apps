/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import styleCSS from "./styles.module.css";
import { type User } from "../../../data/tags";
import {
  Card,
  makeStyles,
  CardFooter,
  Caption1Strong,
  Image,
  caption1StrongClassNames,
} from "@fluentui/react-components";
import { useBoolean } from "@fluentui/react-hooks";
import {
  IRenderFunction,
  Panel,
  PanelType,
  IPanelProps,
  ThemeProvider,
} from "@fluentui/react";
import ShowcaseCardPanel from "../ShowcaseCardPanel/index";
import ShowcaseCardTag from "../ShowcaseTag/index";
import ShowcaseCardIcon from "../ShowcaseIcon/index";
import { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

type GitHubRepoInfo = {
  forks: number
  stars: number
} | null;

function ShowcaseCard({ user }: { user: User }): JSX.Element {
  const tags = user.tags;
  const title = user.title;

  // Panel
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const initialGitHubData: GitHubRepoInfo = null;
  const [githubData, setGithubData] = useState(initialGitHubData);

  useEffect(() => {
    const repoSlug = user.source.toLowerCase().replace("https://github.com/", "");
    const slugParts = repoSlug.split("/");
    const owner = slugParts[0];
    const repo = slugParts[1];
    fetch(`https://cacheddkci2rpqggas.blob.core.windows.net/${owner}/${repo}`)
      .then((response) => response.json())
      .then((data: { forks: number, stars: number }) => {
        setGithubData({
          forks: data.forks,
          stars: data.stars
        })
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Card
      key={title}
      className={styleCSS.card}
      appearance="filled"
      onClick={openPanel}
    >
      <div>
        <ThemeProvider>
          <Panel
            headerText={title}
            isLightDismiss
            isOpen={isOpen}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close"
            type={PanelType.medium}
          >
            <ShowcaseCardPanel user={user} />
          </Panel>
        </ThemeProvider>
        <div className={styleCSS.cardTitle}>{title}</div>
        <div className={styleCSS.cardDescription}>{user.description}</div>
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

const GitHubInfo = ({githubData}) => {
  const formatNumber = (number: number): string => {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  };
  
  if (!githubData) return githubData;

  return <div className={styleCSS.gitHubData}>
    <Image
      alt="fork"
      src={useBaseUrl("/img/fork.svg")}
      height={16}
      width={16}
    />
    <Caption1Strong className={styleCSS.forkNumber}>
      {formatNumber(githubData.forks) || 0}
    </Caption1Strong>
    <Image
      alt="star"
      src={useBaseUrl("/img/star.svg")}
      height={16}
      width={16}
    />
    <Caption1Strong className={styleCSS.starNumber}>
      {formatNumber(githubData.stars) || 0}
    </Caption1Strong>{" "}
  </div>
}

export default React.memo(ShowcaseCard);
