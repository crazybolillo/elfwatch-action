const fs = require('fs')
const path = require('path')

const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const exec = require('@actions/exec')

const tool = 'felf-cli-amd64'
const binaryURL = `https://github.com/zoftko/felf-cli/releases/download/v0.0.2/${tool}`

async function run () {
  const file = core.getInput('file')
  const token = core.getInput('token')
  const server = core.getInput('server')

  let args
  if (token.length === 0) {
    core.info('No token has been provided. Will perform a dry run')
    args = ['--dry-run', file]
  } else {
    args = [file]
  }

  core.info(`Downloading felf-cli from ${binaryURL}`)
  const destPath = path.join(process.env.HOME, tool)
  const felfCli = await tc.downloadTool(binaryURL, destPath)

  fs.chmodSync(felfCli, fs.constants.S_IRUSR | fs.constants.S_IXUSR)
  const options = {
    env: {
      ...process.env,
      FELF_TOKEN: token,
      FELF_URL: server
    }
  }
  await exec.exec(felfCli, args, options)
}

try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
