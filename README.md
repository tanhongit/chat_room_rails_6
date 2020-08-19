# Welcome to Chat Rooms Rails 6 by TANHONGIT
Complete the chat room application implementation using Ruby on Rails 6 and WebSockets.

# What are WebSockets
WebSocket is actually a protocol that enables bidirectional communication between the client and the server of a web application over a single long living TCP connection.

# Building the application
We are going to build the web application using:

- Ruby: version ruby 2.7.1
- Rails: version 6.0.3.2

# DEMO Chat Room Application
![Image](https://media.giphy.com/media/U4FeYRecUZls67UEXv/giphy.gif)

# Runing

### 1. Clone Repo

```
$ git clone https://github.com/TanHongIT/chat_room_rails_6
$ cd chat_room_rails_6
```

### 2. Bundle Install 

```
$ bundle install
```

### 3. Yarn Install 

```
$ yarn install
```

### 4. Create database with Postgresql

You must change the appropriate database configuration

Change configuration at _"config/database.yml"_ with Postgresql.

```ruby
default: &default
  adapter: postgresql
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000
  username: chat_room_rails_6
  password: 1234
  host: localhost

# tutorial for ubuntu linux:
# sudo -u postgres psql
# create user "chat_room_rails_6" with password '1234';  
# create database "chat_room_rails_6" owner "chat_room_rails_6"; 

development:
  <<: *default
  database: chat_room_rails_6

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: chat_room_rails_6_test

production:
  <<: *default
  database: chat_room_rails_6_production
```

You must change the username, password and database name accordingly!

### 5. run rails db:migrate

```
$ rails db:migrate
```
### 6. Install redis

We are going to use the redis adapter which is a safe option for production environments unlike the async one.

You first must install [redis](https://redis.io/) on your system.

To install it on Ubuntu you just have to execute the following commands in your terminal:

```
$ sudo apt update
$ sudo apt install redis-server
```

To check that installation is successful, in your terminal make sure you get a PONG:

```
$ redis-cli
127.0.0.1:6379> ping
PONG
```

### 7. run server

```
$ rails s
```

And now go to  http://localhost:3000/

_**Read more:**_ Chat Room Realtime App With Deno : https://github.com/TanHongIT/Deno-Realtime-Chat-App

<p align="center">
     <img src="https://img.shields.io/packagist/l/doctrine/orm.svg" data-origin="https://img.shields.io/packagist/l/doctrine/orm.svg" alt="license">
</p>
