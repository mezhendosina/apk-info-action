import { getInput, setOutput, setFailed } from '@actions/core';
import ApkParser from 'app-info-parser';


const NODE_ENV = process.env['NODE_ENV'];

let input;
if (NODE_ENV != 'local') {
  input = {
    apkPath: getInput('apk-path', { required: true }),
  };
} else {
  input = {
    apkPath: './app-debug.apk',
  };
}

async function run(input) {
  const parser = new ApkParser(input.apkPath);
  const result = await parser.parse();

  setOutput("version-code", result.versionCode);
  setOutput("version-name", result.versionName);
}

run(input)
  .then(result => {
    setOutput('result', 'success');
  })
  .catch(error => {
    setOutput('result', 'failure');
    setFailed(error.message);
  });
