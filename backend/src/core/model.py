from datetime import datetime

from pydantic import BaseModel


class TournamentModel(BaseModel):
    name: str
    date: datetime
    buy_in: int


class coupModel(BaseModel):
    pass
