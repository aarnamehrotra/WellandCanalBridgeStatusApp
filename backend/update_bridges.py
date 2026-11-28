from scraper import scrape_bridges
from database import initialize_database, save_bridge_statuses


def main():
    print("Fetching bridge statuses...")

    bridges = scrape_bridges()

    if len(bridges) != 5:
        raise RuntimeError(
            f"Expected 5 bridges, but found {len(bridges)}. "
            "Database was not updated."
        )

    if any(bridge["id"] == "unknown" for bridge in bridges):
        raise RuntimeError("An unknown bridge was found. Database was not updated.")

    if any(bridge["status"] == "UNKNOWN" for bridge in bridges):
        raise RuntimeError("An unknown bridge status was found. Database was not updated.")

    initialize_database()
    save_bridge_statuses(bridges)

    print("Successfully updated all 5 bridge statuses!")

    for bridge in bridges:
        print(f'{bridge["name"]}: {bridge["status_text"]}')


if __name__ == "__main__":
    main()

