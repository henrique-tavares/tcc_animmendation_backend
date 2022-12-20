import { registerEnumType } from "type-graphql";

export enum DateMethodEnum {
  LESS_THAN = "lt",
  LESS_THAN_OR_EQUAL = "lte",
  EQUAL = "equals",
  GREATER_THAN = "gt",
  GREATER_THAN_OR_EQUAL = "gte",
}

registerEnumType(DateMethodEnum, {
  name: "DateMethod",
  description: "method for querying data",
});
