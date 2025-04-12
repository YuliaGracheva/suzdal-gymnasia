@echo off
echo Run project "Suzdal-Gymnasia"...

REM 
IF NOT EXIST node_modules (
    echo Install node-module...
    npm install
)

echo Run servers and client...
npm start
