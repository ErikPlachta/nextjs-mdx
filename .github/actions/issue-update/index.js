const core = require("@actions/core");
const github = require("@actions/github");

class IssueUpdateAction {
  constructor() {
    this.token = core.getInput("github-token");
    this.issueNumber = core.getInput("issue-number");
    this.config = JSON.parse(core.getInput("config") || "{}");
    this.octokit = github.getOctokit(this.token);
    this.context = github.context;
  }

  async execute() {
    if (!this.issueNumber) {
      core.setFailed("Issue number is required but was not provided.");
      return;
    }

    try {
      const issueDetails = await this.getIssueDetails();
      if (this.isIssueNew(issueDetails)) {
        if (this.config.updateTitle && this.config.titleConventionalCommit) {
          await this.updateTitleConventionalCommit(issueDetails);
        }
        if (this.config.tagsInBody) {
          await this.addTagsFromIssueBody(issueDetails.body);
        }
      } else {
        console.log("Issue is not considered new. Skipping updates.");
      }
    } catch (error) {
      core.setFailed(`Action failed with error: ${error}`);
    }
  }

  async getIssueDetails() {
    const { owner, repo } = this.context.repo;
    const issue_number = parseInt(this.issueNumber, 10);
    const { data: issue } = await this.octokit.rest.issues.get({
      owner,
      repo,
      issue_number,
    });
    return issue;
  }

  isIssueNew(issueDetails) {
    const creationTime = new Date(issueDetails.created_at).getTime();
    const now = Date.now();
    return (
      now - creationTime < (this.config.minutesStillConsideredNew || 5) * 60000
    );
  }

  async updateTitleConventionalCommit(issueDetails) {
    const { owner, repo } = this.context.repo;
    const issue_number = parseInt(this.issueNumber, 10);
    let newTitle = issueDetails.title;

    // Extract type and scope if configured to do so
    const type = this.config.typeInBody
      ? this.extractContent(issueDetails.body, "Type")
      : "";
    const scope = this.config.scopeInBody
      ? this.extractContent(issueDetails.body, "Scope")
      : "";
    const description = this.config.titleAsDescription
      ? newTitle
      : this.extractContent(issueDetails.body, "Description");

    if (type || scope || description) {
      newTitle = `${type}${scope ? `(${scope})` : ""}: ${description}`;
      await this.octokit.rest.issues.update({
        owner,
        repo,
        issue_number,
        title: newTitle,
      });
      console.log(`Issue title updated to "${newTitle}"`);
    }
  }

  async addTagsFromIssueBody(issueBody) {
    const labelsContent = this.extractContent(issueBody, "Labels"); // Ensure this matches your issue body's header
    if (labelsContent) {
      const labels = labelsContent.split(",").map((tag) => tag.trim());
      console.log(`Extracted labels: ${labels.join(", ")}`); // Debugging log
      if (labels.length > 0) {
        const { owner, repo } = this.context.repo;
        const issue_number = parseInt(this.issueNumber, 10);
        try {
          await this.octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number,
            labels,
          });
          console.log(`Labels "${labels.join(", ")}" added to the issue.`);
        } catch (error) {
          console.error(`Failed to add labels: ${error.message}`);
        }
      }
    } else {
      console.log("No labels extracted from the issue body.");
    }
  }

  extractContent(issueBody, header) {
    const regex = new RegExp(`###\\s*${header}\\s*\\n+([^#]+)`, "i"); // Adjusted regex for flexibility
    const match = issueBody.match(regex);
    return match ? match[1].trim() : "";
  }
}

const action = new IssueUpdateAction();
action.execute();
