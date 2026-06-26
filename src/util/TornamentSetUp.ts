import { Tournament } from "../models/Tournament";
import { Division } from "../models/Division";
import { Team } from "../models/Team";

enum Superville {
  SACOSAH = "SACOSAH",
  BOSTON = "BOSTON",
  STRIKERS = "STRIKERS",
  ORIGINAL_EAGLES = "ORIGINAL EAGLES",
  PHOENIX = "PHOENIX",
}

enum Clouden {
  NEW_MILLENNIUM = "NEW MILLENNIUM",
  GAME_OF_THRONES = "GAME OF THRONES",
  NEW_JERSEY_UNITED = "NEW JERSEY UNITED",
  TRINI_REBELS = "TRINI REBELS",
}

enum Eccles {
  BLACK_EAGLES = "BLACK EAGLES",
  UNITY = "UNITY",
  MARYLAND_OUTSIDERS = "MARYLAND OUTSIDERS",
  JB_GAMBLERS = "JB GAMBLERS",
}

enum Philip {
  WHY_WORRY = "WHY WORRY",
  GUYANA_JAGUARS = "GUYANA JAGUARS",
  RAIDERS = "RAIDERS",
  JUST_4_YOU = "JUST 4 YOU",
}

// Use Spread Operator for readability takes all the values of the 4
// divisions enums and copies them into one object

const divisions = {
  ...Superville,
  ...Clouden,
  ...Eccles,
  ...Philip,
};

