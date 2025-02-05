# **도커 명령어**
***
- **이미지 빌드** : docker build -t fastapi-music-recommender .

- **컨테이너 실행** : docker run -d -p 8000:8000 --env-file .env --name fastapi_music fastapi-music-recommender

# **API 명세서**
***
- **HTTP 메서드** : POST

- **URL**
  - **텍스트** : /analyze/text/
  - **이미지** : /analyze/image/

- **요청 형식 & 응답 형식** : `json`

- **요청 예시**
요청
```json
{
    "text": "오늘 남자친구와 헤어졌어"
}
```

응답
```json
{
    "songs": [
        {
            "title": "헤어진 다음날",
            "artist": "양다일"
        },
        {
            "title": "안녕",
            "artist": "폴킴"
        },
        {
            "title": "어떻게 이별까지 사랑하겠어, 널 사랑하는 거지",
            "artist": "AKMU(악뮤)"
        },
        {
            "title": "이 밤을 빌려 말해요",
            "artist": "10CM"
        },
        {
            "title": "끝사랑",
            "artist": "김범수"
        },
        {
            "title": "나만, 봄",
            "artist": "볼빨간사춘기"
        },
        {
            "title": "널 사랑하지 않아",
            "artist": "어반자카파"
        },
        {
            "title": "다시 사랑한다면",
            "artist": "뮤지(뮤직비디오)"
        },
        {
            "title": "계단말고 엘리베이터",
            "artist": "버벌진트"
        },
        {
            "title": "I Still Love You",
            "artist": "소유"
        }
    ]
}
```