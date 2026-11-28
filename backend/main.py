
from fastapi import FastAPI, HTTPException
from database import get_bridge_statuses

app = FastAPI(title="WellandCanalBridgeStatus API")


@app.get("/")
def root():
    return {"message": "WellandCanalBridgeStatus API is running"}


@app.get("/bridges")
def get_bridges():
    bridges = get_bridge_statuses()

    if not bridges:
        raise HTTPException(
            status_code=503,
            detail="Bridge statuses have not been populated yet."
        )

    return {
        "bridges": bridges
    }

