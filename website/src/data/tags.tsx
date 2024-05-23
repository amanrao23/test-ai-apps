/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export type Tag = {
  label: string;
  description: string;
  azureIcon?: string;
  darkModeAzureIcon?: string;
  url?: string;
  type?: string;
  subType?: string;
};

export type User = {
  title: string;
  description: string;
  preview: string;
  website: string;
  author: string;
  source: string | null;
  tags: TagType[];
};

// NN: Updated TagType to suit Static Web Apps
export type TagType =
  | "featured"
  | "javascript"
  | "dotnetCsharp"
  | "java"
  | "python"
  | "dalle"
  | "gpt35turbo"
  | "gpt4"
  | "llama"
  | "llama2"
  | "chat"
  | "search"
  | "speechtotext"

// LIST OF AVAILABLE TAGS
// Each tag in lit about must have a defined object here
// One or more tags can be associated per card
// Tag Metadata:
//   - label = short name seen in tag
//   - description = explainer for usage
//   - type = type of tag
//   - icon = svg path for icon
//   - url = url for azure service
export const Tags: { [type in TagType]: Tag } = {
  //============  FOR REGULAR USE

  // Special Tag
  featured: {
    label: "Featured Template",
    description: "This tag is used for featured templates.",
  },

  // Language Tags

  javascript: {
    label: "JavaScript",
    description: "Template contains JavaScript app code",
    type: "Language",
  },
  dotnetCsharp: {
    label: ".NET/C#",
    description: "Template contains .NET and/or C# app code",
    type: "Language",
  },
  java: {
    label: "Java",
    description: "Template contains Java app code",
    type: "Language",
  },
  python: {
    label: "Python",
    description: "Template contains Python app code",
    type: "Language",
  },
  dalle: {
    label: "Dalle",
    description: "Template use OpenAI Dalle model",
    type: "Model",
    subType: "OpenAI"
  },
  gpt35turbo: {
    label: "GPT 3.5 Turbo",
    description: "Template use OpenAI GPT 3.5 Turbo model",
    type: "Model",
    subType: "OpenAI"
  },
  gpt4: {
    label: "GPT 4 Turbo",
    description: "Template use OpenAI GPT 4 model",
    type: "Model",
    subType: "OpenAI"
  },
  llama: {
    label: "Llama",
    description: "Template use Meta Llama model",
    type: "Model",
    subType: "Meta"
  },
  llama2: {
    label: "Llama 2",
    description: "Template use Meta Llama 2 model",
    type: "Model",
    subType: "Meta"
  },
  chat: {
    label: "Chat",
    description: "Template about chat task",
    type: "Task"
  },
  search: {
    label: "Search",
    description: "Template about search task",
    type: "Task"
  },
  speechtotext: {
    label: "Speech to Text",
    description: "Template about speech to text task",
    type: "Task"
  }
};
