const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class LogAction {
  constructor() {
    this.data = this.parseJsonString(core.getInput("data"));
    this.localOutputPath = core.getInput("localOutputPath");
    this.crudOptions = core.getInput("crudOptions").toLowerCase();
    this.logFormat = core.getInput("logFormat").toUpperCase();
    this.branchName = `log-${Date.now()}`; // Unique branch name
  }

  printParams() {
    console.log("data:", this.data);
    console.log("localOutputPath:", this.localOutputPath);
    console.log("crudOptions:", this.crudOptions);
    console.log("logFormat:", this.logFormat);
    console.log("branchName:", this.branchName);
  }

  execute() {
    try {
      this.printParams();

      this.createDirectoryIfNeeded();
      const formattedData = this.formatData();
      console.log("Formatted data:", formattedData);

      this.writeDataToFile(formattedData);
      this.performGitOperations();
      this.createPullRequest();
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  createDirectoryIfNeeded() {
    const dir = path.dirname(this.localOutputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory ${dir} created.`);
    } else {
      console.log(`Directory ${dir} already exists.`);
    }
  }

  formatData() {
    switch (this.logFormat) {
      case "JSON":
        return JSON.stringify(this.data, null, 2);
      case "MD":
        return this.JSONtoMarkdown(this.data);
      default:
        throw new Error(`[formatData] Unsupported format: ${this.logFormat}`);
    }
  }

  writeDataToFile(formattedData) {
    console.log(
      `Writing data to ${this.localOutputPath} with option ${this.crudOptions}`
    );
    try {
      if (this.crudOptions === "create" || this.crudOptions === "replace") {
        fs.writeFileSync(this.localOutputPath, formattedData);
      } else if (this.crudOptions === "append") {
        fs.appendFileSync(this.localOutputPath, formattedData);
      }
      console.log("Data written successfully.");
    } catch (e) {
      console.error(`Failed to write data: ${e.message}`);
      throw e; // Rethrow to catch in the main try/catch block.
    }
  }

  performGitOperations() {
    execSync("git checkout -b " + this.branchName);
    execSync("git add .");
    execSync(
      'git commit -m "Log action data" -a || echo "No changes to commit"'
    );
    execSync("git push --set-upstream origin " + this.branchName);
  }

  createPullRequest() {
    const prTitle = "chore(action/log): update log";
    const prBody =
      "action/log was executed, and a log file has been updated and/or created.";
    execSync(
      `gh pr create --title "${prTitle}" --body "${prBody}" --base develop --head ${this.branchName}`
    );
  }

  parseJsonString(jsonString) {
    try {
      // check if already JSON
      if (typeof jsonString === "object") {
        return jsonString;
      }
      // if not, parse it
      return JSON.parse(jsonString);
    } catch (e) {
      throw new Error(`[parseJsonString] Invalid JSON: ${e.message}`);
    }
  }

  JSONtoMarkdown(json) {
    let markdown = "";
    if (typeof json !== "object") {
      throw new Error("Input must be an object");
    }

    const convert = (obj, depth = 0) => {
      for (let key in obj) {
        if (Array.isArray(obj[key])) {
          markdown += `${"  ".repeat(depth)}- ${key}\n`;
          convert(obj[key], depth + 1);
        } else if (typeof obj[key] === "object") {
          markdown += `${"  ".repeat(depth)}## ${key}\n`;
          convert(obj[key], depth + 1);
        } else {
          markdown += `${"  ".repeat(depth)}- **${key}**: ${obj[key]}\n`;
        }
      }
    };

    convert(json);
    return markdown;
  }
}

// Execute the action
const logAction = new LogAction();
logAction.execute();