export function setup() {
  const tournament = new Tournament();

  const addTeamsToDivision = (division: Division, enumObject: any) => {
    Object.values(enumObject).forEach((teamName) => {
      division.addTeam(new Team(teamName as string));
    });
  };

  const divisionsAndTeams = [
    { name: "Superville", enumObject: Superville },
    { name: "Clouden", enumObject: Clouden },
    { name: "Eccles", enumObject: Eccles },
    { name: "Philip", enumObject: Philip },
  ];

  divisionsAndTeams.forEach(({ name, enumObject }) => {
    const division = new Division(name);
    addTeamsToDivision(division, enumObject);
    tournament.addDivision(division);
  });

  // Add games to round 1
  // tournament.addGameToRound(
  //     1,
  //     divisions.GAME_OF_THRONES,
  //     17,
  //     5,
  //     divisions.UNTOUCHABLES,
  //     16,
  //     7,
  //     "11:00am",
  //     "1:45am"
  // );
  tournament.addGameToRound(
    1,
    divisions.MARYLAND_OUTSIDERS,
    18,
    4,
    divisions.JB_GAMBLERS,
    16,
    4,
    "'11:00am'",
    "2:07pm",
  );
  tournament.addGameToRound(
    1,
    divisions.RAIDERS,
    18,
    6,
    divisions.JUST_4_YOU,
    15,
    8,
    "10:30am",
    "2:00pm",
  );
  tournament.addGameToRound(
    1,
    divisions.BLACK_EAGLES,
    18,
    2,
    divisions.UNITY,
    4,
    1,
    "no entry",
    "1:00pm",
  );
  tournament.addGameToRound(
    1,
    divisions.NEW_JERSEY_UNITED,
    18,
    9,
    divisions.TRINI_REBELS,
    4,
    1,
    "no entry",
    "1:00pm",
  );

  tournament.addGameToRound(
    1,
    divisions.GUYANA_JAGUARS,
    18,
    3,
    divisions.WHY_WORRY,
    14,
    5,
    "11:00am",
    "1:30pm",
  );
  tournament.addGameToRound(
    1,
    divisions.STRIKERS,
    18,
    6,
    divisions.ORIGINAL_EAGLES,
    10,
    4,
    "11:00am",
    "1:39pm",
  );
  tournament.addGameToRound(
    1,
    divisions.NEW_MILLENNIUM,
    18,
    9,
    divisions.GAME_OF_THRONES,
    10,
    1,
    "11:00am",
    "no entry",
  );
  tournament.addGameToRound(
    1,
    divisions.SACOSAH,
    18,
    5,
    divisions.BOSTON,
    15,
    7,
    "11:00am",
    "no entry",
  );
  tournament.addGameToRound(
    2,
    divisions.ORIGINAL_EAGLES,
    18,
    4,
    divisions.PHOENIX,
    11,
    2,
    "4:00pm",
    "6:27pm",
  );
  tournament.addGameToRound(
    2,
    divisions.JUST_4_YOU,
    18,
    9,
    divisions.GUYANA_JAGUARS,
    14,
    3,
    "4:00pm",
    "6:30pm",
  );
  tournament.addGameToRound(
    2,
    divisions.GAME_OF_THRONES,
    18,
    5,
    divisions.TRINI_REBELS,
    13,
    5,
    "4:00pm",
    "6:30pm",
  );

  tournament.addGameToRound(
    2,
    divisions.STRIKERS,
    18,
    9,
    divisions.BOSTON,
    13,
    5,
    "4:10pm",
    "6:30pm",
  );
  tournament.addGameToRound(
    2,
    divisions.JB_GAMBLERS,
    18,
    3,
    divisions.UNITY,
    10,
    4,
    "4:00pm",
    "no entry",
  );
  tournament.addGameToRound(
    2,
    divisions.RAIDERS,
    18,
    5,
    divisions.WHY_WORRY,
    17,
    7,
    "4:00pm",
    "6:45pm",
  );
  tournament.addGameToRound(
    2,
    divisions.NEW_MILLENNIUM,
    18,
    8,
    divisions.NEW_JERSEY_UNITED,
    16,
    7,
    "4:00pm",
    "no entry",
  );

  tournament.addGameToRound(
    2,
    divisions.MARYLAND_OUTSIDERS,
    18,
    7,
    divisions.BLACK_EAGLES,
    17,
    4,
    "4:00pm",
    "7:26pm",
  );

  tournament.addBuyRound(
    3,
    divisions.STRIKERS,
    [6, 9],
    [10, 13],
    [4, 5],
    "no entry",
    "no entry",
  );

  tournament.addGameToRound(
    3,
    divisions.GUYANA_JAGUARS,
    18,
    8,
    divisions.RAIDERS,
    11,
    2,
    "7:30pm",
    "9:28pm",
  );
  tournament.addGameToRound(
    3,
    divisions.NEW_MILLENNIUM,
    18,
    7,
    divisions.TRINI_REBELS,
    10,
    5,
    "7:30pm",
    "no entry",
  );
  tournament.addGameToRound(
    3,
    divisions.MARYLAND_OUTSIDERS,
    18,
    5,
    divisions.UNITY,
    10,
    4,
    "7:00pm",
    "10:14pm",
  );
  tournament.addGameToRound(
    3,
    divisions.GAME_OF_THRONES,
    18,
    6,
    divisions.NEW_JERSEY_UNITED,
    11,
    4,
    "7:00pm",
    "no entry",
  );
  tournament.addGameToRound(
    3,
    divisions.BLACK_EAGLES,
    18,
    8,
    divisions.JB_GAMBLERS,
    11,
    10,
    "7:00pm",
    "10:17pm",
  );
  tournament.addGameToRound(
    3,
    divisions.SACOSAH,
    18,
    4,
    divisions.ORIGINAL_EAGLES,
    17,
    7,
    "7:00pm",
    "no entry",
  );

  tournament.addGameToRound(
    3,
    divisions.PHOENIX,
    18,
    7,
    divisions.BOSTON,
    13,
    3,
    "7:00pm",
    "no entry",
  );
  tournament.addGameToRound(
    3,
    divisions.SACOSAH,
    18,
    4,
    divisions.ORIGINAL_EAGLES,
    17,
    7,
    "5:30pm",
    "no entry",
  );

  return tournament;
}
