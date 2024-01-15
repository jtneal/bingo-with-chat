export interface AuthResponse {
  client_id: string;
  expires_in: number;
  login: string;
  scopes: string[];
  user_id: string;
}

export interface IdToken {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  at_hash: string;
  nonce: string;
  preferred_username: string;
}
