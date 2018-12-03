.PHONY: all build deploy

THEMES := hugo-bootstrap-premium

build:
	hugo -t $(THEMES)

deploy:
	./deploy.sh

