/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export type Tag = {
  label: string;
  description: string;
  icon?: string;
  url?: string;
  type?: string;
  subType?: SubType;
};

export type User = {
  title: string;
  description: string;
  preview: string;
  website: string;
  author: string;
  source: string | null;
  tags: TagType[];
  video?: string;
};

type SubType = {
  label: string;
  icon: string;
};

export const openai: SubType = {
  label: "OpenAI",
  icon: "./img/openAI.svg",
};

export const meta: SubType = {
  label: "Meta",
  icon: "./img/meta.svg",
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
  | "functions"
  | "aca"
  | "monitor"
  | "keyvault"
  | "azuresql"
  | "azuredb-postgreSQL"
  | "mongodb"
  | "pinecone";

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
    icon: "./img/js.svg",
  },
  dotnetCsharp: {
    label: ".NET/C#",
    description: "Template contains .NET and/or C# app code",
    type: "Language",
    icon: "./img/csharp.svg",
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
    icon: "./img/python.svg",
  },

  // Model Tags
  dalle: {
    label: "Dalle",
    description: "Template use OpenAI Dalle model",
    type: "Model",
    subType: openai,
  },
  gpt35turbo: {
    label: "GPT 3.5 Turbo",
    description: "Template use OpenAI GPT 3.5 Turbo model",
    type: "Model",
    subType: openai,
  },
  gpt4: {
    label: "GPT 4 Turbo",
    description: "Template use OpenAI GPT 4 model",
    type: "Model",
    subType: openai,
  },
  llama: {
    label: "Llama",
    description: "Template use Meta Llama model",
    type: "Model",
    subType: meta,
  },
  llama2: {
    label: "Llama 2",
    description: "Template use Meta Llama 2 model",
    type: "Model",
    subType: meta,
  },

  // Task Tags
  chat: {
    label: "Chat",
    description: "Template about chat task",
    type: "Task",
  },
  search: {
    label: "Search",
    description: "Template about search task",
    type: "Task",
  },
  speechtotext: {
    label: "Speech to Text",
    description: "Template about speech to text task",
    type: "Task",
  },

  // Azure Tags
  functions: {
    label: "Azure Functions",
    description: "Template architecture uses Azure Functions",
    icon: "./img/Azure-Function.svg",
    url: "https://azure.microsoft.com/products/functions",
    type: "Azure",
  },
  aca: {
    label: "Azure Container Apps",
    description: "Template architecture uses Azure Container Apps",
    icon: "./img/Azure-Container-Apps.svg",
    url: "https://azure.microsoft.com/products/container-apps",
    type: "Azure",
  },
  monitor: {
    label: "Azure Monitor",
    description: "Template architecture uses Azure Monitor Service",
    icon: "./img/Azure-Monitor.svg",
    url: "https://azure.microsoft.com/products/monitor",
    type: "Azure",
  },
  keyvault: {
    label: "Azure Key Vault",
    description: "Template architecture uses Azure Key Vault",
    icon: "./img/Azure-Key-Vault.svg",
    url: "https://azure.microsoft.com/products/key-vault",
    type: "Azure",
  },

  // Database Tags
  "azuredb-postgreSQL": {
    label: "Azure PostgreSQL",
    description: "Template architecture uses Azure PostgreSQL Database",
    icon: "./img/Azure-PostgreSQL.svg",
    url: "https://azure.microsoft.com/products/postgresql",
    type: "Database",
  },
  mongodb: {
    label: "MongoDB",
    description: "Template architecture uses MongoDB Database",
    type: "Database",
  },
  pinecone: {
    label: "Pinecone",
    description: "Template architecture uses Pinecone Database",
    type: "Database",
  },
  azuresql: {
    label: "Azure SQL",
    description: "Template architecture uses Azure SQL Database",
    icon: "./img/Azure-SQL.svg",
    url: "https://azure.microsoft.com/products/azure-sql/database",
    type: "Database",
  },
};
