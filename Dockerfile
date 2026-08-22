# Use the official Maven image with Java 21
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use Amazon Corretto minimal Java runtime
FROM amazoncorretto:21-alpine

WORKDIR /app

# Copy the JAR from builder stage
COPY --from=builder /app/target/BankMangementApp-*.jar app.jar

# Expose the port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/api/actuator/health || exit 1

# Run the application with production profile
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]

