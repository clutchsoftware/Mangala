#!/bin/bash
sudo apt-get update

sudo bash setup_16.x

sudo apt-get install -y nodejs
npm install
sudo npm install -g npm@7.12.0
