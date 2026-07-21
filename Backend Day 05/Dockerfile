FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

COPY src/ src/
RUN ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-jammy

RUN groupadd --system spring && useradd --system --gid spring spring

WORKDIR /app
COPY --from=build --chown=spring:spring /workspace/target/backend-day-05-0.0.1-SNAPSHOT.jar app.jar

USER spring
EXPOSE 8081

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
