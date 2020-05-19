#!/bin/bash -l
nvm use 10 && \
git checkout master && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
ng build --base-href /avid-covider-predictor/ && \
cp dist/avid-covider-predictor/index.html dist/avid-covider-predictor/404.html && \
git add dist/avid-covider-predictor && \
cd .. && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/ui -b gh-pages && \
git push -f publish gh-pages:gh-pages && \
git checkout master && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . && \
git push
