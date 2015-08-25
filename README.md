![Build Status](https://circleci.com/gh/tropicloud/wong-sample.png?circle-token=9c180e4e36fc7229a51e4520b4837668f72b89c1 "Build Status")

##Chaordic OnSite sample for Wong Peru
This is a frontend demo of a responsive, touch-friendly, JSON + AJAX carousel for the Chaordic OnSite plataform. Includes a RESTful API with access points for recomended products. You may read, add, edit or remove backend data using standart HTTP verbs (see [Postman](https://www.getpostman.com/) or curl).

http://app.wong.tropicloud.svc.tutum.io/

### Features
* Touch-Friendly 
* Responsive
* Dynamic content via JSON API

### Requirements
* Node.js (development)
* Docker (production)

### Usage

Clone the repository locally.
```shell
git clone https://github.com/tropicloud/wong-sample.git
cd wong-sample
```

Install dependencies.
```shell
sudo npm install
bower install
```

Run the app.
```shell
node wong.js
```

Now vist `http://localhost:3000/` in your browser to check the app.

Alternatively, you may run the app inside a Docker container, see below.

### Deployment

This repo contains a Dockerfile for easy app deployments.

```shell
cd wong-sample
```

Build the Docker image.
```shell
docker build -t tropicloud/wong-sample .
```

Run the app.
```shell
docker run -p 8080:8080 tropicloud/wong-sample
```

Now vist `http://localhost:8080/` in your browser to check the app.
