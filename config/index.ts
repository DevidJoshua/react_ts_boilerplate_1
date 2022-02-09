interface ConfigConstant {
  HOSTNAME: string | undefined;
  API_HOST: string | undefined;
}

const config = {
  HOSTNAME: process.env.HOSTNAME,
  API_HOST: process.env.API_URL,
};

export const { HOSTNAME, API_HOST }: ConfigConstant = config;
