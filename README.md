# Athega Fest

## Local development

### Prerequisites
```bash
\curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm install 2.1.4
gem install eventmachine -v '1.0.3' -- --with-cppflags=-I/usr/local/opt/openssl/include
gem install bundler passenger mongo
bundle install
```

### Local mongo
```bash
mongod --dbpath some-path
```

### Local www
```bash
passenger start
```

### In the browser
http://localhost:3000/
