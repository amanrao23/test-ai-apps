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
  | "typescript"
  | "dalle"
  | "gpt35turbo"
  | "gpt4turbo"
  | "gpt4"
  | "llama"
  | "llama2"
  | "agent"
  | "chat"
  | "search"
  | "llmops"
  | "summarization"
  | "azuredb-postgreSQL"
  | "mongodb"
  | "pinecone"
  | "azuresql"
  | "azurecosmosdb";

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
    icon: "./img/java.svg",
  },
  python: {
    label: "Python",
    description: "Template contains Python app code",
    type: "Language",
    icon: "./img/python.svg",
  },
  typescript: {
    label: "TypeScript",
    description: "Template contains TypeScript app code",
    type: "Language",
    icon: "./img/typescript.svg",
  },

  // Model Tags
  dalle: {
    label: "Dalle",
    description: "Template use OpenAI Dalle model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/dall-e",
  },
  gpt35turbo: {
    label: "GPT 3.5 Turbo",
    description: "Template use OpenAI GPT 3.5 Turbo model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/gpt-3-5-turbo",
  },
  gpt4turbo: {
    label: "GPT 4 Turbo",
    description: "Template use OpenAI GPT 4 Turbo model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4",
  },
  gpt4: {
    label: "GPT 4",
    description: "Template use OpenAI GPT 4 model",
    type: "Model",
    subType: openai,
    url: "https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4",
  },
  llama: {
    label: "Code Llama",
    description: "Template use Meta Code Llama model",
    type: "Model",
    subType: meta,
    url: "https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-code-llama",
  },
  llama2: {
    label: "Llama 2",
    description: "Template use Meta Llama 2 model",
    type: "Model",
    subType: meta,
    url: "https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-llama-2",
  },

  // Intelligent Solution Tags
  agent: {
    label: "Agent",
    description: "Template implements copilot that uses agent(s)",
    type: "Intelligent Solution",
  },
  chat: {
    label: "Interactive Chat",
    description: "Template implements interactive chat",
    type: "Intelligent Solution",
  },
  search: {
    label: "Guided Search",
    description: "Template implements guided search",
    type: "Intelligent Solution",
  },
  llmops: {
    label: "LLM Ops",
    description: "Template involves LLM Operations",
    type: "Intelligent Solution",
  },
  summarization: {
    label: "Summarization",
    description: "Template involves summarization and / or augmentation",
    type: "Intelligent Solution",
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
  azurecosmosdb: {
    label: "Azure CosmosDB",
    description: "Template architecture uses Azure CosmosDB",
    icon: "./img/Azure-Cosmos-DB.svg",
    url: "https://azure.microsoft.com/products/cosmos-db/",
    type: "Database",
  }
};
