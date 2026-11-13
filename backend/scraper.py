import requests
from bs4 import BeautifulSoup

URL = "https://seaway-greatlakes.com/bridgestatus/detailsnai?key=BridgeSCT"

BRIDGE_IDS = {
    "Lakeshore Rd (Bridge 1)": "lakeshore",
    "Carlton St. (Bridge 3A)": "carlton",
    "Queenston St. (Bridge 4)": "queenston",
    "Glendale Ave. (Bridge 5)": "glendale",
    "Highway 20 (Bridge 11)": "highway-20",
}

def fetch_page():
    response = requests.get(URL, timeout=15)
    response.raise_for_status()
    return response.text

def normalize_status(status_text):
    if status_text.startswith("Available (raising soon)"):
        return "RAISING_SOON"

    if status_text.startswith("Available"):
        return "AVAILABLE"

    if status_text.startswith("Unavailable"):
        return "UNAVAILABLE"

    return "UNKNOWN"

def scrape_bridges():
    html = fetch_page()
    soup = BeautifulSoup(html, "html.parser")

    bridges = []

    for table in soup.find_all("table", id="grey_box"):
        name_element = table.find("span", class_="lgtextblack")
        status_element = table.find("span", id="status")

        if not name_element or not status_element:
            continue

        bridges.append({
    "id": BRIDGE_IDS.get(name_element.get_text(strip=True), "unknown"),
    "name": name_element.get_text(strip=True),
    "status": normalize_status(
        status_element.get_text(strip=True)
    ),
    "status_text": status_element.get_text(strip=True),
})

    return bridges


if __name__ == "__main__":
    for bridge in scrape_bridges():
        print(bridge)