# WebApp using Microservices

This WebApp consists of three parts:
 1. Main Application — contains views and business logic.
 2. Service Registry — have register, unregister, and cleanup method to maintain different services.
 3. Mircoservices — it contains Employee Service, using which we will display data on the Home page application

## Building

* Clone a copy of the repo:

  ```bash
   git clone https://github.com/princeseth/nodejs-microservices.git
  ```

### Tasklist Application

* Change to the tasklist-app directory:

  ```bash
  cd tasklist-app
  ```

* Install dev dependencies:

  ```bash
  npm install  
  ```

### Service Registry

* Change to the service-registry directory:

  ```bash
  cd service-registry
  ```

* Install dev dependencies:

  ```bash
  npm install  
  ```

### Employee Service

* Change to the employee-service directory:

  ```bash
  cd employee-service
  ```

* Install dev dependencies:

  ```bash
  npm install  
  ```


1. Start the tasklist-app project using `node start` this application will listens at port `3085. 
2. Start the service-registry project using `node start` this registry has get, register, unregister method.
3. Start the employee-service project using `node start` this service has all the data related to employee viz. images, work, names.


Now, vist at * http://localhost:3085/ * 

![Alt text](./tasklist.png?raw=true "Tasklist")


