.PHONY: all build deploy

THEMES := hugo-bootstrap-premium

build:
	hugo -t $(THEMES)

old.deploy:
	./deploy.sh

