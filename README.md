# ELF Watch GitHub Action
Analyze binaries and upload the results to [ELF Watch](https://github.com/apps/elf-watch) or any other
[felf](https://github.com/zoftko/felf) server.

## Usage:
To integrate your pipeline with ELF Watch, add this action as a step within your `workflow.yaml` file. In order
to push analysis results to ELF Watch, an access token will be required. **This access token should be kept secret
and stored as such.**

*Note: The action is only compatible with Linux runners at the moment.*

```yaml
steps:
  # Previous steps would check out your code and build the binary
  - uses: zoftko/elfwatch-action@main
    with:
      file: path/to/binary
      token: ${{ secrets.ELF_WATCH_TOKEN }}
```

## Arguments
The following arguments may be used to alter the action's behaviour. Some of them are required while
others are optional.

|  Name  | Description                                                                                                                                     | Required |
|:------:|-------------------------------------------------------------------------------------------------------------------------------------------------|:--------:|
|  file  | File to be analyzed.                                                                                                                            |   Yes    |
| token  | Access token. If not provided results won't be pushed to ELF Watch.                                                                             |    No    |
| server | Server where results will be pushed to. Defaults to ELF Watch but can be customized to another server, for example a self-hosted felf instance. |    No    |
