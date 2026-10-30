"""Search text-only layout patterns bundled with this skill."""
import argparse
import json
import sys
from pathlib import Path


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--query", default="")
    parser.add_argument("--profile", choices=["weekly", "research", "banner", "classic"])
    parser.add_argument("--limit", type=int, default=12)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    data = json.loads((root / "references" / "layout-patterns.json").read_text(encoding="utf-8"))
    terms = args.query.casefold().split()
    matches = []
    for row in data["patterns"]:
        if args.profile and args.profile not in row["profiles"]:
            continue
        searchable = " ".join([row["id"], row["title"], row["structure"], row["guidance"], *row["tags"]]).casefold()
        score = sum(term in searchable for term in terms)
        if terms and not score:
            continue
        matches.append((score, row))
    matches.sort(key=lambda item: (-item[0], item[1]["id"]))
    print(json.dumps([row for _, row in matches[:max(0, args.limit)]], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
