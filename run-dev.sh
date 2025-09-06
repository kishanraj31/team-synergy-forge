#!/bin/bash

echo "Starting SynergySphere Development Environment..."
echo

echo "Installing dependencies..."
npm install
cd backend && npm install

echo
echo "Setting up database..."
npm run setup-db

echo
echo "Starting both backend and frontend..."
echo "Backend will run on http://localhost:3001"
echo "Frontend will run on http://localhost:3000"
echo

cd ..
npm run dev
