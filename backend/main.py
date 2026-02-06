import json
import os
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("listings.json", "r") as f:
    LISTINGS_DB = json.load(f)

with open("users.json", "r") as f:
    USERS_DB = json.load(f)

# Contact info
class UserProfile(BaseModel):
    name: str
    phone: str
    email: str

# Frontend data from the roommate survey
class UserRoomateAnswers(BaseModel):
    questions: List[str]
    answers: List[str]

# Frontend data from the housing survey
class UserHousingAnswers(BaseModel):
    questions: List[str]
    answers: List[str]

# structure for a Roommate Match
class RoommateMatch(BaseModel):
    name: str = Field(description="Name of the matching user")
    match_score: int = Field(description="Score from 0-100")
    common_interests: List[str]
    why_we_match: str = Field(description="A 1-sentence explanation")

class RoommateResponse(BaseModel):
    recommendations: List[RoommateMatch]

# structure for a Housing Match
class HousingMatch(BaseModel):
    title: str = Field(description="Title of the listing")
    price: int
    scam_risk: str = Field(description="High, Medium, or Low")
    why_its_good: str = Field(description="Why this fits the user's budget/vibe")

class HousingResponse(BaseModel):
    recommendations: List[HousingMatch]

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY")) 

# Test endpoint
@app.get("/")
async def read_root():
    return {"status": "backend is running"}

# Endpoint for matching roommates
@app.post("/compatibility/users", response_model=RoommateResponse)
async def match_roommates(current_user: UserProfile, answers: UserRoomateAnswers):
    """
    Sends the Current User + The Entire User DB to Gemini.
    Gemini picks the best roomate fit.
    """
    prompt = f"""
    I am looking for a roommate.
    My Profile: {current_user.model_dump_json()}
    My Survey Answers: {answers.model_dump_json()}

    Here is the database of potential roommates:
    {json.dumps(USERS_DB)}

    Task:
    1. Compare me to the database.
    2. Find the MOST most compatible person based on my survey answers.
    3. For each match, explain why we are a good fit and list any common interests.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite", 
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": RoommateResponse,
        },
    )
    
    return RoommateResponse.model_validate_json(response.text)

# Endpoint for matching housing listings
@app.post("/compatibility/listings", response_model=HousingResponse)
async def match_listings(current_user: UserProfile, answers: UserHousingAnswers):
    """
    Sends the Current User + The Entire Listings DB to Gemini.
    Gemini picks the best appartment fit and analyzes the listing for scam markers.
    """
    prompt = f"""
    I am looking for housing.
    My Profile: {current_user.model_dump_json()}
    My Survey Answers: {answers.model_dump_json()}

    Here is the database of listings:
    {json.dumps(LISTINGS_DB)}

    Task:
    1. Find the MOST compatible listing based on my survey answers.
    2. Analyze the listing description for scam markers (bad grammar, 'kindly', etc).
    3. Return the results.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": HousingResponse,
        },
    )

    return HousingResponse.model_validate_json(response.text)