from datetime import datetime, timezone
from typing import Optional

from app.core.db import get_database
from app.services import gamification_service, notes_service, progress_service

_indexes_created = False


def _get_db():
    global _indexes_created
    db = get_database()
    if not _indexes_created:
        db["lab_reports"].create_index("user_id")
        db["lab_reports"].create_index("id", unique=True)
        _indexes_created = True
    return db


def init_db():
    _get_db()


EXPERIMENT_DETAILS = {
    "human-body": {
        "title": "Human Body Anatomy",
        "subject": "biology",
        "objective": "To identify major human body systems and understand how organs coordinate to support life processes.",
        "procedure": "Open the anatomy experiment, inspect the labelled body systems, record key organ functions, and connect observations with the theory notes.",
    },
    "mitochondria": {
        "title": "Mitochondria",
        "subject": "biology",
        "objective": "To study the structure of mitochondria and explain their role in cellular energy production.",
        "procedure": "Observe the mitochondrial model, identify membranes and cristae, and note how structure supports ATP production.",
    },
    "eye": {
        "title": "Eye Anatomy",
        "subject": "biology",
        "objective": "To understand the main parts of the human eye and how they help form vision.",
        "procedure": "Explore the eye model, identify the cornea, lens, iris, retina, and optic nerve, then record functional observations.",
    },
    "kidney": {
        "title": "Kidney Anatomy",
        "subject": "biology",
        "objective": "To examine kidney structure and understand filtration of blood to form urine.",
        "procedure": "Inspect the kidney model, identify cortex, medulla, pelvis, and nephron-related structures, then summarize filtration flow.",
    },
    "chemistry-equipment": {
        "title": "Chemistry Equipment",
        "subject": "chemistry",
        "objective": "To recognize common laboratory equipment and understand appropriate uses for measurement, heating, and handling.",
        "procedure": "Review each apparatus, identify its name and purpose, and record safe handling observations.",
    },
    "volcano-experiment": {
        "title": "Volcano Experiment",
        "subject": "chemistry",
        "objective": "To observe gas formation during a chemical reaction using a volcano model.",
        "procedure": "Run the volcano reaction simulation, observe bubbling and eruption behavior, and relate it to carbon dioxide production.",
    },
    "condenser": {
        "title": "Condenser",
        "subject": "chemistry",
        "objective": "To understand how a condenser cools vapor and converts it back into liquid during distillation.",
        "procedure": "Observe vapor and coolant flow paths, identify inlet and outlet direction, and record how cooling causes condensation.",
    },
    "acid-base-neutralization": {
        "title": "Acid Base Neutralization",
        "subject": "chemistry",
        "objective": "To observe neutralization between hydrochloric acid and sodium hydroxide, producing salt and water.",
        "procedure": "Mix acid and base carefully with indicator, observe color or temperature change, and connect the result to H+ and OH- ion combination.",
    },
    "velocity-acceleration": {
        "title": "Velocity & Acceleration",
        "subject": "physics",
        "objective": "To understand the relationship between velocity, acceleration, and change in motion over time.",
        "procedure": "Run the motion experiment, observe changes in speed and direction, and record how acceleration affects velocity.",
    },
    "magnetic-field-wires": {
        "title": "Magnetic Field (Two Wires)",
        "subject": "physics",
        "objective": "To observe magnetic interaction between two current-carrying parallel wires.",
        "procedure": "Set current directions in the simulation, compare attraction and repulsion, and note how current direction changes force.",
    },
    "thumb-rule": {
        "title": "Right-Hand Thumb Rule",
        "subject": "physics",
        "objective": "To apply the right-hand thumb rule for predicting magnetic field direction around a conductor.",
        "procedure": "Orient the thumb with current direction, observe curled finger direction, and compare predictions with the model.",
    },
    "magnetic-field-direction": {
        "title": "Magnetic Field Direction",
        "subject": "physics",
        "objective": "To map magnetic field direction around a straight current-carrying conductor.",
        "procedure": "Change current direction and distance from conductor, observe field direction and strength, and record patterns.",
    },
}


def _next_report_id() -> int:
    """Mongo-native auto-increment, mirroring SQLite's AUTOINCREMENT id."""
    db = _get_db()
    doc = db["counters"].find_one_and_update(
        {"_id": "lab_reports"},
        {"$inc": {"value": 1}},
        upsert=True,
        return_document=True,
    )
    return doc["value"]


