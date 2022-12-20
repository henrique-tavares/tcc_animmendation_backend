import axios, { isAxiosError } from "axios";
import { YogaInitialContext } from "graphql-yoga";
import _ from "lodash";
import { Ctx, Query, Resolver } from "type-graphql";
import prisma from "../../prisma/client";
import { UserRatingStatusEnum } from "../objects/enums/UserRatingStatus";
import { User } from "../objects/User";
import { UserAnimeRating } from "../objects/UserAnimeRating";
import convertAnime from "../utils/convertAnime";
import { GqlError } from "../utils/GqlError";

type UserJSON = {
  id: number;
  name: string;
  picture?: string;
};

type UserAnimeListJSON = {
  data: UserAnimeRatingJSON[];
  paging: {
    next?: string;
  };
};

type UserAnimeRatingJSON = {
  node: {
    id: number;
  };
  list_status: {
    status: UserRatingStatusEnum;
    score: number;
  };
};

@Resolver(User)
export class UserResolver {
  @Query((returns) => User)
  async getUser(@Ctx() ctx: YogaInitialContext): Promise<User> {
    const token = ctx.request.headers.get("Authorization");

    if (!token) {
      throw GqlError("No token was provided", 403);
    }
    let userJson = null as UserJSON | null;

    try {
      const res = await axios.get<UserJSON>(
        "https://api.myanimelist.net/v2/users/@me",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      userJson = {
        id: res.data.id,
        name: res.data.name,
        picture: res.data.picture,
      };
    } catch (error: any) {
      if (!isAxiosError(error)) {
        throw GqlError(error?.message ?? String(error), 500);
      }

      switch (error.response?.status ?? error.status) {
        case 403:
          throw GqlError("No token was provided", 403);
        case 401:
          throw GqlError("Invalid token", 401);
        default:
          throw GqlError("Error at authenticating", 500);
      }
    }

    if (!userJson) {
      throw GqlError("Invalid user", 500);
    }

    const user: User = {
      id: userJson.id,
      username: userJson.name,
      imageURL: userJson.picture,
    };

    return user;
  }

  @Query((returns) => [UserAnimeRating])
  async getUserAnimeList(
    @Ctx() ctx: YogaInitialContext
  ): Promise<UserAnimeRating[]> {
    const token = ctx.request.headers.get("Authorization");
    if (!token) {
      throw GqlError("No token was provided", 403);
    }
    let userAnimeRatingJson = [] as UserAnimeRatingJSON[];

    let userAnimeListurl =
      "https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status&limit=1000" as
        | string
        | null;

    do {
      try {
        const res = await axios.get<UserAnimeListJSON>(userAnimeListurl!, {
          headers: {
            Authorization: token,
          },
        });
        userAnimeRatingJson.push(...res.data.data);
        userAnimeListurl = res.data.paging.next ?? null;
      } catch (error: any) {
        if (!isAxiosError(error)) {
          throw GqlError(error?.message ?? String(error), 500);
        }

        switch (error.response?.status ?? error.status) {
          case 403:
            throw GqlError("No token was provided", 403);
          case 401:
            throw GqlError("Invalid token", 401);
          default:
            throw GqlError("Error at authenticating", 500);
        }
      }
    } while (!!userAnimeListurl);

    const userAnimeMap = new Map<
      number,
      { score: number; status: UserRatingStatusEnum }
    >(
      userAnimeRatingJson.map((rating) => {
        return [
          rating.node.id,
          {
            score: rating.list_status.score,
            status: rating.list_status.status,
          },
        ];
      })
    );

    const animes = await prisma.anime.findMany({
      where: {
        id: {
          in: [...userAnimeMap.keys()],
        },
      },
    });

    const userAnimeListIncluded = animes.map((anime) => ({
      anime: convertAnime(anime),
      ...userAnimeMap.get(anime.id)!,
    }));

    const statusToNumber: Record<UserRatingStatusEnum, number> = {
      completed: 1,
      watching: 2,
      on_hold: 3,
      dropped: 4,
      plan_to_watch: 5,
    };

    userAnimeListIncluded.sort((a, b) => {
      let diff = a.score - b.score;
      if (diff != 0) {
        return diff;
      }

      diff = statusToNumber[a.status] - statusToNumber[b.status];
      if (diff != 0) {
        return diff;
      }

      diff =
        (a.anime.popularity ?? Number.MAX_SAFE_INTEGER) -
        (b.anime.popularity ?? Number.MAX_SAFE_INTEGER);
      return diff;
    });

    return userAnimeListIncluded;
  }
}
