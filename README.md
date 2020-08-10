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

### 5. run rails db:migrate

```
$ rails db:migrate
```

### 6. run server

```
$ rails s
```

And now go to  http://localhost:3000/
