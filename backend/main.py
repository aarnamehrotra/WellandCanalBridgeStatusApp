from fastapi import FastAPI
from scraper import scrape_bridges

app = FastAPI(title="WellandCanalBridgeStatus API")


@app.get("/")
def root():
    return {"message": "WellandCanalBridgeStatus API is running"}


@app.get("/bridges")
def get_bridges():
    return {
        "bridges": scrape_bridges()
    }