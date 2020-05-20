#!/bin/bash -l
nvm use 10 && \
git checkout master && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
ng build --prod -c he && \
ng build --prod -c en && \
cp dist/avid-covider-predictor/en/index.html dist/avid-covider-predictor/en/404.html && \
cp dist/avid-covider-predictor/he/index.html dist/avid-covider-predictor/he/404.html && \
git add dist/avid-covider-predictor && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/avid-covider-predictor -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout master && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . && \
git push
