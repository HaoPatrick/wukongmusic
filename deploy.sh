#!/bin/bash
echo "begin deploying mainsite"
rsync -avzhe ssh ./dist/ hao@vul.haoxp.xyz:/home/hao/wukong