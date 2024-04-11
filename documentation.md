# LAMP (Linux, Apache (opens local server), MySQL y PHP)
# MERN (Mongo DB, Express, React, Node.js (lets you use JS for server-side))
# Initialize node.js back end


# npm (downloads packages) 
npm init -y 
# save-dev is only for dev it wont be in production.
npm install --save-dev typescript
# npx (executes packages)
# tsc init is the config like the php.ini  
npx tsc --init
# i short for install
npm i express
# only needed for typescript proyects
npm i --save-dev @types/express

# compile ts to js so that node.js can compile 
npx tsc
# to run server for production
node server.js

# automatically restart server with  js  and see changes instantly -> with nodemon
npm install --save-dev nodemon
# ts-node to compile on the fly ts to js with node -D = --save-dev
npm install -D ts-node
# run server for dev
npx nodemon src/server.ts
# It's a linting tool, which means it helps developers detect errors and enforce coding standards in their JavaScript codebase.
npm i -D eslint

npx eslint --init
# install package to be able to use config file .env
npm i dotenv
# object modelling for MQL (MONGODB QUERY LANGUAGE)
npm i mongoose