def _serialize(doc) -> dict:
    if doc is None:
        return None
    doc.pop("_id", None)
    return doc


def get_experiment_detail(experiment_id: str):
    return EXPERIMENT_DETAILS.get(
        experiment_id,
        {
            "title": experiment_id.replace("-", " ").title(),
            "subject": "science",
            "objective": "To complete the virtual experiment and document observations, results, and conclusions.",
            "procedure": "Perform the virtual experiment, record observations, complete the quiz, and summarize learning outcomes.",
        },
    )


def build_quiz_performance(user_id: str, experiment_id: str):
    attempts = gamification_service.get_quiz_attempts(user_id, experiment_id)
    if not attempts:
        return "Quiz not attempted yet."

    latest = attempts[0]
    best = max(attempts, key=lambda item: item["score"])
    return (
        f"Latest score: {latest['score']}/{latest['total_questions']} ({latest['percentage']}%). "
        f"Best score: {best['score']}/{best['total_questions']}. "
        f"Total attempts: {len(attempts)}."
    )


def build_results(user_id: str, experiment_id: str, notes):
    progress = progress_service.get_user_experiment_progress(user_id)
    matching = next((item for item in progress if item["experiment_id"] == experiment_id), None)
    completion = "Completed" if matching and matching["completed"] else "Not marked complete"
    quiz_summary = build_quiz_performance(user_id, experiment_id)
    learning = notes.get("learnings") if notes else ""
    if learning:
        return f"{completion}. Key learning: {learning}\n\n{quiz_summary}"
    return f"{completion}.\n\n{quiz_summary}"


def create_report(user_id: str, experiment_id: str):
    db = _get_db()
    detail = get_experiment_detail(experiment_id)
    notes = notes_service.get_user_experiment_notes(user_id, experiment_id) or {}
    now = datetime.now(timezone.utc).isoformat()

    report_id = _next_report_id()

    safe_user_id = str(user_id)
    safe_experiment_id = str(experiment_id)

    payload = {
        "id": report_id,
        "user_id": safe_user_id,
        "experiment_id": safe_experiment_id,
        "title": detail["title"],
        "subject": detail["subject"],
        "objective": detail["objective"],
        "procedure": detail["procedure"],
        "observations": notes.get("observations") or "No observations recorded yet.",
        "results": build_results(user_id, experiment_id, notes),
        "conclusions": notes.get("conclusions") or "Conclusion draft pending student review.",
        "quiz_performance": build_quiz_performance(user_id, experiment_id),
        "status": "draft",
        "generated_at": now,
        "updated_at": now,
    }

    db["lab_reports"].insert_one(payload)
    return get_report(safe_user_id, report_id)


def get_reports(user_id: str):
    db = _get_db()
    safe_user_id = str(user_id)
    docs = db["lab_reports"].find({"user_id": safe_user_id}).sort("updated_at", -1)
    return [_serialize(doc) for doc in docs]


def get_report(user_id: str, report_id: int):
    db = _get_db()
    safe_user_id = str(user_id)
    doc = db["lab_reports"].find_one({"user_id": safe_user_id, "id": report_id})
    return _serialize(doc)


def update_report(report_id: int, payload: dict):
    db = _get_db()
    allowed_fields = [
        "title",
        "objective",
        "procedure",
        "observations",
        "results",
        "conclusions",
        "quiz_performance",
        "status",
    ]
    updates = {key: value for key, value in payload.items() if key in allowed_fields and value is not None}
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()

    existing = db["lab_reports"].find_one({"id": report_id})
    if not existing:
        return None

    db["lab_reports"].update_one({"id": report_id}, {"$set": updates})
    return get_report(existing["user_id"], report_id)


def to_markdown(report):
    return "\n".join(
        [
            f"# {report['title']}",
            "",
            f"**Subject:** {report['subject'].title()}",
            f"**Experiment ID:** {report['experiment_id']}",
            f"**Generated At:** {report['generated_at']}",
            f"**Status:** {report['status'].title()}",
            "",
            "## Objective",
            report["objective"],
            "",
            "## Procedure",
            report["procedure"],
            "",
            "## Observations",
            report["observations"],
            "",
            "## Results",
            report["results"],
            "",
            "## Conclusions",
            report["conclusions"],
            "",
            "## Quiz Performance",
            report["quiz_performance"],
            "",
        ]
    )


def export_markdown(user_id: str, report_id: int) -> Optional[str]:
    report = get_report(user_id, report_id)
    if not report:
        return None
    return to_markdown(report)