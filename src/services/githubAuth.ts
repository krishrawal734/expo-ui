// src/services/githubAuth.ts

const GITHUB_CLIENT_ID = "Ov23li111tzL9JlMYC9P";

const GITHUB_DEVICE_CODE_URL =
  "https://github.com/login/device/code";

const GITHUB_ACCESS_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

const GITHUB_SCOPE = "read:user user:email";

/**
 * Start GitHub Device Flow.
 */
export const githubLogin = async () => {
  try {
    const response = await fetch(GITHUB_DEVICE_CODE_URL, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body:
        `client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}` +
        `&scope=${encodeURIComponent(GITHUB_SCOPE)}`,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error_description ||
          "Could not start GitHub login."
      );
    }

    if (!data?.device_code) {
      throw new Error(
        "GitHub did not return a device code."
      );
    }

    if (!data?.user_code) {
      throw new Error(
        "GitHub did not return a user code."
      );
    }

    if (!data?.verification_uri) {
      throw new Error(
        "GitHub did not return a verification URL."
      );
    }

    return {
      deviceCode: data.device_code,
      userCode: data.user_code,
      verificationUri: data.verification_uri,
      interval: Number(data.interval) || 5,
      expiresIn: Number(data.expires_in) || 900,
    };
  } catch (error: any) {
    console.log("GitHub Device Flow Error:", error);

    throw new Error(
      error?.message ||
        "Unable to start GitHub login."
    );
  }
};

/**
 * Poll GitHub until the user authorizes the device.
 *
 * Returns:
 * - GitHub access token
 *
 * Throws:
 * - access denied
 * - expired token
 * - timeout
 * - other GitHub errors
 */
export const getGithubAccessToken = async (
  deviceCode: string,
  initialInterval: number,
  expiresIn: number
): Promise<string> => {
  const startTime = Date.now();

  let interval = initialInterval;

  while (
    Date.now() - startTime <
    expiresIn * 1000
  ) {
    // Wait before asking GitHub again
    await new Promise<void>((resolve) => {
      setTimeout(resolve, interval * 1000);
    });

    try {
      const response = await fetch(
        GITHUB_ACCESS_TOKEN_URL,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            `client_id=${encodeURIComponent(
              GITHUB_CLIENT_ID
            )}` +
            `&device_code=${encodeURIComponent(
              deviceCode
            )}` +
            `&grant_type=${encodeURIComponent(
              "urn:ietf:params:oauth:grant-type:device_code"
            )}`,
        }
      );

      const data = await response.json();

      // --------------------------------
      // SUCCESS
      // --------------------------------

      if (data?.access_token) {
        return data.access_token;
      }

      // --------------------------------
      // STILL WAITING
      // --------------------------------

      if (data?.error === "authorization_pending") {
        continue;
      }

      // --------------------------------
      // GITHUB SAYS SLOW DOWN
      // --------------------------------

      if (data?.error === "slow_down") {
        interval += 5;
        continue;
      }

      // --------------------------------
      // USER DENIED LOGIN
      // --------------------------------

      if (data?.error === "access_denied") {
        throw new Error(
          "GitHub login was cancelled."
        );
      }

      // --------------------------------
      // CODE EXPIRED
      // --------------------------------

      if (data?.error === "expired_token") {
        throw new Error(
          "GitHub login expired. Please try again."
        );
      }

      // --------------------------------
      // OTHER ERROR
      // --------------------------------

      throw new Error(
        data?.error_description ||
          "GitHub login failed."
      );
    } catch (error: any) {
      console.log(
        "GitHub Access Token Error:",
        error
      );

      throw new Error(
        error?.message ||
          "Unable to get GitHub access token."
      );
    }
  }

  // --------------------------------
  // TIMEOUT
  // --------------------------------

  throw new Error(
    "GitHub login timed out. Please try again."
  );
};