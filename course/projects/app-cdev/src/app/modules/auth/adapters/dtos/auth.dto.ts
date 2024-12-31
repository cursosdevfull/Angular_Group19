export type ResultTokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ResultLoginResponse = {
  response: ResultTokensResponse;
};

export type ResultRegisterDataResponse = {
  tokens: ResultTokensResponse;
  secret: string;
  qrCode: string;
};

export type ResultRegisterResponse = {
  response: ResultRegisterDataResponse;
};

export type AuthResponse<T> = {
  provider: string;
  status: string;
  statusCodeId: string;
  statusCode: number;
  result: T;
};

export class AuthDto {
  static fromDataToInfoRegister(
    data: AuthResponse<ResultRegisterResponse>
  ): ResultRegisterDataResponse {
    return {
      tokens: {
        accessToken: data.result.response.tokens.accessToken,
        refreshToken: data.result.response.tokens.refreshToken,
      },
      secret: data.result.response.secret,
      qrCode: data.result.response.qrCode,
    };
  }

  static fromDataToTokens(
    data: AuthResponse<ResultLoginResponse>
  ): ResultTokensResponse {
    return {
      accessToken: data.result.response.accessToken,
      refreshToken: data.result.response.refreshToken,
    };
  }
}
