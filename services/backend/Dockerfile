FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY services/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN useradd --create-home --shell /usr/sbin/nologin appuser

COPY --chown=appuser:appuser services/backend/app.py .
COPY --chown=appuser:appuser data ./data

USER appuser

EXPOSE 8000

CMD ["python", "-m", "gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "app:app"]
