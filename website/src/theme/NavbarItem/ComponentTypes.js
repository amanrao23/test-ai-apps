/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ 

import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import React from "react";
import { Button, Image } from "@fluentui/react-components";
import useBaseUrl from "@docusaurus/useBaseUrl";
import style from "./styles.module.css";

const submitFeedbackButton = () => {
  return (
    <Button
      appearance="secondary"
      size="extra-large"
      iconPosition="before"
      shape="rounded"
      icon={
        <Image
          alt="feedback"
          src={useBaseUrl("/img/personFeedback.svg")}
          height={20}
          width={20}
        />
      }
      className={style.button}
      onClick={() => {
        window.open(
          "https://microsoft.qualtrics.com/jfe/form/SV_enBCM8eIU5PVvh4",
          "_blank"
        );
      }}
    >
      Submit Feedback
    </Button>
  );
};

export default {
  ...ComponentTypes,
  "custom-NavbarButton": submitFeedbackButton,
};
