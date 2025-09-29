#!/bin/bash
cd /home/kavia/workspace/code-generation/clash-wager-matchmaker-169198-169207/wager_royale_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

