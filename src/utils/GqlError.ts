import { GraphQLError } from "graphql";

export const GqlError = (
  message: string,
  status: number,
  extensions?: Record<string, any>
): GraphQLError => {
  return new GraphQLError(
    message,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    {
      http: {
        status,
      },
      ...(extensions ?? {}),
    }
  );
};
