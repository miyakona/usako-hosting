import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { sprintf } from 'sprintf-js'
import * as functions from 'firebase-functions'

export class SecretManager {
  private basePath: string
  private client: SecretManagerServiceClient

  constructor() {
    this.basePath = `projects/${
      functions.config().gcp.project_number
    }/secrets/%s/versions/%s`
    this.client = new SecretManagerServiceClient()
  }

  async getValue(
    targetKey: string,
    targetVersion: number | string = 'latest'
  ): Promise<string> {
    const [version] = await this.client.accessSecretVersion({
      name: sprintf(this.basePath, targetKey, targetVersion),
    })

    return version.payload?.data?.toString() ?? ''
  }
}
