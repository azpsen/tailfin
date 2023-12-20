import datetime
from enum import Enum

from pydantic import BaseModel


class FlightModel(BaseModel):
    user: str

    date: datetime.date
    aircraft: str = ""
    waypoint_from: str = ""
    waypoint_to: str = ""
    route: str = ""

    hobbs_start: float | None = None
    hobbs_end: float | None = None
    tach_start: float | None = None
    tach_end: float | None = None

    time_start: datetime.datetime | None = None
    time_end: datetime.datetime | None = None
    time_down: datetime.datetime | None = None
    time_stop: datetime.datetime | None = None

    time_total: float = 0.
    time_pic: float = 0.
    time_sic: float = 0.
    time_night: float = 0.
    time_solo: float = 0.

    time_xc: float = 0.
    dist_xc: float = 0.

    takeoffs_day: int = 0
    landings_day: int = 0
    takeoffs_night: int = 0
    landings_all: int = 0

    time_instrument: float = 0
    time_sim_instrument: float = 0
    holds_instrument: float = 0

    dual_given: float = 0
    dual_recvd: float = 0
    time_sim: float = 0
    time_ground: float = 0

    tags: list[str] = []

    pax: list[str] = []
    crew: list[str] = []

    comments: str = ""


class AuthLevel(Enum):
    GUEST = 0
    USER = 1
    ADMIN = 2

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return self.value < other.value
        return NotImplemented

    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return self.value > other.value
        return NotImplemented

    def __eq__(self, other):
        if self.__class__ is other.__class__:
            return self.value == other.value
        return NotImplemented


class UserModel(BaseModel):
    username: str
    password: str
    level: AuthLevel | None = None
