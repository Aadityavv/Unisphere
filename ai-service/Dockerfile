# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy only requirements first (for Docker cache optimization)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose port (optional for clarity in logs)
EXPOSE 8000

# Run the Flask app
CMD ["python", "app.py"]
