# Stage 1: Build binary
FROM golang:1.22-alpine AS builder
WORKDIR /app

# Copy dependency files terlebih dahulu untuk caching layer
COPY go.mod go.sum ./
RUN go mod download

# Copy seluruh source code
COPY . .

# Build dari direktori cmd/api/main.go dan simpan binary dengan nama 'main' di root /app
RUN go build -o main ./cmd/api/main.go

# Stage 2: Run binary
FROM alpine:latest
WORKDIR /app

# Install certificate jika backend butuh HTTPS/SSL (opsional tapi disarankan)
RUN apk --no-cache add ca-certificates

# Copy binary dari stage builder
COPY --from=builder /app/main .

EXPOSE 8081
CMD ["./main"]