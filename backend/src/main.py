import os
from datetime import datetime
from typing import List

from core.model import TournamentModel
from fastapi import Body, FastAPI, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

TOURNAMENT_DB = os.environ["TOURNAMENT_DB"]
TOURNAMENT_COLLECTION = os.environ["TOURNAMENT_COLLECTION"]
app = FastAPI()
client = AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client[TOURNAMENT_DB]
tournament_collection = db.get_collection(TOURNAMENT_COLLECTION)

origins = [
    "http://localhost:3000",
    "http://115.79.36.188:3000",
    "http://115.79.36.188:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post(
    "/tournament/",
    response_description="adding a new tournament",
    status_code=status.HTTP_201_CREATED,
)
async def create_tournament(tournament: TournamentModel):
    """_summary_

    Args:
        tournament (TournamentModel): _description_

    Returns:
        _type_: _description_
    """
    tournament.date = tournament.date.isoformat()
    tournament_dumped = tournament.model_dump(by_alias=True, exclude=["id"])

    new_tournament = await tournament_collection.insert_one(tournament_dumped)

    await tournament_collection.find_one({"_id": new_tournament.inserted_id})
    return status.HTTP_201_CREATED


# Il faudra mettre un renvoi typé : List[Tournament] mais comme la db est un dans un désordre c'est ok pour l'instant.
@app.get(
    "/tournament/",
    response_description="adding a new tournament",
    status_code=status.HTTP_200_OK,
)
async def get_tournaments(start_batch: int, end_batch: int):

    cursor = (
        tournament_collection.find().skip(start_batch).limit(end_batch - start_batch)
    )

    tournaments = await cursor.to_list(length=end_batch - start_batch)

    if not tournaments:
        return []
        # raise HTTPException(status_code=404, detail="No tournaments on the db")
    for tournament in tournaments:
        tournament["_id"] = str(tournament["_id"])
        try:
            tournament["date"] = datetime.fromisoformat(tournament["date"]).strftime(
                "%d %B %Y"
            )
        except Exception as e:
            continue

    return tournaments
