# First stage: build the application
FROM maven:3.8.1-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /build/

# Copy the pom.xml and the source code
COPY pom.xml .
COPY src ./src/

# Build the project
RUN mvn clean package -DskipTests

# Second stage: build the runtime image
FROM openjdk:17-jdk-alpine
MAINTAINER baeldung.com

# Copy the jar file from the first stage
COPY --from=build /build/target/blog-be-0.0.1-SNAPSHOT.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]
