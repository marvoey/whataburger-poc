/**
 * Optimizely OAuth 2.0 Token Management
 * Handles authentication and automatic token refresh
 */

const TOKEN_ENDPOINT = 'https://api.cms.optimizely.com/oauth/token';
const TOKEN_EXPIRY_BUFFER = 30;

export class OptiAuth {
  constructor(config) {
    if (!config.clientId || !config.clientSecret) {
      throw new Error('clientId and clientSecret are required');
    }

    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.actAs = config.actAs;
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  async requestToken() {
    const body = {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret
    };

    if (this.actAs) {
      body.act_as = this.actAs;
    }

    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Token request failed: ${response.status} ${response.statusText}. ${
            errorData.error_description || errorData.error || ''
          }`
        );
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in - TOKEN_EXPIRY_BUFFER) * 1000;

      return this.accessToken;
    } catch (error) {
      throw new Error(`Failed to obtain access token: ${error.message}`);
    }
  }

  isTokenExpired() {
    return !this.accessToken || !this.tokenExpiresAt || Date.now() >= this.tokenExpiresAt;
  }

  async getAccessToken() {
    if (this.isTokenExpired()) {
      await this.requestToken();
    }
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  setActAs(email) {
    this.actAs = email;
    this.clearToken();
  }
}
