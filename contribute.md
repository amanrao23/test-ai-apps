This template gallery collection is curated and supported by Microsoft. We frequently collaborate with partners in this collection, making sure the template is a fit for the gallery theme. For template contributions that don't fit the criteria for this collection, we recommend the [awesome-azd template gallery](https://azure.github.io/awesome-azd/) where there is a wider range of community contributions.

Qualifications for this template gallery
---
1. Must be an application integrating AI as a solution or feature.
2. Must pass the validation workflow that triggers automatically when opening a pull-request to include a template (and stay current and in conformance with regular automated testing and issued standards as explained [here](https://github.com/Azure-Samples/azd-template-artifacts)).
3. Must be approved by the maintainers of this repo.

Submit a template 
---

1. Add an entry to [website/static/templates.json](https://github.com/Azure/ai-apps/blob/main/website/static/templates.json) that includes:
   * Template title - A short title that reflects the local application stack that someone could use to get their application on Azure (e.g. "Containerized chat app with Python and Azure OpenAI")
   * Description - 1-2 sentence description of the architecture (e.g. Azure services) or solution that is defined by the template.
   * Architecture Diagram or Application Screenshot - Used as display image for gallery card. The architecture should include all services and their connections (example). Please add the image to website/static/templates/images
   * Link to Author's GitHub or other relevant website for attribution.
   * Author's name to credit on the gallery card.
   * Link to template source GitHub repo.
   * One or more tags representing the template. Provide at least one tag for programming language used, at least one tag for AI model, and at least one tag for Azure services integrated. Also, tag the IaC provider (Bicep or Terraform). If you don't see a relevant tag for your template? Feel free to add one!
   * If the template is Microsoft-authored, we encourage you to also publish it to learn.microsoft.com/samples.
   * Open a pull request!
   * At that moment the validation workflow will run. Our friendly bot will open an issue in your repository, with a report. If you pass the validation, you're ready for manual approval and we will review your sample. If you have errors, follow the `How to fix` links that will help you trouble shoot and fix your issues.
   * If possible, add a link to the PR in your repo where you made your app azd compatible to the PR description. This will help us provide feedback on your template and speed up the review process.

Maintaining a template
---

1. After initial testing of the template when it's submitted to the template collection in this gallery, there will be automated and regular validation run against your repo. Please expect GitHub issues when validation failure.
2. If an issue is opened in your repo with testing failures, please fix the template in TODO: add time frame
3. If the issue isn't attended to, TODO: add all actions we will take 