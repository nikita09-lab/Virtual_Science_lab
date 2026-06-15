# Issue: `TypeError` Crash in Backend Sync Service when Processing `null` Payload Integers

## Description
In `Backend/app/services/sync_service.py`, the `quiz` offline sync action processor retrieved integer properties using the standard dictionary `get()` method with a default fallback:
```python
score = int(payload.get("score", 0))
total_questions = int(payload.get("total_questions", 5))
```

**The Bug:**
If a frontend client passed these fields explicitly as `null` in the JSON payload (e.g., `{"score": null}`), `payload.get("score", 0)` ignores the fallback `0` because the `"score"` key *exists* in the payload, and thus returns `None`. 
Passing `None` to Python's `int()` method instantly crashes the application with a `TypeError`: `int() argument must be a string, a bytes-like object or a real number, not 'NoneType'`. Since this happens inside the `quiz` sync flow, it completely aborts the batch synchronization step.

## Proposed Solution
Refactor the parsing to safely handle `None` values returned from the JSON payload. Ensure `int()` is only called when the value is explicitly not `None`.

**Implemented Code:**
```python
s_val = payload.get("score")
score = int(s_val) if s_val is not None else 0

tq_val = payload.get("total_questions")
total_questions = int(tq_val) if tq_val is not None else 5
```

## Status
This issue has been successfully resolved directly within the `sync_service.py` file to prevent backend crashes from `null` payload submissions.
