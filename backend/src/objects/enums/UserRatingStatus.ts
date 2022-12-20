import { registerEnumType } from "type-graphql";

export enum UserRatingStatusEnum {
  WATCHING = "watching",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
  DROPPED = "dropped",
  PLAN_TO_WATCH = "plan_to_watch",
}

registerEnumType(UserRatingStatusEnum, {
  name: "UserRatingStatus",
  description: "Status for an user's rating",
});
