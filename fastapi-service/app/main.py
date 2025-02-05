from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
import uuid
from app.sentiment_analysis import analyze_text_sentiment, analyze_image_sentiment

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용 (필요한 경우 특정 출처만 허용할 수 있음)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

@app.post("/analyze/text/")
async def analyze_text(input_data: dict):
    """텍스트 감정 분석 및 노래 추천"""
    text = input_data.get("text")
    if not text:
        raise HTTPException(status_code=400, detail="텍스트가 필요합니다.")

    result = analyze_text_sentiment(text)
    return result

@app.post("/analyze/image/")
async def analyze_image(file: UploadFile = File(...)):
    """이미지 감정 분석 및 노래 추천"""
    file_path = f"temp/{uuid.uuid4()}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(file_path, "rb") as img_file:
        image_data = img_file.read()

    result = analyze_image_sentiment(image_data)
    return result